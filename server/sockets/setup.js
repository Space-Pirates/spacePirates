module.exports = function(app) {

  var http =  require('http').Server(app);
  var io  = require('socket.io')(http);

  io.on('connection', function(socket) {
    var room = socket.handshake.query.game_id;
    var user = socket.handshake.query.user;

    socket.join(room);
    console.log(user + " joined game: " + room);

    socket.on('disconnect', function() {
      socket.to(room).emit('left', user);
      socket.leave(room);
    });

    socket.on('move', function(data) {
      // call game stuff here
      socket.to(room).emit('moved', user);
    })

  });

  io.on('ready', function(socket, dat) {
    console.log(dat, 'ready');
    if (io.engine.clientsCount >= 4) {
      io.sockets.emit('4players');
    }
  });

  return http;
}
