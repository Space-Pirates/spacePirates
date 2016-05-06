var control = require('../controllers/all-control');

module.exports = function(app, passport) {
  app.post('/signup', passport.authenticate('signup'), control.auth.signup);
  app.post('/signin', passport.authenticate('signin'), control.auth.signin);

  app.route('/game/')
    .get(control.game.getAll)
    .post(control.game.create);
};
