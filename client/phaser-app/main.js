window.createGame = function(ele, scope, players, mapId, injector) {
  var game = new Phaser.Game(1000, 900, Phaser.AUTO, 'gameCanvas', {preload:preload, create: create});

  function preload() {

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('eye', 'pics/lance-overdose-loader_eye.png');
    game.load.image('zone', 'sprites/platform.png');

  }

  var dragPosition, dragPosition2;
  var dropZone;
  var tile1, tile2;


  function create() {
    dropZone = game.add.sprite(0, 0, 'zone');
    dropZone.height = 450;
    dropZone.width = 840;
    dropZone.tint = 0xff7777;

    tile1 = game.add.sprite(900, 45, 'zone');
    tile1.height = 45;
    tile1.width = 65;
    tile1.tint = 0xffffff;
    
    tile1.inputEnabled = true;
    tile1.input.enableDrag();
    tile1.input.enableSnap(70, 50, false, true);

    tile1.events.onInputOver.add(onOver, this);
    tile1.events.onInputOut.add(onOut, this);
    tile1.events.onDragStart.add(onDragStart, this);
    tile1.events.onDragStop.add(onDragStop, this);

    tile2 = game.add.sprite(900, 95, 'zone');
    tile2.height = 45;
    tile2.width = 65;
    tile2.tint = 0xffffff;
    
    tile2.inputEnabled = true;
    tile2.input.enableDrag();
    tile2.input.enableSnap(70, 50, false, true);

    tile2.events.onInputOver.add(onOver, this);
    tile2.events.onInputOut.add(onOut, this);
    tile2.events.onDragStart.add(onDragStart, this);
    tile2.events.onDragStop.add(onDragStop, this);

    dragPosition = new Phaser.Point(tile1.x, tile1.y);
    dragPosition2 = new Phaser.Point(tile2.x, tile2.y);

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

    if (!sprite.overlap(dropZone)){
      game.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
    }

  }

};

