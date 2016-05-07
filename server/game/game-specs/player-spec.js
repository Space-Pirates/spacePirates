var chai = require('chai');
var expect = chai.expect;
var Player = require('../player');
var db = require('../../db/db');
var player;

module.exports = function() {

  before(function () {
    var gameID = 'testGameID';
    var socketID = 'testSocketID';
    player = new Player(gameID, socketID);
  });

  it('should exist', function() {
    expect(Player).to.be.a('function');
  });
  it('should be a class in the psuedoclassical style', function() {
    expect(player).to.be.an('object');
  });
  it('should have a gameID property', function() {
    expect(player.gameID).to.equal('testGameID');
  });
  it('should have a playerID property', function() {
    expect(player.playerID).to.be.a('string');
  });
  it('should have a socketID property', function() {
    expect(player.socketID).to.equal('testSocketID');
  });
  it('should have a lastPlayed property', function () {
    expect(player.lastPlayed).to.be.an('object');
  });
  it('should create a new player document in the database', function(done) {
    db.Player.filter({gameId: 'testGameID'})
    .run()
    .then(function (data) {
      expect(data[0]).to.be.an('object');
      done();
    })
    .catch(function (err) {
      done(err);
    });
  });

  describe('discard method', function () {
    beforeEach(function (done) {

      var test = {
        hand: [{tileId: 'test1' }, {tileId: 'test2', }, {tileId: 'test3'}]
      };

      db.Player.filter({gameID: 'testGameID'})
      .update(test)
      .then(function () {
        done();
      })
      .catch(function (err) {
        done(err);
      });
    });

    it('should exist', function() {
      expect(player.discard).to.be.a('function');
    });
    it('should remove the given tile from the player\'s hand', function (done) {
      player.discard('test1')
      .then(function () {
        db.Player.filter({gameId: 'testGameID'})
        .run()
        .then(function (data) {
          expect(data[0].hand).to.not.include({tileId: 'test1'});
          done();
        })
        .catch(function (err) {
          done(err);
        });
      })
      .catch(function (err) {
        done(err);
      });
    });
  });

  db.Player.filter({gameID: 'testGameID'})
  .delete()
  .then(function (result) {
    return result;
  })
  .catch(function (err) {
    return err;
  });
};
