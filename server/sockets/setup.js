module.exports = function(app) {

  var http =  require('http').Server(app);
  var io  = require('socket.io')(http);

  io.on('connection', function(socket) {
    var room = socket.handshake.query.game_id;
    var user = socket.handshake.query.user;

    // join room, room is the game_id
    socket.join(room);
    console.log(user + " joined game: " + room);

    socket.on('disconnect', function() {
      socket.to(room).emit('left', user);
      socket.leave(room);
    });

    // listen for moves
    socket.on('move', function(data) {
      // call game stuff here
      io.to(room).emit('moved', user);
    })

    // listen for load state is loaded
    socket.on('ready', function(socket, dat) {
      if (io.sockets.adapter.rooms[room].length >= 4) {
        io.to(room).emit('4players');
      }
    });

    // announce arrival so everyone else in room can call
    io.to(room).emit('joined', {username: user});

  });

  return http;
}
