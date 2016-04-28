var app = require('./server');
var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log('Server listening ', port);
});

