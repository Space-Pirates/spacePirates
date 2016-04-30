var _ = require('underscore'); 

var Deck = function(gameId) {
  this.gameId = gameId;
};

Deck.prototype = {
  constructor: Deck,

  setTiles: function() {},

  getTiles: function() {},

  shuffle: function(collection) {
    return _.shuffle(collection);
  },

  dealTiles: function() {},

  initialize: function() {}
};

module.exports = Deck;
