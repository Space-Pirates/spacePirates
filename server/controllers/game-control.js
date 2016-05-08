var db = require('../db/db');
var Game = require('../game/game');
var Player = require('../game/player');
currentGames = {};

module.exports = {
  currentGames: currentGames,

  getAll: function(req, res) {
    db.Game.getJoin({
      players: true
    })
    .run()
    .then(function(collection) {
      res.status(200).send(collection);
    })
    .catch(function(err) {
      console.error(err);
      res.sendStatus(500);
    });
  },

  getById: function(req, res) {},

  create: function(req, res) {
    new db.Game({})
    .save()
    .then(function(doc) {
      this.currentGames[doc.id] = new Game(doc.id);
      player = new Player(doc.id);
      player.initialize()
      .then(function(doc) {
        res.json({
          gameId: doc.gameId,
          playerId: doc.playerId
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

  end: function(req, res) {}
};
