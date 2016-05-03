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
var testRoute = {
  'tileID': 'route-vertical-T-2',
  'top': 2,
  'bottom': 1,
  'left': 1,
  'right': 1
};
var board, matrix, doc;

module.exports = function() {
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
        expect(board.Tile).to.be.a('function');
      });
      it('should be a psuedoclassical constructor', function() {
        var tile = new board.Tile(4, 2, testMatrix);

        expect(tile).to.be.an('object');
      });
      it('should set the properties for a tile instance', function() {
        var tile = new board.Tile(4, 2, testMatrix);

        expect(tile).to.deep.equal(testTile);
      });
    });

    beforeEach(function (done) {
      new db.Board({
        gameId: 'testGameId',
        matrix: []
      })
      .save()
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    afterEach(function (done) {
      db.Board.filter({gameId: 'testGameId'})
      .delete()
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
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
            expect(data[0].matrix).to.deep.equal(testMatrix);
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
          board.update(4, 2, testRoute)
          .then(function() {
            board.getMatrix()
            .then(function(data) {
              matrix = data;
              done();
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
        expect(matrix[4][2]).to.deep.equal(testRoute);
      });
      it('should update the surrounding tiles in database matrix', function() {
        expect(matrix[3][2]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
        expect(matrix[4][1]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
        expect(matrix[5][2]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
        expect(matrix[4][3]).to.have.all.keys(['top', 'left', 'bottom', 'right']);
      });
      it('should follow game rules for updating surrounding tiles', function() {
        expect(matrix[3][2]).to.have.all.keys({top: 0, left: 0, bottom: 2, right: 0});
        expect(matrix[4][1]).to.have.all.keys({top: 1, left: 1, bottom: 1, right: 1});
        expect(matrix[5][2]).to.have.all.keys({top: 1, left: 0, bottom: 0, right: 0});
        expect(matrix[4][3]).to.have.all.keys({top: 0, left: 1, bottom: 0, right: 0});
      });
    });

    describe('initialize', function() {

      beforeEach(function (done) {
        board = new Board('testGameId')
        .then(function() {
          db.Board.filter({gameId: 'testGameId'})
          .run()
          .then(function(data) {
            doc = data[0];
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

      afterEach(function (done) {
        db.Board.filter({gameId: 'testGameId'})
        .delete()
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        });
      });

      it('should exist', function() {
        expect(board.getMatrix).to.be.a('function');
      });
      it('should create a new database document for the current game', function() {
        expect(doc).to.be.an('object');
      });
      it('should set the board matrix in the database for the current game', function() {
        expect(doc.matrix).to.be.an('array');
        expect(doc.matrix).to.have.length(9);
        expect(doc.matrix[0]).to.have.length(12);
        expect(doc.matrix[4]).to.have.length(12);
        expect(doc.matrix[8]).to.have.length(12);
      });
      it('should place start location in the matrix slots', function() {
        expect(doc.matrix[4][1]).to.be.an('object');
        expect(doc.matrix[4][1]).to.have.all.keys({top: 1, left: 1, bottom: 1, right: 1});
      });
      it('should have correct adjacent tiles in the matrix', function() {
        expect(doc.matrix[2][1]).to.have.all.keys({top: 0, left: 0, bottom: 1, right: 0});
        expect(doc.matrix[3][0]).to.have.all.keys({top: 0, left: 0, bottom: 0, right: 1});
        expect(doc.matrix[4][1]).to.have.all.keys({top: 1, left: 0, bottom: 0, right: 0});
        expect(doc.matrix[3][2]).to.have.all.keys({top: 0, left: 1, bottom: 0, right: 0});
      });
      it('should place three randomized planets in the matrix slots', function() {
        var planetArray = [];
        var truePlanetCount = 0;
        var falsePlanetCount = 0;

        expect(doc.matrix[2][10]).to.have.all.keys(['top', 'left', 'bottom', 'right', 'truePlanet']);
        planetArray.push(doc.matrix[2][10]);
        expect(doc.matrix[4][10]).to.have.all.keys(['top', 'left', 'bottom', 'right', 'truePlanet']);
        planetArray.push(doc.matrix[4][10]);
        expect(doc.matrix[6][10]).to.have.all.keys(['top', 'left', 'bottom', 'right', 'truePlanet']);
        planetArray.push(doc.matrix[6][10]);

        for (var i = 0; i < planetArray.length; i++) {
          if (planetArray[i].truePlanet) {
            truePlanetCount++;
          } else {
            falsePlanetCount++;
          }
        }

        expect(truePlanetCount).to.equal(1);
        expect(falsePlanetCount).to.equal(2);
      });
    });
  });
};
