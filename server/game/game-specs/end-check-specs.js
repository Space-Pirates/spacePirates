var chai = require('chai');
var check = require('../end_check');
var tiles = require('../tile-dictionary');

var expect = chai.expect;

describe('isEnded', function () {

  it('should return false for and incomplete route to planets', function() {
    var matrix = require('../board-matrix')();
    expect(check.isEnded(matrix)).to.be.equal(false);
  });

});
