var thinky = require('./../thinky');
var User = require('./user');

var type = thinky.type;

var Game = thinky.createModel('Game', {
  id: type.string(),
  // ownerId: type.string(),
  deckId: type.string(),
  boardId: type.string()
});

Game.hasAndBelongsToMany(User, 'id', 'id');

module.exports = Game;
