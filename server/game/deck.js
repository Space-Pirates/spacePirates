var _ = require('underscore');
var db = require('../db/db');
var tileDictionary = require('./tile-dictionary.json');

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

  initialize: function(player1, player2, player3, player4) {
    var deck = this;
    var tiles = this.shuffle(tileDictionary);
    var hand = {
      0: [],
      1: [],
      2: [],
      3: []
    };

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        hand[i].push(tiles.pop());
      }
    }

    return this.setTiles(tiles)
    .then(function() {
      deck.setHand(player1, hand[0])
      .catch(function(err) {
        console.error(err);
      });
      deck.setHand(player2, hand[1])
      .catch(function(err) {
        console.error(err);
      });
      deck.setHand(player3, hand[2])
      .catch(function(err) {
        console.error(err);
      });
      deck.setHand(player4, hand[3])
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
