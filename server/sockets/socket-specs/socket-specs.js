var request = require('request');
var io = require('socket.io-client');
var db = require('../../db/db');
var Game = require('../../game/game');
var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);
var expect = chai.expect;

var URL = 'http://0.0.0.0:5000';

var CLIENT_1,
    CLIENT_2
    GAME_ID;

describe('Socket connection', function () {

  before(function(done) {

    request({
      headers: {
        'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZWtAYXNrZGouYXNkIiwiaWQiOiIzZGU1MGY0YS01OGVjLTQ1M2EtYTM4Mi1mNmZmYjg5NGJkZWIiLCJuYW1lIjoiTWlrZWsiLCJwYXNzd29yZCI6IiQyYSQxMCRud0ExVk4vSmFCUHMucFdPMHlBRlhPeGNSVk4vdE03S2pRU2pZWXhuaVNYZGNRanVWMjdoVyIsInVzZXJuYW1lIjoibWlrZWsiLCJpYXQiOjE0NjI3Mzc2MDF9.byYckg02t_fvN8QqlANYabq4ySKy1v7h-cY8l79MU2E"
      },
      method: 'POST',
      url: 'http://0.0.0.0:5000/game'
    }, function(err, res, data) {
      console.log(data);
      var GAME_ID = data;

      Promise.all([
        CLIENT_1 = io.connect(URL, {query: 'game_id=' + GAME_ID + '&user=TEST_USERNAME1'}),
        CLIENT_2 = io.connect(URL, {query: 'game_id=' + GAME_ID + '&user=TEST_USERNAME2'}),
        CLIENT_3 = io.connect(URL, {query: 'game_id=' + GAME_ID + '&user=TEST_USERNAME3'}),
        CLIENT_4 = io.connect(URL, {query: 'game_id=' + GAME_ID + '&user=TEST_USERNAME4'})
      ]).then(function() {
        done();
      });

    })

  });


  it('should emit a "joined" event on connect', function (done) {

    var cb = chai.spy(function(data) {
      expect(data.username).to.be.equal('TEST_USERNAME1');
      expect(cb).to.have.been.called();
      done();
    });

    CLIENT_1.on('joined', cb);
  });

  it('should fire a "4players" event when joined by 4 players', function (done) {

    CLIENT_1.on('4players', function(data) {
      done();
    });

    CLIENT_1.emit('ready', {userId: 'TEST_USER_ID1'});
    CLIENT_2.emit('ready', {userId: 'TEST_USER_ID2'});
    CLIENT_3.emit('ready', {userId: 'TEST_USER_ID3'});
    CLIENT_4.emit('ready', {userId: 'TEST_USER_ID4'});
  });
});
