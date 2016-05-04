var LocalStrategy = require('passport-local').Strategy;
var User = require('./../db/db').User;

module.exports = function (passport) {
  passport.use('signin', new LocalStrategy(function (username, password, done) {
    User.filter({username: username}).run()
      .then(function (users) {
        var user = users[0];
        if (!user) {
          return done();
        }
        user.comparePassword(password, function (err, isMatch) {
          if(err) {
            return done(err);
          }
          if(!isMatch) {
            return done(null, false);
          }
          done(null, user);
        });
      });
  }));
};


