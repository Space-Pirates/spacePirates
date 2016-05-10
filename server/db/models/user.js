var thinky = require('./../thinky');
var bcrypt = require('bcrypt-nodejs');
var type = thinky.type;

var User = thinky.createModel('User', {
  id: type.string(),
  name: type.string(),
  age: type.number(),
  email: type.string(),
  username: type.string(),
  password: type.string()
});

User.pre('save', function (next) {
  var user = this;

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
   }
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        next(err);
      }
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

User.define('comparePassword', function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
     if (err) {
       callback(err);
     }
     callback(null, isMatch);
   });
});


module.exports = User;

// Must come after export
var Game = require('./game');
var Player = require('./player');

User.hasMany(Game, 'games', 'id', 'ownerId');
User.hasMany(Player, 'players', 'id', 'userId');
// User.hasMany(Game, 'ownedGames', 'id', 'ownerId');

