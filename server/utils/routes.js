var helpers = require('./helpers');

module.exports = function(app, passport) {
  app.post('/signup', passport.authenticate('signup'), helpers.signup);
 app.post('/signin', passport.authenticate('signin'), helpers.signin);

  app.route('/game/:id')
    .get(function(req, res) {
      console.log(req.body);
      res.status(200).send('ok');
    })
    .post(function(req, res) {
      console.log(req.body);
      res.status(200).send('ok');
    });
};
