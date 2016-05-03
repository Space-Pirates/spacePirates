var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');

module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());
  require('./../passport/init')(passport);
  require('./../passport/signup')(passport);
  require('./../passport/signin')(passport);
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + '/../../client'));
  require('./utils/routes')(app, passport);
};
