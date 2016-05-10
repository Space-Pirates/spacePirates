var Player = require('./../game/player');

module.exports = {
  parseMove: function(x, y) {
    if (x === 0 && y === 10) {
      return 'discard';
    } else if (y === 0) {
      if (x >= 0 && x <= 2) {
        return 'block1';
      } else if (x >= 4 && x <= 6) {
        return 'block2';
      } else if (x >= 8 && x <= 10) {
        return 'block3';
      }
    } else if (x >= 8 && x <= 10 && y === 10) {
      return 'unblock';
    } else if (x >= 0 && x <= 11 && y >= 1 && y <= 9) {
      if (x === 9 && y === 3) {
        return 'reveal1';
      } else if (x === 9 && y === 5) {
        return 'reveal2';
      } else if (x === 9 && y === 7) {
        return 'reveal3';
      } else { // UPDATE
        return 'update';
      }
    }
  },

  discard: function(move, game, player) {},

  block: function(player, move, game, player) {},

  unblock: function(move, game, player) {},

  reveal: function(planet, move, game, player) {},

  update: function(move, game, player) {
    return game.board.update(move.yEnd - 1, move.xEnd -1, move.tile)
    .then(function(board) {
      return player.discard(move.tile)
      .then(function() {
        return game.deck.dealTile(player.playerId)
        .then(function(player) {
          return {
            board: board,
            player: player
          }
        })
        .catch(function(err) {
          console.error(err);
        });
      })
      .catch(function(err) {
        console.error(err);
      });
    })
    .catch(function(err) {
      console.error(err);
    })
  }
}
