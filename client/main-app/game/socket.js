function startSocketListeners() {
  socket.on('startGame', function(data) {
    window.gameData.board.matrix = data.matrix;
    window.gameData.deck.tilesRemaining = data.tilesRemaining;

    //TODO: show current turn
  });

  socket.on('hand', function(data) {
    window.gameData.player.role = data.role;
    window.gameData.player.hand = data.hand;
    window.gameData.player.isTurn = data.isTurn;

    // populate players hand sprites
    createTile({x: 3, y: 10, tile: window.gameData.player.hand[0]});
    createTile({x: 4, y: 10, tile: window.gameData.player.hand[1]});
    createTile({x: 5, y: 10, tile: window.gameData.player.hand[2]});
  });

  socket.on('update', function(data) {
    // data has matrix, lastPlayed, x, y, tilesRemaining
    window.gameData.board.matrix = data.matrix;
    window.gameData.board.lastPlayed = data.lastPlayed;
    window.gameData.deck.tilesRemaining = data.tilesRemaining;
  });

  socket.on('deal', function(data) {
    window.player.hand = data.hand;
    window.board.lastPlayed = data.lastPlayed;
    createTile({x: data.x, y: data.y, tile: data.hand[2]});
  });

  socket.on('startTurn', function(data) {
    // change game status to playing making hand draggable
  });

  socket.on('endTurn', function(data) {
    // change game status to not playing and disable hand draggable
  });

  socket.on('gameOver', function(gameData){
    //change game state to outcomes
  });
}

function emitMove(xStart, yStart, xEnd, yEnd, tile) {
  window.socket.emit('move', {
    userId: JSON.parse(JSON.parse(window.localStorage.getItem('com.spacePirates'))).id,
    xStart: xStart,
    yStart: yStart,
    xEnd: xEnd,
    yEnd: yEnd,
    tile: tile
  });
}
