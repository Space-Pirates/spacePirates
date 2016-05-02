var loadState = {
  //window.socket = io.connect();
  //waiting for players sprite
  preload: function(){
    game.load.image('nebula', 'phaser-app/assets/Nebula.png');
    
  },
  create: function(){
    // game.add.sprite(840, 550, 'nebula');
    var loadingLabel = game.add.text(420,275, 'Waiting for players...', {font:'30px Arial', fill:'#ffffff'});
    // socket.on('4players', function(){
    //   game.state.start('game');    
    // });
  }
};