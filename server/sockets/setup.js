var db = require('../db/db');
var games = require('./../controllers/game-control').currentGames;
var Player = require('./../game/player');

module.exports = function(app) {

  var http =  require('http').Server(app);
  var io  = require('socket.io')(http);

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
    socket.on('move', function(data) {
      // call game stuff here
      io.to(game_id).emit('moved', user);
    });

    // listen for load state is loaded
    socket.on('ready', function(socket, dat) {
      var game = games[game_id];

      game.players[dat.id] = new Player(game_id);
      game.players[dat.id].initialize();
      if (io.sockets.adapter.rooms[game_id].length >= 4) {
        game.startGame().then(function() {
          io.to(game_id).emit('startGame', {
            matrix: game.board.matrix,
            tilesRemaining: game.deck.tilesRemaining
          });
        });
        io.to(game_id).emit('4players');
      }
    });

    // setup change feed for lobby
    if(game_id === 'LobbySocket'){
      db.Game.changes().then(function(feed){
        feed.each(function(error, doc) {
          console.log(doc);
          db.Game.getJoin({id: doc.id })
          .then(function(data){
            io.to(game_id).emit('update', data);
          });
        });
      });
    }

    // announce arrival so everyone else in room can call
    io.to(game_id).emit('joined', {username: user});

  });

  return http;
};
