var db = require('../db/db');

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
  create: function(req, res) {}
};
