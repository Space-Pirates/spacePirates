var chai = require('chai');
var Deck = require('../deck');
var tileDictionary = require('../tile-dictionary.json');
var db = require('../../db/db');
var expect = chai.expect;
var collection, deck, doc;

function makePlayer(cb, done) {
  var playerId;

  new db.Player({
    gameId: 'testGameId',
    role: 'pirate',
    isTurn: false,
    hand: [],
    debuffs: []
  })
  .save()
  .then(function(data) {
    playerId = data;
    done();
  })
  .catch(function(err) {
    console.error(err);
    done();
  });

  cb(playerId);
}

module.exports = function() {

  beforeEach(function (done){
    deck = new Deck('testGameId');
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
      console.error(err);
      done();
    });
  });

  afterEach(function (done) {
    db.Deck.filter({gameId: 'testGameId'})
    .delete()
    .then(function() {
      done();
    })
    .catch(function(err) {
      console.error(err);
      done();
    });
  });

  it('should exist', function() {
    expect(Deck).to.be.a('function');
  });
  it('should be a class with psuedoclassical instantiation', function() {
    expect(deck).to.be.an('Object');
  });
  it('should have a gameId property', function() {
    expect(deck.gameID).to.equal('testGameId');
  });

  describe('setTiles method', function () {
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
          console.error(err);
          done();
        });
      })
      .catch(function(err) {
        console.error(err);
        done();
      });

      expect(doc.tiles).to.deep.equal(['a', 'b', 'c']);
    });
  });

  describe('getTiles method', function () {
    it('should exist', function() {
      expect(deck.getTiles).to.be.a('function');
    });
    it('should return a collection of tile objects', function(done) {
      deck.setTiles(['d', 'e', 'f'])
      .then(function() {
        deck.getTiles()
        .then(function(data) {
          collection = data;
          done();
        })
        .catch(function(err) {
          console.error(err);
          done();
        });
      })
      .catch(function(err) {
        console.error(err);
        done();
      });

      expect(collection).to.be.an('array');
      expect(collection).to.deep.equal(['d', 'e', 'f']);
    });
  });

  describe('shuffle method', function () {
    it('should exist', function() {
      expect(deck.shuffle).to.be.a('function');
    });
    it('should randomize the collection of tiles', function() {
      collection = ['g', 'h', 'i'];
      var shuffled = deck.shuffle(collection);

      expect(shuffled).to.not.deep.equal(collection);
      expect(shuffled).to.have.length(collection.length);
      expect(shuffled).to.contain('g');
      expect(shuffled).to.contain('h');
      expect(shuffled).to.contain('i');
    });
  });

  describe('dealTile method', function () {
    var playerId;

    beforeEach(function (done) {
      deck.setTiles(['a', 'b', 'c'])
      .then(function() {
        makePlayer(function(data) {
          playerId = data.id;
        }, done);
      })
      .catch(function(err) {
        console.error(err);
        done();
      });
    });

    afterEach(function (done) {
      db.Player
      .delete()
      .then(function() {
        done();
      })
      .catch(function(err) {
        console.error(err);
        done();
      });
    });

    it('should exist', function() {
      expect(deck.dealTile).to.be.a('function');
    });
    it('should give a player a tile', function(done) {
      var player;
      deck.dealTile(playerId)
      .then(function() {
        db.Player.get(playerId).run()
        .then(function(data) {
          player = data;
          done();
        })
        .catch(function(err) {
          console.error(err);
          done();
        });
      })
      .catch(function(err) {
        console.error(err);
        done();
      });
      expect(player.hand).to.deep.equal(['c']);
    });
    it('should remove the given tile from the deck', function(done) {
      var tiles;
      deck.dealTile(playerId)
      .then(function() {
        deck.getTiles()
        .then(function(data) {
          tiles = data;
          done();
        })
        .catch(function(err) {
          console.error(err);
          done();
        });
      })
      .catch(function(err) {
        console.error(err);
        done();
      });

      expect(tiles).to.deep.equal(['a', 'b']);
    });
  });

  describe('initialize method', function () {

    beforeEach(function (done) {
      deck.initialize()
      .then(function() {
        deck.getTiles()
        .then(function(tiles) {
          collection = tiles;
          done();
        });
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
    // TODO: Hook this up to database
    it('should deal 3 tiles to each player', function(done) {
      var players = [];
      makePlayer(function(player) {
        players.push(player);
      }, function() {
        makePlayer(function(player) {
          players.push(player);
        }, function() {
          makePlayer(function(player) {
            players.push(player);
          }, done);
        });
      });

      expect(players[0].hand.length).to.equal(3);
      expect(players[1].hand.length).to.equal(3);
      expect(players[2].hand.length).to.equal(3);
    });
    it('should have 54 tiles remaining in the collection', function() {
      expect(collection).to.have.length(54);
    });
  });
};
