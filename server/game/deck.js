var _ = require('underscore');
var db = require('../db/db');

var Deck = function(gameId) {
  this.gameId = gameId;
};

Deck.prototype = {
  constructor: Deck,

  setTiles: function(tiles) {
    return db.Deck.filter({gameId: this.gameId})
    .update({tiles: tiles})
    .run()
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  getTiles: function() {
    return db.Deck.filter({gameId: this.gameId})
    .run()
    .then(function(data) {
      return data[0].tiles;
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  shuffle: function(collection) {
    return _.shuffle(collection);
  },

  dealTile: function(playerId) {
    var context = this;

    return this.getTiles()
    .then(function(tiles) {
      var tile = tiles.pop();

      context.setTiles(tiles)
      .catch(function(err) {
        console.error(err);
      });

      return db.Player.get(playerId)
      .run()
      .then(function(player) {
        return db.Player.get(playerId)
        .update({hand: player.hand.concat([tile])})
        .run()
      })
      .catch(function(err) {
        console.error(err);
      });
    })
    .catch(function(err) {
      console.error(err);
    })
  },

  initialize: function() {}
};

module.exports = Deck;
