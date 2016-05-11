var db = require('../db/db');

var Board = function(gameId, cb) {
  this.gameId = gameId;
  this.initialize(cb);
};

Board.prototype = {
  constructor: Board,

  Tile: function(row, col, matrix) {
    if (row - 1 >= 0) {
      this.top = matrix[row - 1][col].bottom || 0;
    } else {
      this.top = 0;
    }

    if (col - 1 >= 0) {
      this.left = matrix[row][col - 1].right || 0;
    } else {
      this.left = 0;
    }

    if (row + 1 < matrix.length) {
      this.bottom = matrix[row + 1][col].top || 0;
    } else {
      this.bottom = 0;
    }

    if (col + 1 < matrix[0].length) {
      this.right = matrix[row][col + 1].left || 0;
    } else {
      this.right = 0;
    }
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

      if (row > 0) {
        matrix[row - 1][col] = new board.Tile(row - 1, col, matrix);
      }
      if (col > 0) {
        matrix[row][col - 1] = new board.Tile(row, col - 1, matrix);
      }
      if (row < matrix.length - 1) {
        matrix[row + 1][col] = new board.Tile(row + 1, col, matrix);
      }
      if (col < matrix[0].length - 1) {
        matrix[row][col + 1] = new board.Tile(row, col + 1, matrix);
      }

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

  initialize: function(cb) {
    var board = this;

    new db.Board({
      gameId: this.gameId,
      matrix: require('./board-matrix')
    })
    .save()
    .then(function() {
      board.update(4, 1, {
        tileId: 'route-start-1',
        top: 1,
        left: 1,
        bottom: 1,
        right: 1
      })
      .then(function(model) {
        if (cb) {
          cb(model);
        }
      })
      .catch(function(err) {
        console.error(err);
      });
    })
    .catch(function(err) {
      console.error(err);
    });
  }
};

module.exports = Board;
