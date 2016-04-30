var chai = require('chai');
var r = require('rethinkdb');
var expect = chai.expect;
var db = require('./../main');

db.setup();

describe('rethinkDB', function(done) {

  it('should have a database called "space_pirates"', function(done) {
    db.connect(function(conn) {
      r.dbList().run(conn, function(err, dbList) {
        if (err) {
          throw err;
        }
        expect(dbList).to.contain('space_pirates');
        done();
      });
    });
  });

  it('should have a table called "users"', function(done) {
    db.connect(function(conn) {
      r.db('space_pirates').tableList().run(conn, function(err, tableList) {
        if (err) {
          throw err;
        }
        expect(tableList).to.contain('users');
        done();
      });
    });
  });

  it('should have a table called "games"', function(done) {
    db.connect(function(conn) {
      r.db('space_pirates').tableList().run(conn, function(err, tableList) {
        if (err) {
          throw err;
        }
        expect(tableList).to.contain('games');
        done();
      });
    });
  });
});
