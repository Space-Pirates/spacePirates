//window.socket = io.connect();

window.createGame = function(ele, scope, players, mapId, injector) {
  var game = new Phaser.Game(840, 550, Phaser.AUTO, 'gameCanvas', {preload:preload, create: create});

  function preload() {
    game.load.image('nebula', 'phaser-app/assets/Nebula.png');
    game.load.image('ship', 'phaser-app/assets/spaceship.png');
    game.load.image('red', 'phaser-app/assets/red.png');
  }

  var dragPosition;
  var player1, player2, player3, player4, dropZone;
  var tile1;
  var x, y;

  function create() {
    dropZone = game.add.sprite(0, 50, 'nebula');
    dropZone.height = 450;
    dropZone.width = 840;

    player1 = game.add.sprite(0, 500, 'red');
    player1.height = 50;
    player1.width = 210;

    player2 = game.add.sprite(0, 0, 'red');
    player2.height = 50;
    player2.width = 210;

    player3 = game.add.sprite(280, 0, 'red');
    player3.height = 50;
    player3.width = 210;

    player4 = game.add.sprite(560, 0, 'red');
    player4.height = 50;
    player4.width = 210;
    
    tile1 = game.add.sprite(0, 500, 'ship');
    tile1.height = 45;
    tile1.width = 65;
    
    tile1.inputEnabled = true;
    tile1.input.enableDrag();
    tile1.input.enableSnap(70, 50, false, true);

    tile1.events.onInputOver.add(onOver, this);
    tile1.events.onInputOut.add(onOut, this);
    tile1.events.onDragStart.add(onDragStart, this);
    tile1.events.onDragStop.add(onDragStop, this);

    dragPosition = new Phaser.Point(tile1.x, tile1.y);

  }

  function onOver(sprite, pointer) {
    sprite.tint = 0xff7777;
  }

  function onOut(sprite, pointer) {
    sprite.tint = 0xffffff;
  }

  function  onDragStart(sprite, pointer) {
    dragPosition.set(sprite.x, sprite.y);
  }

  function  onDragStop(sprite, pointer) {
    if (sprite.overlap(dropZone) || sprite.overlap(player1) || sprite.overlap(player2)|| sprite.overlap(player3)|| sprite.overlap(player4)){
      x = sprite.position.x/70;
      y = sprite.position.y/50;
      console.log(x,y);
      //emit sprite type and coordinates through socket
      //window.socket.emit('drop', {token: window.storage.getItem('com.spacepirates'), x:x, y:y, type: sprite.type });
    }else{
      game.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
    }

  }

};
