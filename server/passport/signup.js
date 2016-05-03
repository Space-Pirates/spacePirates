var LocalStrategy = require('passport-local').Strategy;
var User = require('./../db/db').User;

module.exports = function (passport) {
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  }, function (req, username, password, done) {
    User.filter({username: username}).run()
      .then(function (users) {
        var user = users[0];
        if(user) {
          return done(new Error('User already exists'));
        } else {
          User.save(req.body)
            .then(function (user) {
              return done(null, user);
            })
            .catch(function (err) {
              return done(err, null);
            });
        }
      });
  }));
};
