var xInit, yInit;
var boundsRect = new Phaser.Rectangle(0, 0, 840, 550);

function createStaticTile(data){
  var name = data.tile.tileId.substring(0, data.tile.tileId.length-2);
  var tile = game.add.image(data.x*70, data.y*50, name);
  tile.height = 50;
  tile.width = 70;
  tile.tileData = data.tile;
}

function createTile(data){
  var name = data.tile.tileId.substring(0, data.tile.tileId.length-2);
  var tile = game.add.sprite(data.x*70, data.y*50, name);
  tile.height = 50;
  tile.width = 70;
  tile.tileData = data.tile;

  tile.inputEnabled = true;
  tile.input.enableDrag();
  tile.input.enableSnap(70, 50, false, true);
  tile.input.boundsRect = boundsRect;

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

function isValidMove(row, col, tile) {
  if (gameData.board.matrix[row][col].tileId) {
    console.log(0)
    return false;
  }

  var leftTile = col > 0 && gameData.board.matrix[row][col - 1].right
    ? gameData.board.matrix[row][col - 1].right : 0;
  var rightTile = col < 11 && gameData.board.matrix[row][col + 1].left
    ? gameData.board.matrix[row][col + 1].left : 0;
  var topTile = col > 0 && gameData.board.matrix[row - 1][col].bottom
    ? gameData.board.matrix[row - 1][col].bottom : 0;
  var bottomTile = row < 8 && gameData.board.matrix[row + 1][col].top
    ? gameData.board.matrix[row + 1][col].top : 0;

  if (!(leftTile === 0 || tile.left === leftTile)) {
    console.log(1)
    return false;
  }
  if (!(rightTile === 0 || tile.right === rightTile)) {
    console.log(2)
    return false;
  }
  if (!(topTile === 0 || tile.top === topTile)) {
    console.log(3)
    return false;
  }
  if (!(bottomTile === 0 || tile.bottom === bottomTile)) {
    console.log(4)
    return false;
  }
  return gameData.player.isTurn && true;
}

function onDragStart(sprite, pointer) {
  dragPosition.set(sprite.x, sprite.y);
  xInit = dragPosition.x/70;
  yInit = dragPosition.y/50;
}

function onDragStop(sprite, pointer) {
  var x = sprite.position.x/70;
  var y = sprite.position.y/50;

  if (isValidMove(y-1, x, sprite.tileData)) {
    sprite.input.draggable = false;
    console.log(x,y);
    console.log(xInit, yInit);
    //TODO: Write validation called checkPosition(sprite); ...will contain animation back to dragposition
    emitMove(xInit, yInit, x, y, sprite.tileData);
  } else {
    game.add.tween(sprite).to({x: dragPosition.x, y: dragPosition.y}, 500, 'Back.easeOut', true);
  }
}
