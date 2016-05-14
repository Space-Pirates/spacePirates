var db = require('../db/db');

module.exports = function(gameId) {
  return db.Game.get(gameId).getJoin({board: true}).then(function(game) {
    return isEnded(game.matrix);
  });
}

function isEnded(matrix) {
  var endCol = 9;
  var endRows = [2, 4, 6];

  var ended = false;

  (function findEnd(row, col) {
    var tile = matrix[row][col];

    if (endCol === 9 && endRows.indexOf(row) >= 0) {
      ended = true;
    }

    if (tile.tileId) {
      if (tile.right === 1 && matrix[row][col + 1]
        && matrix[row][col + 1].left === 1) {
        findEnd(row, col + 1);
      }
      if (tile.left === 1 && matrix[row][col - 1]
        && matrix[row][col - 1].right === 1) {
        findEnd(row, col - 1);
      }
      if (tile.top === 1 && matrix[row - 1]
        && matrix[row - 1][col].bottom === 1) {
        findEnd(row - 1, col);
      }
      if (tile.bottom === 1 && matrix[row + 1]
        && matrix[row + 1][col].top === 1) {
        findEnd(row + 1, col);
      }
    }
  })(4, 1);

  return ended;
}
