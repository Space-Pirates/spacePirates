var chai = require('chai');
var should = chai.should();

describe('Deck Class', function() {

  describe('setTiles', function () {
    it('should exist');
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