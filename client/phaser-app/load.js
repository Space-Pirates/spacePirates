var loadState = {
  preload: function() {
    // waiting for players sprite
    game.load.image('nebula', 'phaser-app/assets/Nebula.png');

  },
  create: function(){
    var background = game.add.sprite(0,0,'nebula');
    background.height = 550;
    background.width = 840;

    var loadingLabel = game.add.text(0, 0, 'Waiting for players...', {font:'30px Arial', fill:'#ffffff', boundsAlignH: "center", boundsAlignV: "middle"});
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
