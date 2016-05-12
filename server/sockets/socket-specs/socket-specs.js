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
    CLIENT_2,
    CLIENT_3,
    CLIENT_4,
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

      // create connections
      CLIENT_1 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME1'}),
      CLIENT_2 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME2'}),
      CLIENT_3 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME3'}),
      CLIENT_4 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME4'})
      done();
      // setTimeout(function() { done () }, 300);
    });
  });


  it('should emit a "joined" event on connect', function (done) {
    CLIENT_1.on('joined', cb);

    function cb(data) {
      expect(data.username).to.be.equal('TEST_USERNAME1');
      done();
    };

  });

  it('should fire a "4players" and a "startGame" event when joined by 4 players', function (done) {
    CLIENT_2.on('4players', function(data) {
      expect(data).to.exist;
      expect(data).to.be.equal(GAME_ID);
    });

    CLIENT_2.on('startGame', function(data) {
      expect(data).to.exist;
      expect(data['matrix']).to.exist;
      expect(data['tilesRemaining']).to.be.equal(54);
      done();
    });

    setTimeout(function() {
      CLIENT_1.emit('ready', {userId: 'TEST_USER_ID1'});
      CLIENT_2.emit('ready', {userId: 'TEST_USER_ID2'});
      CLIENT_3.emit('ready', {userId: 'TEST_USER_ID3'});
      CLIENT_4.emit('ready', {userId: 'TEST_USER_ID4'});
    }, 300);
  });

});
