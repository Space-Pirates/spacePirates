function createStaticTile(x, y, name){
  var tile = game.add.image(x*70, y*50, name);
  tile.height = 45;
  tile.width = 65;
}

function createTile(x, y, name){
  var tile = game.add.sprite(x*70, y*50, name);
  tile.height = 45;
  tile.width = 65;
  
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
}

function  onDragStop(sprite, pointer) {
    x = sprite.position.x/70;
    y = sprite.position.y/50;
    sprite.input.draggable = false;
    console.log(x,y);
    //checkPosition(sprite); ...will contain animation back to dragposition
    //emit sprite type and coordinates through socket
    // emitMove(x, y, sprite.name);
}