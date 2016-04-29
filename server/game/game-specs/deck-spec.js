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
    });
    it('should set the collection of tiles in the database');
  });

  describe('getTiles method', function () {
    it('should exist');
    it('should return a collection of tile objects');
  });

  describe('shuffle method', function () {
    it('should exist');
    it('should randomize the collection of tiles');
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