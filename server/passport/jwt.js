var JwtStrategy = require('passport-jwt').Strategy;
var User = require('./../db/db').User;
var config = require('./config');

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = function (req) {
   return  req.headers['x-access-token'];
  };
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.get(jwt_payload.id).run()
      .then(function (user) {
        done(null, user);
      })
      .catch(function (err) {
        return done(err, null);
      });
  }));

};
