var db = require('../db/db');

var Game = function() {
  this.gameId = '';
  this.board = {};
  this.deck = {};
  this.players = {};

  this.initialize();
};

Game.prototype.initialize = function() {};

module.exports = Game;
