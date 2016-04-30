var thinky = require('./../thinky');
var Board = require('./board');
var Deck = require('./deck');
var Player = require('./player');

var type = thinky.type;

var Game = thinky.createModel('Game', {
  id: type.string(),
  // ownerId: type.string(),
  boardId: type.string(),
  deckId: type.string()
});

Game.hasOne(Board, 'board', 'boardId', 'id');
Game.hasOne(Deck, 'deck', 'deckId', 'id')
Game.hasMany(Player, 'players', 'id', 'gameId');

module.exports = Game;

// Must come after export
var User = require('./user');

Game.hasAndBelongsToMany(User, 'users', 'id', 'id');
