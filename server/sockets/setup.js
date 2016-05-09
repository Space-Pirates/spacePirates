var db = require('../db/db');
var games = require('./../controllers/game-control').currentGames;
var Player = require('./../game/player');
var utils = require('./socket-helpers');

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
    var gameId = socket.handshake.query.gameId;
    var user = socket.handshake.query.user;

    // join room, room is the gameId
    socket.join(gameId);
    console.log(user + " joined game: " + gameId);

    socket.on('disconnect', function() {
      socket.to(gameId).emit('left', user);
      socket.leave(gameId);
    });

    // listen for moves
    socket.on('move', function(move) {
      switch (utils.parseMove(move.xEnd, move.yEnd)) {
        case 'discard':
          utils.discard(move, games[gameId]);
          break;
        case 'block1':
          utils.block(1, move, games[gameId]);
          break;
        case 'block2':
          utils.block(2, move, games[gameId]);
          break;
        case 'block3':
          utils.block(3, move, games[gameId]);
          break;
        case 'unblock':
          utils.unblock(move, games[gameId]);
          break;
        case 'reveal1':
          utils.reveal(1, move, games[gameId]);
          break;
        case 'reveal2':
          utils.reveal(2, move, games[gameId]);
          break;
        case 'reveal3':
          utils.reveal(3, move, games[gameId]);
          break;
        case 'update':
          utils.update(move, games[gameId]);
          break;
      }
      // io.to(gameId).emit('moved', user);
    });

    // listen for load state is loaded
    socket.on('ready', function(data) {
      var game = games[gameId];
      game.players[data.userId] = new Player(gameId, socket.id);
      game.players[data.userId].initialize().then(function () {
        if (io.sockets.adapter.rooms[gameId].length >= 4) {
          io.to(gameId).emit('4players');
        }
      });
    });

    socket.on('readyForHand', function(data) {
      var game = games[gameId];
      game.startGame().then(function() {
        game.board.getMatrix().then(function(matrix) {
          io.to(gameId).emit('startGame', {
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
    io.to(gameId).emit('joined', {username: user});

  });

  return http;
};
