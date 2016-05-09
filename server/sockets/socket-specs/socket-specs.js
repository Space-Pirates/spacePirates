var io = require('socket.io-client');
var db = require('../../db/db');
var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);
var expect = chai.expect;

var SOCKET_URL = 'http://0.0.0.0:5000';

describe('Socket connection', function () {

  // before(function() {

  // });

  it ('should emit a "joined" event on connect', function (done) {
    var cb = chai.spy(function(data) {
      expect(data.username).to.be.equal('TEST_USERNAME');
      expect(cb).to.have.been.called();
      done()
    });

    var client = io.connect(SOCKET_URL, {query: 'game_id=TEST_GAME_ID&user=TEST_USERNAME'});

    client.on('connect', function () {
      client.on('joined', cb);
    });
  });

});
