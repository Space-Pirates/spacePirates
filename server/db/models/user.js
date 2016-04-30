var thinky = require('./../thinky');
var Game = require('./game');
var type = thinky.type;

var User = thinky.createModel('User', {
  id: type.string(),
  name: type.string(),
  age: type.number(),
  email: tupe.string(),
  username: type.string(),
  password: type.string()
});

User.hasAndBelongsToMany(Game, 'id', 'id');
User.hasMany(Game, 'ownedGames', 'id', 'ownerId');

module.exports = User;
