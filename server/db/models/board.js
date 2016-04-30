var thinky = require('./../thinky');

var type = thinky.type;

var Board = thinky.createModel('Board', {
  id: type.string(),
  gameId: type.string()
});

module.exports = Board;
