function Board(gameId) {
  this.gameId = gameId;
};

Board.prototype = {
  constructor: Board,

  Tile: function(top, left, bottom, right) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  },

  setMatrix: function() {},

  getMatrix: function() {},

  update: function() {},

  initialize: function() {}
}

module.exports = Board;
