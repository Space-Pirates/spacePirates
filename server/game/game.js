var Board = require('./board');
var Deck = require('./deck');
var Player = require('./player');
var _ = require('underscore');

var Game = function(id) {
  this.gameId = id;
  this.board = new Board(this.gameId);
  this.deck = new Deck(this.gameId);
  this.players = {};
};

Game.prototype.startGame = function() {
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
    console.log(game.players);
    for (var key in game.players) {
      var player = deck.players[player];

      player.setRole(roles.pop());
      if (dealt < 3) {
        deck.setHand(player.id, hands.pop());
      } else {
        return deck.setHand(player.id, hands.pop())
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
};

module.exports = Game;
