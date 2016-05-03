function Board(gameId) {
  this.gameId = gameId;
};

Board.prototype = {
  constructor: Board,

  Tile: function() {},

  setMatrix: function() {},

  getMatrix: function() {},

  update: function() {},

  initialize: function() {}
}

module.exports = Board;
