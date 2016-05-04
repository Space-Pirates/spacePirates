var signup = require('./signup');
var signin = require('./signin');
var jwt = require('./jwt');
var User = require('./../db/db').User;

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.get(id).run()
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        done(err, null);
      });
  });
  
  signin(passport);
  signup(passport);
  jwt(passport);
};
