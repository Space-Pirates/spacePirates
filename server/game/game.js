var Board = require('./board');
var Deck = require('./deck');
var Player = require('./player');

var Game = function(id) {
  this.gameId = id;
  this.board = new Board(this.gameId);
  this.deck = new Deck(this.gameId);
  this.players = {};
};

module.exports = Game;
