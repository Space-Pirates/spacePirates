var db = require('../db/db');
var games = require('./../controllers/game-control').currentGames;
var Player = require('./../game/player');

var parseMove = function(x, y) {
  if (x === 0 && y === 10) {
    return 'discard';
  } else if (y === 0) {
    if (x >= 0 && x <= 2) {
      return 'block1';
    } else if (x >= 4 && x <= 6) {
      return 'block2';
    } else if (x >= 8 && x <= 10) {
      return 'block3';
    }
  } else if (x >= 8 && x <= 10 && y === 10) {
    return 'unblock';
  } else if (x >= 0 && x <= 11 && y >= 1 && y <= 9) {
    if (x === 9 && y === 3) {
      return 'reveal1';
    } else if (x === 9 && y === 5) {
      return 'reveal2';
    } else if (x === 9 && y === 7) {
      return 'reveal3';
    } else { // UPDATE
      return 'update';
    }
  }
}

module.exports = function(app) {

  var http =  require('http').Server(app);
  var io  = require('socket.io')(http);

  // setup change feed for lobby
  db.Game.changes().then(function(feed){
    feed.each(function(error, doc) {
      console.log(doc);
      db.Game.get(doc.id).getJoin({players:true})
      .then(function(game){
        io.to('LobbySocket').emit('update', game);
      });
    });
  });

  io.on('connection', function(socket) {
    var game_id = socket.handshake.query.game_id;
    var user = socket.handshake.query.user;

    // join room, room is the game_id
    socket.join(game_id);
    console.log(user + " joined game: " + game_id);

    socket.on('disconnect', function() {
      socket.to(game_id).emit('left', user);
      socket.leave(game_id);
    });

    // listen for moves
    socket.on('move', function(move) {
      switch (parseMove(move.xEnd, move.yEnd)) {
        case 'discard':
          //
          break;
        case 'block1':
          //
          break;
        case 'block2':
          //
          break;
        case 'block3':
          //
          break;
        case 'unblock':
          //
          break;
        case 'reveal1':
          //
          break;
        case 'reveal2':
          //
          break;
        case 'reveal3':
          //
          break;
        case 'update':
          //
          break;
      }
      // io.to(game_id).emit('moved', user);
    });

    // listen for load state is loaded
    socket.on('ready', function(data) {
      var game = games[game_id];
      game.players[data.userId] = new Player(game_id, socket.id, data.userId);
      game.players[data.userId].initialize().then(function () {
        if (io.sockets.adapter.rooms[game_id].length >= 4) {

          db.Game.get(game_id).update({
            open: false
          }).run()
          .then(function(){
            io.to(game_id).emit('4players');
          });
        }
      });
    });

    socket.on('readyForHand', function(data) {
      var game = games[game_id];
      game.startGame().then(function() {
        game.board.getMatrix().then(function(matrix) {
          io.to(game_id).emit('startGame', {
            matrix: matrix,
            tilesRemaining: 54
          });
        });
        // for (userId in game.players) {
        player = game.players[data.userId];
        player.getHand().then(function (hand) {
          player.getRole().then(function (role) {
            io.to(player.socketId).emit('hand', {hand: hand, role: role});
          });
        });
        // }
      });
    });

    // announce arrival so everyone else in room can call
    io.to(game_id).emit('joined', {username: user});

  });

  return http;
};
