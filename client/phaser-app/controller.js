var xInit, yInit;

function createStaticTile(data){
  var tile = game.add.image(data.x*70, data.y*50, data.tile.tileId);
  tile.height = 45;
  tile.width = 65;
  tile.tileData = data.tile;
}

function createTile(data){
  var tile = game.add.sprite(data.x*70, data.y*50, data.tile.tileId);
  tile.height = 50;
  tile.width = 70;
  tile.tileData = data.tile;

  tile.inputEnabled = true;
  tile.input.enableDrag();
  tile.input.enableSnap(70, 50, false, true);
  tile.input.boundsRect = new Phaser.Rectangle(0, 0, 840, 550);
 
  tile.events.onInputOver.add(onOver, this);
  tile.events.onInputOut.add(onOut, this);
  tile.events.onDragStart.add(onDragStart, this);
  tile.events.onDragStop.add(onDragStop, this);
}

function onOver(sprite, pointer) {
   sprite.tint = 0xff7777;
}

function onOut(sprite, pointer) {
  sprite.tint = 0xffffff;
}

function  onDragStart(sprite, pointer) {
  dragPosition.set(sprite.x, sprite.y);
  xInit = dragPosition.x/70;
  yInit = dragPosition.y/50;
}

function  onDragStop(sprite, pointer) {
    var x = sprite.position.x/70;
    var y = sprite.position.y/50;
    sprite.input.draggable = false;
    console.log(x,y);
    console.log(xInit, yInit);
    //TODO: Write validation called checkPosition(sprite); ...will contain animation back to dragposition
    emitMove(xInit, yInit,x, y, sprite.tileData);
}
