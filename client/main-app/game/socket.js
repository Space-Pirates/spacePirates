function startSocketListeners() {
  socket.on('startGame', function(data) {
    $scope.game.board.matrix = data.matrix;
    $scope.game.deck.tilesRemaining = data.tilesRemaining;
    $scope.game.player.role = data.role;
    $scope.game.player.hand = data.hand;

    // populate players hand sprites
    createTile({x: 3, y: 10, tile: $scope.game.player.hand[0]});
    createTile({x: 4, y: 10, tile: $scope.game.player.hand[1]});
    createTile({x: 5, y: 10, tile: $scope.game.player.hand[2]});

    //TODO: show current turn
  });

  socket.on('update', function(game) {
    $scope.game.board.matrix = game.board.matrix;
    $scope.game.board.lastPlayed = game.board.lastPlayed;
    $scope.deck.tilesRemaining = game.deck.tilesRemaining;
  });

  socket.on('deal', function(data) {
    $scope.player.hand = data.hand;
    $scope.board.lastPlayed = data.lastPlayed;
    createTile({x: data.x, y: data.y, tile: data.hand[2]})
  });

  socket.on('startTurn', function(turn) {
    // change game status to playing making hand draggable
  });

  socket.on('gameOver', function(gameData){
    //change game state to outcomes
  });
}

function emitMove(x, y, tile) {
  window.socket.emit('move', {
    token: window.storage.getItem('com.spacepirates'),
    x:x,
    y:y,
    tile: tile
  });
}
