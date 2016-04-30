var thinky = require('./../thinky');
var Game = require('./game');

var type = thinky.type;

var Board = thinky.createModel('Board', {
  id: type.string(),
});

Board.belongsTo(Game, 'game', 'boardId', 'id');


module.exports = Board;
