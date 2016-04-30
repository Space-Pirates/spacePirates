var chai = require('chai');
var expect = chai.expect;
var Player = require('../player');
var player;

module.exports = function() {

  beforeEach(function () {
    var gameID = 'testGameID';
    var socketID = 'testSocketID';
    player = new Player(gameID, socketID);
  });

  it('should exist', function() {
    expect(Player).to.be.a('function');
  });
  it('should be a class in the psuedoclassical style', function() {
    expect(player).to.be.an('object');
  });
  it('should have a gameID property', function() {
    expect(player.gameID).to.equal('testGameID');
  });
  it('should have a playerID property', function() {
    expect(player.playerID).to.be.a('number');
  });
  it('should have a socketID property', function() {
    expect(player.socketID).to.equal('testSocketID');
  });
  it('should create a new player document in the database'); // TODO: hook up to database

  describe('discard method', function () {
    it('should exist', function() {
      expect(player.discard).to.be.a('function');
    });
    it('should remove the given tile from the player\'s hand'); // TODO: hook up to database
    it('should be dealt a new card from the deck'); // TODO: hook up to database
  });
}
