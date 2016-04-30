var chai = require('chai');
var db = require('./../db');
var thinky = require('./../thinky');

var expect = chai.expect;

var TEST_USER = {
  name: 'test',
  age: 80,
  email: 'test@example.com',
  username: 'test',
  password: 'test123'
}

describe('User model', function(done) {

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
    db.User.run().then(function (users) {
      expect(users[0].name).to.be.equal('test');
      expect(users[0].age).to.be.equal(80);
      expect(users[0].email).to.be.equal('test@example.com');
      expect(users[0].username).to.be.equal('test');
      done();
    });
  });

});

