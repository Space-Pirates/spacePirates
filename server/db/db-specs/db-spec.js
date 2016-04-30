var chai = require('chai');
var db = require('./../db');
var thinky = require('./../thinky');

var expect = chai.expect;


describe('RethinkDB', function() {

  describe('User model', function() {

    var TEST_USER = {
      name: 'test',
      age: 80,
      email: 'test@example.com',
      username: 'test',
      password: 'test123'
    }

    beforeEach(function(done){
      db.User.save(TEST_USER).then(() => done());
    });

    afterEach(function(done) {
      db.User.filter(TEST_USER).delete().run().then(() => done());
    });

    it('should exist', function(done) {
      expect(db.User).to.exist;
      done();
    });

    it('should have created a table named "User"', function(done) {
      expect(db.User.getTableName()).to.equal('User');
      done();
    });

    it('should be able to save and retrieve a user', function(done) {
      db.User.run().then(function(users) {
        expect(users[0].name).to.be.equal('test');
        expect(users[0].age).to.be.equal(80);
        expect(users[0].email).to.be.equal('test@example.com');
        expect(users[0].username).to.be.equal('test');
        done();
      });
    });

  });

  describe('Player model', function() {

    var TEST_PLAYER = {
      socketId: 'socketId',
      role: 'owner',
      isTurn: false,
      hand: ['test', 'hand'],
      debuffs: ['test', 'debuffs']
    }

    beforeEach(function(done){
      db.Player.save(TEST_PLAYER).then(() => done());
    });

    afterEach(function(done) {
      db.Player.filter(TEST_PLAYER).delete().run().then(() => done());
    });

    it('should exist', function(done) {
      expect(db.Player).to.exist;
      done();
    });

    it('should have created a table named "Player"', function(done) {
      expect(db.Player.getTableName()).to.equal('Player');
      done();
    });

    it('should be able to save and retrieve a user', function(done) {
      db.Player.run().then(function(players) {
        expect(players[0].socketId).to.be.equal('socketId');
        expect(players[0].role).to.be.equal('owner');
        expect(players[0].isTurn).to.be.equal(false);
        expect(players[0].hand).to.deep.equal(['test', 'hand']);
        expect(players[0].debuffs).to.deep.equal(['test', 'debuffs'])
        done();
      });
    });

  });
});
