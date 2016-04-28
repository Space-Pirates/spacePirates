var express = require('express');
<<<<<<< 83e74281ddc6c50b662a7ce84ca673505576e6e6
var middleware = require('./utils/middleware');

var app = express();
middleware(app, express);

module.exports = app;
=======
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
module.exports = app;



>>>>>>> (feat) Add basic server to serve client folder
