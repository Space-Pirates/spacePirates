function startSocketListeners($scope) {
  socket.on('startGame', function(data) {
    window.gameData.board.matrix = data.matrix;
    window.gameData.deck.tilesRemaining = data.tilesRemaining;

    //TODO: show current turn
  });

  socket.on('hand', function(data) {
    window.gameData.player.role = data.role;
    window.gameData.player.hand = data.hand;
    window.gameData.player.isTurn = data.isTurn;
    // display role
    var role = game.add.image(770, 500, data.role);
    role.height = 50;
    role.width = 70;
    // display true planet if pirate
    if (window.gameData.player.role === 'pirate') {
      for (var i = 2; i < 7; i += 2) {
        gameData.board.matrix[i][9].truePlanet ? 'planet-true-1' : 'planet-false-1'
      }
    }
    // populate players hand sprites
    createTile({x: 3, y: 10, tile: window.gameData.player.hand[0]});
    createTile({x: 4, y: 10, tile: window.gameData.player.hand[1]});
    createTile({x: 5, y: 10, tile: window.gameData.player.hand[2]});
  });

  socket.on('deal', function(data) {
    window.gameData.player.hand = data.hand;
    window.gameData.board.lastPlayed = data.lastPlayed;
    createTile({x: data.x, y: data.y, tile: data.hand[2]});
  });

  socket.on('gameOver', function(data){
    $scope.$parent.gameFeed.unshift({user: 'Game', message: 'Over'});
    $scope.$parent.$digest();
    window.gameData.player.isTurn = false;
    if (data.tilesRemaining) {
      $scope.$parent.gameFeed.unshift({user: 'Settlers', message: 'Won'});
      window.sounds['settlers'].play();
      window.gameData.winners = 'settlers';
    } else {
      $scope.$parent.gameFeed.unshift({user: 'Pirates', message: 'Won'});
      window.sounds['pirates'].play();
      window.gameData.winners = 'pirates';
    }
    $scope.showGameOver();
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
