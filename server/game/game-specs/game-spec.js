var Game = require('../game');

describe('properties', function () {
  
  var game = new Game();

  it('should have a gameID', function() {
    expect(game).to.have.keys('gameId');
    expect(game.gameId).to.be.a('string');
  });
  it('should have a board object', function() {
    expect(game).to.have.keys('board');
    expect(game.board).to.be.an('object');
  });
  it('should have a deck object', function() {
    expect(game).to.have.keys('board');
    expect(game.deck).to.be.an('object');
  });
  it('should have a players object', function() {
    expect(game).to.have.keys('board');
    expect(game.players).to.be.an('object');
  });
});

describe('initialize method', function () {
  it('should create a new create a new game document in the database');
  it('should keep reference to the gameId');
  it('should retain access to a new board instance');
  it('should retain access to a new deck instance');
  it('should retain access to all player instances');
});
