var db = require('../db/db');

var Board = function(gameId) {
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
