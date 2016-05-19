var db = require('../db/db');
var games = require('./../controllers/game-control').currentGames;

module.exports.getGameAndCheckEnded = function(gameId) {
  return db.Game.get(gameId).getJoin({board: true}).then(function(game) {
    return isEnded(game.matrix, games[gameId].deck.routesRemaining);
  });
}

module.exports.isEnded = function(matrix, remainingRoutes) {
  var endCol = 9;
  var endRows = [2, 4, 6];

  var ended = false;
  var visited = {};

  if (remainingRoutes === 0) {
    return false;
  }

  (function findEnd(row, col) {
    var tile = matrix[row][col];

    if (matrix[row][col].truePlanet) {
      return ended = true;
    }
    if (!visited[row + ',' + col]) {
      visited[row + ',' + col] = 1;
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
      visited[row + ',' + col] = 0;
    }
  })(4, 1);

  return ended;
}
