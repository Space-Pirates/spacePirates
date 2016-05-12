window.createGame = function(ele, scope, players, mapId, injector) {
  window.game = new Phaser.Game(840, 550, Phaser.AUTO, 'gameCanvas', null, true);
  window.dragPosition = new Phaser.Point(0,0);
  game.state.add('load', loadState);
  game.state.add('game', gameState);
  game.state.start('load');
};
