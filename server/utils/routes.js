var control = require('../controllers/all-control');

module.exports = function(app, passport) {
  app.post('/signup', passport.authenticate('signup'), control.auth.signup);
  app.post('/signin', passport.authenticate('signin'), control.auth.signin);

  app.route('/game/')
    .get(passport.authenticate('jwt'), control.game.getAll)
    .post(passport.authenticate('jwt'), control.game.create);
};
