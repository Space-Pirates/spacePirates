var r = require('rethinkdb');

r.connect({host: 'localhost', port: 28015})
  .then(function (conn) {
    module.exports.connection = conn;
  });
