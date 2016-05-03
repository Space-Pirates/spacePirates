var chai = require('chai');
var Board = require('../board');
var expect = chai.expect;
var board;

beforeEach(function () {
  board = new Board();
});

it('should exist');
it('should be a class with psuedoclassical instantiation');

describe('properties', function () {
  it('should have a gameId property');
  // it('should have a lastDiscard property');  TODO: Move this to Deck Speck
  // it('should have a tilesRemaining property');  TODO: Move this to Deck Speck
});

describe('methods', function() {

  describe('Tile', function() {
    it('should exist');
    it('should be a psuedoclassical constructor');
    it('should set the properties for a tile instance');
  })

  describe('setMatrix', function() {
    it('should exist');
    it('should set the board matrix in the database for the current game');
  });
  
  describe('getMatrix', function() {
    it('should exist');
    it('should get the board matrix from the database for the current game');
  });

  describe('update', function() {
    it('should exist');
    it('should place tile in correct location in database matrix');
    it('should update the surrounding tiles in database matrix');
    it('should follow game rules for updating surrounding tiles');
  });

  describe('initialize', function() {
    it('should exist');
    it('should set the board matrix in the database for the current game');
    it('should place start location in the matrix slots');
    it('should have correct adjacent tiles in the matrix');
    it('should place three randomized planets in the matrix slots');
  });
})