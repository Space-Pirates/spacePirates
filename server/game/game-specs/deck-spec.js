var chai = require('chai');
var Deck = require('../deck');
var tileDictionary = require('../tile-dictionary.json');
var db = require('../../db/db');
var expect = chai.expect;
var collection, doc;

var deck = new Deck('testGameId'); 

function makePlayer(id) {
  return new db.Player({
    id: id || 'asdf',
    gameId: 'testGameId',
    role: 'pirate',
    isTurn: false,
    hand: [],
    debuffs: []
  })
  .save()
  .then(function(data) {
    return data;
  })
  .catch(function(err) {
    return err;
  });
}

module.exports = function() {

  it('should exist', function() {
    expect(Deck).to.be.a('function');
  });
  it('should be a class with psuedoclassical instantiation', function() {
    expect(deck).to.be.an('Object');
  });
  it('should have a gameId property', function() {
    expect(deck.gameId).to.equal('testGameId');
  });

  describe('setTiles method', function() {

    beforeEach(function (done){
      new db.Deck({
        gameId: 'testGameId',
        lastDiscard: '',
        tilesRemaining: 54,
        tiles: []
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
      db.Deck.filter({gameId: 'testGameId'})
      .delete()
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should exist', function() {
      expect(deck.setTiles).to.be.a('function');
    });
    it('should set the collection of tiles in the database', function(done) {
      deck.setTiles(['a', 'b', 'c'])
      .then(function() {
        db.Deck.filter({gameId: 'testGameId'}).run()
        .then(function(data) {
          doc = data;
          done();
        })
        .catch(function(err) {
          expect(doc.tiles).to.deep.equal(['a', 'b', 'c']);
          done(err);
        });
      })
      .catch(function(err) {
        done(err);
      });
    });
  });

  describe('getTiles method', function() {

    beforeEach(function (done){
      new db.Deck({
        gameId: 'testGameId',
        lastDiscard: '',
        tilesRemaining: 54,
        tiles: []
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
      db.Deck.filter({gameId: 'testGameId'})
      .delete()
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should exist', function() {
      expect(deck.getTiles).to.be.a('function');
    });
    it('should return a collection of tile objects', function(done) {
      var tiles;

      deck.setTiles(['d', 'e', 'f'])
      .then(function() {
        deck.getTiles()
        .then(function(data) {
          tiles = data;
          expect(tiles).to.be.an('array');
          expect(tiles).to.deep.equal(['d', 'e', 'f']);
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

  describe('dealTile method', function() {
    var playerId;

    beforeEach(function (done){
      new db.Deck({
        gameId: 'testGameId',
        lastDiscard: '',
        tilesRemaining: 54,
        tiles: []
      })
      .save()
      .then(function() {
        deck.setTiles(['a', 'b', 'c'])
        .then(function() {
          makePlayer()
          .then(function(data) {
            playerId = data.id;
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

    afterEach(function (done) {
      db.Deck.filter({gameId: 'testGameId'})
      .delete()
      .then(function() {
        db.Player
        .delete()
        .then(function() {
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

    it('should exist', function() {
      expect(deck.dealTile).to.be.a('function');
    });
    it('should give a player a tile', function(done) {
      deck.dealTile(playerId)
      .then(function() {
        db.Player.get(playerId).run()
        .then(function(player) {
          expect(player.hand).to.deep.equal(['c']);
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
    it('should remove the given tile from the deck', function(done) {
      var tiles;
      deck.dealTile(playerId)
      .then(function() {
        deck.getTiles()
        .then(function(data) {
          tiles = data;
          expect(tiles).to.deep.equal(['a', 'b']);
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

  describe('setHand method', function() {

    beforeEach(function (done) {
      makePlayer('testPlayerId')
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    afterEach(function (done) {
      db.Player.get('testPlayerId')
      .delete()
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
    });

    it('should exist', function() {
      expect(deck.setHand).to.be.a('function');
    });
    it('should set the hand of a player', function(done) {
      deck.setHand('testPlayerId', ['a', 'b', 'c'])
      .then(function() {
        db.Player.get('testPlayerId')
        .run()
        .then(function(player) {
          expect(player.hand).to.be.an('array');
          expect(player.hand).to.deep.equal(['a', 'b', 'c']);
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

  describe('initialize method', function () {

    before(function(done) {
      deck.initialize()
      .then(function() {
        deck.getTiles()
        .then(function(tiles) {
          collection = tiles;
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

    it('should exist', function() {
      expect(deck.initialize).to.be.a('function');
    });
    it('should create a new collection of tiles', function() {
      expect(collection).to.be.an('array');
      expect(collection[0]).to.be.an('object');
    });
    it('should have shuffled the new collection of tiles', function() {
      expect(collection.slice(0, 9)).to.not.deep.equal(tileDictionary.slice(0, 9));
    });
    it('should have 66 tiles in the collection', function() {
      expect(collection).to.have.length(66);
    });
  });
};
