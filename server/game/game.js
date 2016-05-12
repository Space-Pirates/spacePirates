var Board = require('./board');
var Deck = require('./deck');
var Player = require('./player');
var _ = require('underscore');

var Game = function(id) {
  this.gameId = id;
  this.board = new Board(this.gameId);
  this.deck = new Deck(this.gameId);
  this.players = {};
  this.turnOrder = [];
  this.currentTurn = 0;
};

Game.prototype = {
  startGame: function() {
    var dealt = 0;
    var roles = _.shuffle(['pirate', 'settler', 'settler', 'settler']);
    var deck = this.deck;
    var game = this;
    var firstTurn = true;

    return deck.getTiles()
    .then(function(tiles) {
      var hands = [[], [], [], []];

      for (var i = 0; i < 3; i++) {
        hands[0].push(tiles.pop());
        hands[1].push(tiles.pop());
        hands[2].push(tiles.pop());
        hands[3].push(tiles.pop());
      }

      deck.setTiles(tiles)
      .catch(function(err) {
        console.error(err);
      });

      for (var key in game.players) {
        var player = game.players[key];

        game.turnOrder.push(player.playerId);
        if (firstTurn) {
          player.changeTurn();
          firstTurn = false;
        }
        player.setRole(roles.pop());
        if (dealt < 3) {
          deck.setHand(player.playerId, hands.pop());
        } else {
          return deck.setHand(player.playerId, hands.pop())
          .then(function(doc) {
            return doc;
          })
          .catch(function(err) {
            console.error(err);
          });
        }
        dealt++;
      }
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  rotateTurn: function(playerId) {
    var game = this;
    var currentPlayer = this.players[this.turnOrder[this.currentTurn]];
    if (this.currentTurn < 3) {
        this.currentTurn++;
      } else {
        this.currentTurn = 0;
      }
    var nextPlayer = this.players[this.turnOrder[this.currentTurn]];

    return currentPlayer.changeTurn()
    .then(function() {
      return nextPlayer.changeTurn()
      .then(function(nextPlayer) {
        return nextPlayer;
      })
      .catch(function(err) {
        console.error(err);
      });
    })
    .catch(function(err) {
      console.error(err);
    });
  }
};

module.exports = Game;
