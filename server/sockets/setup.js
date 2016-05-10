var db = require('../db/db');
var games = require('./../controllers/game-control').currentGames;
var Player = require('./../game/player');

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
    socket.on('move', function(socket) {
      // call game stuff here
      io.to(game_id).emit('moved', user);
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
            tilesRemaining: Infinity
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
