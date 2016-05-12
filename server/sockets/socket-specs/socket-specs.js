var request = require('request-promise');
var io = require('socket.io-client');
var db = require('../../db/db');
var Game = require('../../game/game');
var chai = require('chai');
var spies = require('chai-spies');
var rewire = require('rewire');

var sockets = rewire('../setup');
var games = sockets.__get__('games');

var expect = chai.expect;

var URL = 'http://0.0.0.0:5000';

var CLIENT_1, USER_1,
    CLIENT_2, USER_2,
    CLIENT_3, USER_3,
    CLIENT_4, USER_4,
    GAME_ID;

describe('Socket connection', function () {

  before(function(done) {
    request({
      method: 'POST',
      url: 'http://127.0.0.1å:5000/signup',
      data: {
        'name': 'TEST1',
        'email': 'TEST_EMAIL1',
        'username': 'TEST_USERNAME1',
        'password': 'TEST'
      },
      contentType: 'application/json'
    }).then(function(resp){
      USER_1 = data;
    })
    // request({
    //   method: 'POST',
    //   url: 'http://0.0.0.0:5000/signup',
    //   data: {
    //     name: 'TEST2',
    //     email: 'TEST_EMAIL2',
    //     username: 'TEST_USERNAME2',
    //     password: 'TEST'
    //   }
    // }, function(err, resp, data){
    //   console.error(data);
    //   USER_2 = data;
    // });
    // request({
    //   method: 'POST',
    //   url: 'http://0.0.0.0:5000/signup',
    //   data: {
    //     name: 'TEST3',
    //     email: 'TEST_EMAIL3',
    //     username: 'TEST_USERNAME3',
    //     password: 'TEST'
    //   }
    // }, function(err, resp, data){
    //   USER_3 = data;
    // });
    // request({
    //   method: 'POST',
    //   url: 'http://0.0.0.0:5000/signup',
    //   data: {
    //     name: 'TEST4',
    //     email: 'TEST_EMAIL4',
    //     username: 'TEST_USERNAME4',
    //     password: 'TEST'
    //   }
    // }, function(err, resp, data){
    //   USER_4 = data;
    // });
    request({
      headers: {
        'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZWtAYXNrZGouYXNkIiwiaWQiOiIzZGU1MGY0YS01OGVjLTQ1M2EtYTM4Mi1mNmZmYjg5NGJkZWIiLCJuYW1lIjoiTWlrZWsiLCJwYXNzd29yZCI6IiQyYSQxMCRud0ExVk4vSmFCUHMucFdPMHlBRlhPeGNSVk4vdE03S2pRU2pZWXhuaVNYZGNRanVWMjdoVyIsInVzZXJuYW1lIjoibWlrZWsiLCJpYXQiOjE0NjI3Mzc2MDF9.byYckg02t_fvN8QqlANYabq4ySKy1v7h-cY8l79MU2E"
      },
      method: 'POST',
      url: 'http://0.0.0.0:5000/game'
    }).then(function(res) {
      var GAME_ID = res.data;

      // create connections
      CLIENT_1 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME1'}),
      CLIENT_2 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME2'}),
      CLIENT_3 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME3'}),
      CLIENT_4 = io.connect(URL, {query: 'gameId=' + GAME_ID + '&user=TEST_USERNAME4'})
      done();
      // setTimeout(function() { done () }, 300);
    });
  });

  after(function() {
    CLIENT_1.disconnect();
    CLIENT_2.disconnect();
    CLIENT_3.disconnect();
    CLIENT_4.disconnect();
    db.User.get(USER_1.id).then(doc => doc.remove());
    db.User.get(USER_2.id).then(doc => doc.remove());
    db.User.get(USER_3.id).then(doc => doc.remove());
    db.User.get(USER_4.id).then(doc => doc.remove());
  });

  it('should emit a "joined" event on connect', function (done) {
    CLIENT_1.on('joined', cb);

    function cb(data) {
      expect(data.username).to.be.equal('TEST_USERNAME1');
      done();
    };

  });

  it('should fire a "4players" and a "startGame" event when joined by 4 players', function (done) {
    CLIENT_1.on('4players', function(data) {
      expect(data).to.be.equal(GAME_ID);
    });

    CLIENT_1.on('startGame', function(data) {
      expect(data).to.exist;
      expect(data['matrix']).to.exist;
      expect(data['tilesRemaining']).to.be.equal(54);
      done();
    });

    CLIENT_1.emit('ready', {id: USER_1.id});
    CLIENT_2.emit('ready', {id: USER_2.id});
    CLIENT_3.emit('ready', {id: USER_3.id});
    CLIENT_4.emit('ready', {id: USER_4.id});
  });

  it('should fire a "hand" event in response to "readyForHand" with hand and role info', function (done) {
    CLIENT_3.on('hand', function(hand){
      done();
    });
    CLIENT_3.emit('readyForHand', {userId: 'TEST_USER_ID3'});
  });
});
