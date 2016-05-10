var thinky = require('./../thinky');

var type = thinky.type;

var Player = thinky.createModel('Player', {
  id: type.string(),
  gameId: type.string(),
  socketId: type.string(),
  role: type.string(),
  isTurn: type.boolean(),
  hand: type.array(),
  debuffs: type.array(),
  userId: type.string()
});

module.exports = Player;

var User = require('./user');

Player.belongsTo(User, 'user', 'userId', 'id');