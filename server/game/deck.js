var _ = require('underscore');
var db = require('../db/db');
var tileDictionary = require('./tile-dictionary.json');

var Deck = function(gameId) {
  this.gameId = gameId;
  this.lastDiscard = '';
  this.tilesRemaining = 54;
  this.initialize();
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

  dealTile: function(playerId) {
    var deck = this;

    return this.getTiles()
    .then(function(tiles) {
      var tile = tiles.pop();

      deck.setTiles(tiles)
      .catch(function(err) {
        console.error(err);
      });

      return db.Player.get(playerId)
      .run()
      .then(function(player) {
        return db.Player.get(playerId)
        .update({hand: player.hand.concat([tile])})
        .run()
        .then(function(player) {
          deck.tilesRemaining--;
          return player;
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
  },

  setHand: function(playerId, hand) {
    return db.Player.get(playerId)
      .update({hand: hand})
      .run()
      .catch(function(err) {
        console.error(err);
      });
  },

  initialize: function() {
    var deck = this;

    return new db.Deck({gameId: this.gameId})
    .save()
    .then(function() {
      return deck.setTiles(_.shuffle(tileDictionary))
      .then(function(data) {
        return data;
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

module.exports = Deck;
