function endTurn(move, game, player) {
  if (move.tile.tileId.substring(0, 5) === 'route') {
    game.board.remainingRoutes--;
  }
  return player.discard(move.tile.tileId)
  .then(function() {
    return game.deck.dealTile(player.playerId)
    .then(function(player) {
      game.rotateTurn()
      .then(function(nextPlayer) {
        return {
          player: player,
          nextPlayer: nextPlayer
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
  }); 
}

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
        return 'reveal';
      } else if (x === 9 && y === 5) {
        return 'reveal';
      } else if (x === 9 && y === 7) {
        return 'reveal';
      } else { // UPDATE
        return 'update';
      }
    }
  },

  discard: function(move, game, player) {
    return endTurn(move, game, player);
  },

  block: function(victim, move, game, player) {},

  unblock: function(move, game, player) {},

  reveal: function(move, game, player) {
    return endTurn(move, game, player);
  },

  update: function(move, game, player) {
    return game.board.update(move.yEnd - 1, move.xEnd, move.tile)
    .then(function(board) {
      return endTurn(move, game, player)
      .then(function(data) {
        return {
          board: board,
          player: data.player,
          nextPlayer: data.nextPlayer
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
