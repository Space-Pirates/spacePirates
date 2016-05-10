var thinky = require('./../thinky');
var Board = require('./board');
var Deck = require('./deck');
var Player = require('./player');

var type = thinky.type;

var Game = thinky.createModel('Game', {
  id: type.string(),
  title: type.string(),
  ownerId: type.string(),
  open: type.boolean()
});

Game.hasOne(Board, 'board', 'id', 'gameId');
Game.hasOne(Deck, 'deck', 'id', 'gameId');
Game.hasMany(Player, 'players', 'id', 'gameId');

module.exports = Game;

// Must come after export
var User = require('./user');

Game.belongsTo(User, 'user', 'ownerId', 'id');
