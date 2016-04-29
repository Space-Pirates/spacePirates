var app = require('./server');

var port = process.env.PORT || 5000;

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(port, function () {
  console.log('Server listening ', port);
});
