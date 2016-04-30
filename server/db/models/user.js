var thinky = require('./../thinky');
var type = thinky.type;

var User = thinky.createModel('User', {
  id: type.string(),
  name: type.string(),
  age: type.number(),
  email: type.string(),
  username: type.string(),
  password: type.string()
});

module.exports = User;

var Game = require('./game');

User.hasAndBelongsToMany(Game, 'id', 'id');
// User.hasMany(Game, 'ownedGames', 'id', 'ownerId');

