var thinky = require('./../thinky');

var type = thinky.type;

var Board = thinky.createModel('Board', {
  id: type.string(),
  matrix: type.array()
});

module.exports = Board;
