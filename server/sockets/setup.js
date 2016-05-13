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
      db.Game.get(doc.id).getJoin({players:true})
      .then(function(game){
        io.to('LobbySocket').emit('updateLobby', game);
      });
    });
  });

  db.Player.changes().then(function(feed){
    feed.each(function(error, doc) {
      db.Player.get(doc.id).getJoin({user:true})
      .then(function(player){
        io.to('LobbySocket').emit('updatePlayers', player);
      });
    });
  });

  io.on('connection', function(socket) {
    var gameId = socket.handshake.query.gameId;
    var user = socket.handshake.query.user;

    // join room, room is the gameId
    socket.join(gameId);
    console.log(user + ' joined game: ' + gameId);

    socket.on('disconnect', function() {
      socket.to(gameId).emit('left', user);
      socket.leave(gameId);
    });

    socket.on('chat', function(chat){
      socket.to(gameId).emit('chat', chat);
    });

    // listen for moves
    socket.on('move', function(move) {
      var game = games[gameId];
      var player = game.players[move.userId];
      switch (utils.parseMove(move.xEnd, move.yEnd)) {
        case 'discard':
          utils.discard(move, game, player)
          .then(function(data) {
            socket.emit('deal', {
              hand: data.player.hand,
              lastPlayed: move.tile,
              x: move.xStart,
              y: move.yStart
            });
            socket.emit('endTurn', {
              isTurn: data.player.isTurn
            });
            io.to(data.nextPlayer.socketId).emit('startTurn', {
              isTurn: data.nextPlayer.isTurn
            });
          })
          .catch(function(err) {
            console.error(err);
          });
          break;
        case 'block1':
          utils.block(1, move, game, player);
          break;
        case 'block2':
          utils.block(2, move, game, player);
          break;
        case 'block3':
          utils.block(3, move, game, player);
          break;
        case 'unblock':
          utils.unblock(move, game, player);
          break;
        case 'reveal1':
          utils.reveal(1, move, game, player);
          break;
        case 'reveal2':
          utils.reveal(2, move, game, player);
          break;
        case 'reveal3':
          utils.reveal(3, move, game, player);
          break;
        case 'update':
          utils.update(move, game, player)
          .then(function(data) {
            socket.to(gameId).emit('update', {
              matrix: data.board[0].matrix,
              lastPlayed: move.tile,
              x: move.xEnd,
              y: move.yEnd,
              tilesRemaining: game.deck.tilesRemaining,
              player: player
            });
            socket.emit('deal', {
              hand: data.player.hand,
              lastPlayed: move.tile,
              x: move.xStart,
              y: move.yStart
            });
            socket.emit('endTurn', {
              isTurn: data.player.isTurn
            });
            io.to(data.nextPlayer.socketId).emit('startTurn', {
              isTurn: data.nextPlayer.isTurn
            });
          })
          .catch(function(err) {
            console.error(err);
          });
          break;
      }
      // io.to(gameId).emit('moved', user);
    });

    // listen for load state is loaded
    socket.on('ready', function(data) {
      // instance of Game class corresponding to current game
      var game = games[gameId];
      // instantiate new player class and save it on players
      // prop in our in our instance of Game class (under key of userId)
      game.players[data.id] = new Player(gameId, socket.id, data.id, data.username);
      // save player to db
      game.players[data.id].initialize().then(function () {
        // check if four players are in the game
        if (io.sockets.adapter.rooms[gameId].length >= 4) {
          // close game to lobby if full
          db.Game.get(gameId).update({
            open: false
          }).run();
          // initialize game
          game.startGame().then(function() {
            game.board.getMatrix().then(function(matrix) {
              // send initial game data
              io.to(gameId).emit('startGame', {
                matrix: matrix,
                tilesRemaining: 54
              });
              // tell game to start (load game state)
              io.to(gameId).emit('4players');
            });
          });
        }
      });
    });

    socket.on('readyForHand', function(data) {
      // get instance of game
      var game = games[gameId];
      var player = game.players[data.userId];

      player.getHand()
      .then(function (hand) {
        player.getRole()
        .then(function (role) {
          player.isTurn()
          .then(function (turn) {
            io.to(player.socketId).emit('hand', {
              hand: hand,
              role: role,
              isTurn: turn
            });
          })
          .catch(function(err) {
            console.error(err);
          });
        })
        .catch(function(err) {
          console.error(err);
        });
      })
      .catch(function(err) {
        console.error(err);
      });
    });

    // announce arrival so everyone else in room can call
    io.to(gameId).emit('joined', {username: user});

  });

  return http;
};
