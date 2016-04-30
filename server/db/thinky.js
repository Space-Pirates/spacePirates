var dbConfig = require('./config');
var thinky = require('thinky')(dbConfig);

module.exports = thinky;

