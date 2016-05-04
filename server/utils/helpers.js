var jwt = require('jsonwebtoken');
var config = require('./../passport/config');

module.exports = {
  signin: function (req, res) {
    var token = jwt.sign(req.user, config.secret);
    res.send({'token': token, username: req.user.username});
  },
  signup: function (req, res) {
    var token = jwt.sign(req.user, config.secret);
    res.send({'token': token, username: req.user.username});
  }
};