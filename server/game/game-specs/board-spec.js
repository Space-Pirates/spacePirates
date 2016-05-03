var chai = require('chai');
var Board = require('../board');
var db = require('../../db/db');
var expect = chai.expect;
var testMatrix = require('../board-matrix.js');
var testTile = {
  top: 0,
  left: 1,
  bottom: 0,
  right: 0
};
var board, matrix;

it('should exist', function() {
  expect(Board).to.be.a('function');
});

board = new Board('testGameId');

it('should be a class with psuedoclassical instantiation', function() {
  expect(board).to.be.an('object');
});

describe('properties', function () {
  it('should have a gameId property', function() {
    expect(board.gameId).to.equal('testGameId');
  });
  // it('should have a lastDiscard property');  TODO: Move this to Deck Speck
  // it('should have a tilesRemaining property');  TODO: Move this to Deck Speck
});

describe('methods', function() {

  describe('Tile', function() {
    it('should exist', function() {
      expect(board.tile).to.be.a('function');
    });
    it('should be a psuedoclassical constructor', function() {
      var tile = new board.Tile();

      expect(tile).to.be.an('object');
    });
    it('should set the properties for a tile instance', function() {
      var tile = new board.Tile(0, 1, 0, 0);

      expect(tile).to.deep.equal(testTile);
    });
  });

  beforeEach(function () {
    new db.Board({
      gameId: 'testGameId',
      matrix: []
    });
  });

  afterEach(function () {
    db.board.filter({gameId: 'testGameId'})
    .delete()
    .then(function() {
      done();
    })
    .catch(function(err) {
      done(err);
    })
  });

  describe('setMatrix', function() {
    it('should exist', function() {
      expect(board.setMatrix).to.be.a('function');
    });
    it('should set the board matrix in the database for the current game', function(done) {
      board.setMatrix(testMatrix)
      .then(function() {
        db.Board.filter({gameId: 'testGameId'})
        .run()
        .then(function(data) {
          expect(data[0]).to.be.an('object');
          expect(data[0].testMatrix).to.deep.equal(testMatrix);
          done();
        })
        .catch(function(err) {
          done(err);
        })
      })
      .catch(function(err) {
        done(err);
      });
    });
  });
  
  describe('getMatrix', function() {
    it('should exist', function() {
      expect(board.getMatrix).to.be.a('function');
    });
    it('should get the board matrix from the database for the current game', function(done) {
      board.setMatrix(testMatrix)
      .then(function() {
        board.getMatrix()
        .then(function(data) {
          expect(data).to.be.an('array');
          expect(data).to.deep.equal(testMatrix);
          done();
        })
        .catch(function(err) {
          done(err);
        });
      })
      .catch(function(err) {
        done(err);
      });
    });
  });

  describe('update', function() {

    beforeEach(function (done) {
      board.setMatrix(testMatrix)
      .then(function() {
        board.update(3, 1, testTile)
        .then(function() {
          board.getMatrix()
          .then(function(data) {
            matrix = data;
            done()
          })
          .catch(function(err) {
            done(err);
          });
        })
        .catch(function(err) {
          done(err);
        });
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should exist', function() {
      expect(board.getMatrix).to.be.a('function');
    });
    it('should place tile in correct location in database matrix', function() {
      expect(matrix[3][1]).to.deep.equal(testTile);
    });
    it('should update the surrounding tiles in database matrix', function() {
      expect(matrix[2][1]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
      expect(matrix[3][0]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
      expect(matrix[4][1]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
      expect(matrix[3][2]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
    });
    it('should follow game rules for updating surrounding tiles', function() {
      expect(matrix[2][1]).to.have.all.keys({top: 0, left: 0, bottom: 1, right: 0});
      expect(matrix[3][0]).to.have.all.keys({top: 0, left: 0, bottom: 0, right: 1});
      expect(matrix[4][1]).to.have.all.keys({top: 1, left: 0, bottom: 0, right: 0});
      expect(matrix[3][2]).to.have.all.keys({top: 0, left: 1, bottom: 0, right: 0});
    });
  });

  describe('initialize', function() {
    it('should exist');
    it('should create a new database document for the current game');
    it('should set the board matrix in the database for the current game');
    it('should place start location in the matrix slots');
    it('should have correct adjacent tiles in the matrix');
    it('should place three randomized planets in the matrix slots');
  });
})