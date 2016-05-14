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

function isValidUpdate(row, col, tile) {
  // reject placement if tile already exists
  if (gameData.board.matrix[row][col].tileId) {
    return false;
  }
  // get surrounding tile placement options
  var surroundings = [
    col > 0 && gameData.board.matrix[row][col - 1].right
      ? gameData.board.matrix[row][col - 1].right : 0,
    col < 11 && gameData.board.matrix[row][col + 1].left
      ? gameData.board.matrix[row][col + 1].left : 0,
    row > 0 && gameData.board.matrix[row - 1][col].bottom
      ? gameData.board.matrix[row - 1][col].bottom : 0,
    row < 8 && gameData.board.matrix[row + 1][col].top
      ? gameData.board.matrix[row + 1][col].top : 0
  ];

  var tileDirections = [tile.left, tile.right, tile.top, tile.bottom];
  // reject tiles placed in empty space
  if (!surroundings.reduce(function(a, b) {return a + b})) {
    return false;
  }
  // check each side and return false if not allowed to place
  for (var i = 0; i < 4; i++) {
    var adjacent = surroundings[i];
    var side = tileDirections[i];
    if (adjacent && side !== adjacent) {
      return false;
    }
  }
  // if legal move, allow
  return true;
}

function onDragStart(sprite, pointer) {
  dragPosition.set(sprite.x, sprite.y);
  xInit = dragPosition.x/70;
  yInit = dragPosition.y/50;
}

function onDragStop(sprite, pointer) {
  var x = sprite.position.x/70;
  var y = sprite.position.y/50;

  if (parseMove(x, y, sprite.tileData)) {
    sprite.input.draggable = false;
    console.log(x,y);
    console.log(xInit, yInit);
    emitMove(xInit, yInit, x, y, sprite.tileData);
  } else {
    game.add.tween(sprite).to({x: dragPosition.x, y: dragPosition.y}, 500, 'Back.easeOut', true);
  }
}

parseMove = function(x, y, tile) {
  if (!gameData.player.isTurn) {
    return false;
  }
  if (x === 0 && y === 10) { // DISCARD
    return true;
  } else if (y === 0) {
    if (x >= 0 && x <= 2) { // BLOCK 1
      return 'block1';
    } else if (x >= 4 && x <= 6) { // BLOCK 2
      return 'block2';
    } else if (x >= 8 && x <= 10) { // BLOCK 3
      return 'block3';
    }
  } else if (x >= 8 && x <= 10 && y === 10) { // UNBLOCK
    return 'unblock';
  } else if (x >= 0 && x <= 11 && y >= 1 && y <= 9) {
    if (x === 9 && y === 3) { // REVEAL 1
      return 'reveal1';
    } else if (x === 9 && y === 5) { // REVEAL 2
      return 'reveal2';
    } else if (x === 9 && y === 7) { // REAVEAL 3
      return 'reveal3';
    } else { // UPDATE
      return isValidUpdate(y - 1, x, tile);
    }
  }
}
