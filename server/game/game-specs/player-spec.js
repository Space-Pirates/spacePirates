var chai = require('chai');
var expect = chai.expect;

module.exports = function() {
  it('should exist');
  it('should be a class in the psuedoclassical style');
  it('should have a gameID property');
  it('should have a playerID property');
  // it('should have a socketID property'); - ???
  it('should create a new player document in the database');

  describe('discard method', function () {
    it('should exist');
    it('should remove the given tile from the player\'s hand');
    it('should be dealt a new card from the deck');
  });
}