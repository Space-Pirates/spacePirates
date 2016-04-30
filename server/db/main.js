var r = require('rethinkdb');
var dbConfig = require('./config');

module.exports.connect = function(cb) {
  r.connect(dbConfig.host, function (err, connection) {
    if (err) {
      throw err;
    }
    connection['_id'] = Math.floor(Math.random()*10001);
    cb(connection);
  });
};

module.exports.setup = function() {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    if (err) {
      throw err;
    }
    r.dbCreate(dbConfig.db).run(connection, function(err, result) {
      if(err) {
        console.log("[DEBUG] RethinkDB database '%s' already exists (%s:%s)\n%s", dbConfig.db, err.name, err.msg, err.message);
      }
      else {
        console.log("[INFO ] RethinkDB database '%s' created", dbConfig.db);
      }

      for(var tbl in dbConfig.tables) {
        (function (tableName) {
          r.db(dbConfig.db).tableCreate(tableName).run(connection, function(err, result) {
            if(err) {
              console.log("[DEBUG] RethinkDB table '%s' already exists (%s:%s)\n%s", tableName, err.name, err.msg, err.message);
            }
            else {
              console.log("[INFO ] RethinkDB table '%s' created", tableName);
            }
          });
        })(tbl);
      }
    });
  });
};
