var db = require('../db/db');

var Player = function (gameID, socketID) {
  this.gameID = gameID;
  this.socketID = socketID;
  this.lastPlayed = {};
  this.playerID = '';
  this.initialize();
};


Player.prototype = {
  constructor: Player,
  discard: function (tileId) {

    var player = this;
    console.log(player.playerID);
    return db.Player.filter({gameId: player.gameID})
    .run()
    .then(function (data) {
      for(var i = 0; i < 3; i++) {
        if(tileId === data[0].hand[i].tileId) {
          data[0].hand.splice(i, 1);
          break;
        }
      }
      data.save()
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        console.error(err);
      });

    })
    .catch(function (err) {
      console.error(err);
    });

  },
  initialize: function () {

    var player = this;
    return new db.Player({
      gameId: player.gameID,
      socketId: player.socketID,
      role: '',
      isTurn: false,
      hand: [],
      debuffs: []
    })
    .save()
    .then(function (data) {
      player.playerID = data.id;
      //console.log(player.playerID);
    })
    .catch(function (err) {
      console.error(err);
    });
  }
};

module.exports = Player;