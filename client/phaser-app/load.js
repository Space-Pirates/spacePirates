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

    socket.on('4players', function(players) {
      game.state.start('game');
    });

    socket.emit('ready', {playerId: window.playerId});
  }
};
