var db = require('../db/db');
var Board = require('./board');
var Deck = require('./deck');
var Player = require('./player');

var Game = function() {
  this.gameId = '';
  this.board = {};
  this.deck = {};
  this.players = {};

  this.initialize();
};

Game.prototype.initialize = function() {
  var game = this;

  return new db.Game({})
  .save()
  .then(function(doc) {
    game.gameId = doc.id;
    game.board = new Board(doc.id);
    game.deck = new Deck(doc.id);
  })
  .catch(function(err) {
    console.error(err);
  });
};

module.exports = Game;
