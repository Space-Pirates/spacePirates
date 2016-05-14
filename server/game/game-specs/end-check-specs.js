var chai = require('chai');
var check = require('../end_check');
var tiles = require('../tile-dictionary');

var expect = chai.expect;

describe('isEnded', function () {

  it('should return false for and incomplete route to planets', function() {
    var matrix = require('../board-matrix')();
    matrix[4][1] = tiles[0]; // add start tile
    expect(check.isEnded(matrix)).to.be.equal(false);
  });

  it('should return false for and incomplete route to planets', function() {
    var matrix = require('../board-matrix')();
    matrix[4][1] = tiles[0]; // add start tile

    // add intersection tiles all the way to the middle planet in straight line
    for (var i = 2; i <= 8; i++) {
      matrix[4][i] = tiles[0];
    }

    expect(check.isEnded(matrix)).to.be.equal(true);

  });

});
