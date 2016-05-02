window.createGame = function(ele, scope, players, mapId, injector) {
  window.game = new Phaser.Game(840, 550, Phaser.AUTO, 'gameCanvas');
   window.dragPosition = new Phaser.Point(0,0);
  var player1, player2, player3, player4, dropZone;
  var x, y;
  game.state.add('load', loadState);
  game.state.add('game', gameState);
  game.state.start('load');
};
