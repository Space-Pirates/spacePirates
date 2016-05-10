var db = require('../db/db');
var Game = require('../game/game');
var Player = require('../game/player');
currentGames = {};

module.exports = {
  currentGames: currentGames,

  getAll: function(req, res) {
    db.Game.filter({open: true})
    .getJoin({players: {user: true }})
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
    new db.Game({
      ownerId: req.user.id,
      title: req.body.title,
      open: true
    })
    .save()
    .then(function(doc) {
      var gameId = doc.id;
      currentGames[gameId] = new Game(gameId);
      res.status(200).send(gameId)
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  end: function(req, res) {}
};
