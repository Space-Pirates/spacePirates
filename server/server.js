var express = require('express');
var middleware = require('./utils/middleware');

var app = express();
middleware(app, express);

module.exports = app;
