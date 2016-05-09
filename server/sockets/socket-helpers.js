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
  }
}