var Game = require('../game');
var db = require('../../db/db');
var _ = require('underscore');

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
  var game = new Game();
  var doc;

  before(function (done) {
    db.Game.get(game.gameId)
    .run()
    .then(function(data) {
      doc = data;
      done();
    })
    .catch(function(err) {
      done(err);
    });
  });

  it('should create a new create a new game document in the database', function(done) {
    expect(doc).to.be.an('object');
    expect(doc.id).to.be.a('string');
  });
  it('should keep reference to the gameId', function() {
    expect(game.gameId).to.equal(doc.id);
  });
  it('should retain access to a new board instance', function() {
    expect(game.board).to.be.an('object');
    expect(game.board).to.have.keys('gameId');
    expect(game.board.gameId).to.equal(game.gameId);
  });
  it('should retain access to a new deck instance', function() {
    expect(game.deck).to.be.an('object');
    expect(game.deck).to.have.keys('gameId');
    expect(game.deck.gameId).to.equal(game.gameId);
  });
  it('should retain access to all player instances', function() {
    expect(game.players).to.be.an('object');
    expect(_.size(game.players)).to.equal(4);
  });
});
