var chai = require('chai');
var check = require('../end-check');
var tiles = require('../tile-dictionary');

var expect = chai.expect;

module.exports = function () {

  it('should return false if remainingRoutes is 0', function() {
    var matrix = require('../board-matrix')();
    matrix[4][1] = tiles[0]; // add start tile
    expect(check.isEnded(matrix, 0)).to.be.equal(false);
  })

  it('should return false for and incomplete route to planets', function() {
    var matrix = require('../board-matrix')();
    matrix[4][1] = tiles[0]; // add start tile
    expect(check.isEnded(matrix, 31)).to.be.equal(false);
  });

  it('should return true for a complete route', function() {
    var matrix = require('../board-matrix')();
    // make true planet to go to
    matrix[4][9] = {
      truePlanet: true,
      top: 1,
      left: 1,
      bottom: 1,
      right: 1
    };
    matrix[4][1] = tiles[0]; // add start tile

    // add intersection tiles all the way to the middle planet in straight line
    for (var i = 2; i <= 8; i++) {
      matrix[4][i] = tiles[0];
    }

    expect(check.isEnded(matrix, 31)).to.be.equal(true);

  });

};
