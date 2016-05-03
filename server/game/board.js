var db = require('../db/db');

var Board = function(gameId) {
  this.gameId = gameId;
};

Board.prototype = {
  constructor: Board,

  Tile: function(row, col, matrix) {
    this.top = matrix[row - 1][col].bottom || 0;
    this.left = matrix[row][col - 1].right || 0;
    this.bottom = matrix[row + 1][col].top || 0;
    this.right = matrix[row][col + 1].left || 0;
  },

  setMatrix: function(matrix) {
    return db.Board.filter({gameId: this.gameId})
    .update({matrix: matrix})
    .run()
    .then(function(data) {
      return data;
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  getMatrix: function() {
    return db.Board.filter({gameId: this.gameId})
    .run()
    .then(function(data) {
      return data[0].matrix;
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  update: function() {},

  initialize: function() {}
}

module.exports = Board;
