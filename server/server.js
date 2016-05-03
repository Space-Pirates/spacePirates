var express = require('express');

var app = express();

//set up middleware
require('./utils/middleware')(app, express);

// set up routes
require('./utils/routes')(app);

// set up sockets
var http = require('./sockets/setup')(app);

module.exports = http;

