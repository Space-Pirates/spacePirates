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
      io.to(room).emit('moved', user);
    })

    socket.on('ready', function(socket, dat) {
      if (io.sockets.adapter.rooms[room].length >= 4) {
        io.to(room).emit('4players');
      }
    });

  });

  return http;
}
