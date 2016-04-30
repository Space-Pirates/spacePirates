var thinky = require('./../thinky');

var type = thinky.type;

var Player = thinky.createModel('Player', {
  id: type.string(),
  gameId: type.string(),
  role: type.string(),
  isTurn: type.boolean(),
  hand: type.array(),
  debuffs: type.array()
});

module.exports = Player;
