var chai = require('chai');
var Deck = require('../deck');
var expect = chai.expect();

describe('Deck Class', function() {

  beforeEach(function () {
    var deck = new Deck();
  });

  it('should exist', function() {
    expect(Deck).to.be.a('function');
  });
  it('should be a class with psuedoclassical instantiation', function() {
    expect(deck).to.be.an("Object");
  });
  it('should have a gameID property', function() {
    expect(deck.gameID).to.be.a("number");;
  });

  describe('setTiles method', function () {
    it('should exist', function() {
      expect(deck.setTiles).to.be.a('function');
    });
    // TODO: Hook tests up to database
    it('should set the collection of tiles in the database');
  });

  describe('getTiles method', function () {
    it('should exist', function() {
      expect(deck.getTiles).to.be.a('function');
    });
    it('should return a collection of tile objects', function(done) {
      var collection = [];

      deck.setTiles(['a', 'b', 'c'])
      .then(function() {
        deck.getTiles()
        .then(function(collection) {
          collection = deck.getTiles();
          done();
        })
      });

      expect(collection).to.be.an("array");
      expect(collection).to.deep.equal(['a', 'b', 'c']);
    });
  });

  describe('shuffle method', function () {
    it('should exist', function() {
      expect(deck.shuffle).to.be.a('function');
    });
    it('should randomize the collection of tiles', function() {
      var collection = ['a', 'b', 'c'];
      var shuffled = deck.shuffle(collection);

      expect(shuffled).to.not.deep.equal(collection);
      expect(shuffled).to.have.length(collection.length);
      expect(shuffled).to.contain('a');
      expect(shuffled).to.contain('b');
      expect(shuffled).to.contain('c');
    });
  });

  describe('dealTile method', function () {
    it('should exist');
    it('should give a player a tile');
    it('should not have the given tile in the deck');
  });

  describe('initialize method', function () {
    it('should exist');
    it('should create a new collection of tiles');
    it('should have shuffled the new collection of tiles');
    it('should deal 3 tiles to each player');
    it('should have 66 tiles remaining in the collection');
  });
});