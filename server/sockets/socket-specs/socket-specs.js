var io = require('socket.io-client');
var db = require('../../db/db');
var games = require('./../../controllers/game-control').currentGames;
var Game = require('../../game/game');
var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);
var expect = chai.expect;

var SOCKET_URL = 'http://0.0.0.0:5000';

var GAME,
    CLIENT;

describe('Socket connection', function () {

  before(function(done) {
    GAME = db.Game.save({}).then(function(doc) {
      games[doc.id] = new Game(doc.id);
      CLIENT = io.connect(SOCKET_URL, {query: 'game_id=' + doc.id + '&user=TEST_USERNAME_1'});
        done();
    });
  });

  after(function(done) {
    db.Game.filter({}).then(function(data) {
      data.forEach(function(doc) {
        doc.deleteAll();
        done();
      });
    });
  });

  it('should emit a "joined" event on connect', function (done) {

    var cb = chai.spy(function(data) {
      expect(data.username).to.be.equal('TEST_USERNAME_1');
      expect(cb).to.have.been.called();
      CLIENT.disconnect();
      done();
    });

    CLIENT.on('connect', function () {
      CLIENT.on('joined', cb);
    });
  });

  it('should handle a "ready" event by creating player and adding to game', function (done) {
    CLIENT.emit('ready', {userId: 'TEST_USER_ID'});
    setTimeout(function () {
      done();
    }, 250);
  });

});
