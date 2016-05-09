var chai = require('chai');
var Game = require('../game');
var db = require('../../db/db');
var _ = require('underscore');
var expect = chai.expect;

game = new Game('testGameId');

module.exports = function() {
  before(function(done){
    game.startGame().then(() => done());
  });

  describe('properties', function () {
    it('should have a gameID', function() {
      expect(game).to.have.any.keys('gameId');
      expect(game.gameId).to.equal('testGameId');
    });
    it('should have a board object', function() {
      expect(game).to.have.any.keys('board');
      expect(game.board).to.be.an('object');
    });
    it('should have a deck object', function() {
      expect(game).to.have.any.keys('board');
      expect(game.deck).to.be.an('object');
    });
    it('should have a players object', function() {
      expect(game).to.have.any.keys('board');
      expect(game.players).to.be.an('object');
    });
  });

  describe('initialize method', function () {

    it('should retain access to a new board instance', function() {
      expect(game.board).to.be.an('object');
      expect(game.board).to.have.any.keys('gameId');
      expect(game.board.gameId).to.equal(game.gameId);
    });
    it('should retain access to a new deck instance', function() {
      expect(game.deck).to.be.an('object');
      expect(game.deck).to.have.any.keys('gameId');
      expect(game.deck.gameId).to.equal(game.gameId);
    });
    it('should retain access to all player instances', function() {
      expect(game.players).to.be.an('object');
      expect(_.size(game.players)).to.equal(4);
    });
  });
};
