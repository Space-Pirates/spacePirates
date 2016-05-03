module.exports = function(app) {

  var http =  require('http').Server(app);
  var io  = require('socket.io')(http);

  io.on('connection', function(socket, dat) {
    console.log('user connected');

    if (io.engine.clientsCount >= 4) {
      io.sockets.emit('4players');
    }

  });

  return http;
}
