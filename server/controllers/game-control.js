var db = require('../db/db');
var Game = require('../game/game');
var currentGames = {};

module.exports = {
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
      currentGames[doc.id] = new Game(doc.id);
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  end: function(req, res) {}
};
