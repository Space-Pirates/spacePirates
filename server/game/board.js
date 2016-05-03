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

  update: function(row, col, tile) {
    var board = this;

    return this.getMatrix()
    .then(function(matrix) {
      matrix[row][col] = tile;

      matrix[row - 1][col] = new board.Tile(row - 1, col, matrix);
      matrix[row][col - 1] = new board.Tile(row, col - 1, matrix);
      matrix[row + 1][col] = new board.Tile(row + 1, col, matrix);
      matrix[row][col + 1] = new board.Tile(row, col + 1, matrix);

      return board.setMatrix(matrix)
      .then(function(data) {
        return data;
      })
      .catch(function(err) {
        console.error(err);
      });
    })
    .catch(function(err) {
      console.error(err);
    });
  },

  initialize: function() {}
}

module.exports = Board;
