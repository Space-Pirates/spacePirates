var loadState = {
  preload: function() {
  },
  create: function(){

    var loadingLabel = game.add.text(0, 0, 'Waiting for players...', {font:'60px Pirate Font', fill:'#ff9000', boundsAlignH: "center", boundsAlignV: "middle"});
    loadingLabel.setTextBounds(0,0,840,550);

    // load game state once four players are 'ready'
    socket.on('4players', function(players) {
      game.state.start('game');
    });
    var user = JSON.parse(JSON.parse(window.localStorage.getItem('com.spacePirates')));
    // let back-end know that this user is ready to start game
    socket.emit('ready', {id: user.id, username: user.username});
  }
};
