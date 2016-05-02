var express = require('express');
var middleware = require('./utils/middleware');

var app = express();
middleware(app, express);

module.exports = app;

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
module.exports = app;

