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

    return deck.getTiles()
    .then(function(tiles) {
      var hands = [[], [], [], []];

      for (var i = 0; i < 4; i++) {
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
        dealt++
      }
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  rotateTurn: function(playerId) {
    var game = this;

    return this.players[this.turnOrder[this.currentTurn]].changeTurn()
    .then(function() {
      if (game.currentTurn < 3) {
        game.currentTurn++;
      } else {
        game.currentTurn = 0;
      }
      return game.players[game.turnOrder[game.currentTurn]].changeTurn()
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
}

module.exports = Game;
