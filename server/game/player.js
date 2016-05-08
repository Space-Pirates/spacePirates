var db = require('../db/db');

var Player = function (gameId) {
  this.gameId = gameId;
  this.lastPlayed = {};
  this.playerId = '';
};

Player.prototype = {
  constructor: Player,

  discard: function (tileId) {
    return db.Player.get(this.playerId)
    .run()
    .then(function (doc) {
      for (var i = 0; i < 3; i++) {
        if (tileId === doc.hand[i].tileId) {
          doc.hand.splice(i, 1);
          break;
        }
      }
      return doc.save()
      .then(function (doc) {
        return doc;
      })
      .catch(function (err) {
        console.error(err);
      });

    })
    .catch(function (err) {
      console.error(err);
    });
  },

  setRole: function(role) {
    db.Player.get(this.playerId)
    .update({role: role})
    .then(function(doc) {
      return doc;
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  changeTurn: function() {
    db.Player.get(this.PlayerId)
    .then(function(doc) {
      doc.isTurn = !doc.isTurn;
      return doc.save()
      .then(function(doc) {
        return doc;
      })
      .catch(function(err) {
        console.error(err);
      });
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  initialize: function () {
    var player = this;

    return new db.Player({
      gameId: player.gameId,
      role: '',
      isTurn: false,
      hand: [],
      debuffs: []
    })
    .save()
    .then(function (data) {
      player.playerId = data.id;
    })
    .catch(function (err) {
      console.error(err);
    });
  }
};

module.exports = Player;
