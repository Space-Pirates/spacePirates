var thinky = require('./../thinky');
var User = require('./user');
var Deck = require('./deck');
var Board = require('./board');

var type = thinky.type;

var Game = thinky.createModel('Game', {
  id: type.string(),
  ownerId: type.string()
});

Game.hasAndBelongsToMany(User, 'id', 'id');
Game.hasOne(Deck, 'id', 'gameId');
Game.hasOne(Board, 'id', 'gameId');

module.exports = Game;
