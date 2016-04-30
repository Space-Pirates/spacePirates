var _ = require('underscore');
var db = require('../db/db');

var Deck = function(gameId) {
  this.gameId = gameId;
};

Deck.prototype = {
  constructor: Deck,

  setTiles: function(tiles) {
    return db.Deck.filter({gameId: this.gameId})
    .update({tiles: tiles}).run()
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.error(err);
    })
  },

  getTiles: function() {},

  shuffle: function(collection) {
    return _.shuffle(collection);
  },

  dealTiles: function() {},

  initialize: function() {}
};

module.exports = Deck;
