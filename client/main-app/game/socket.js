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
    // display role
    var role = game.add.image(770, 500, data.role);
    role.height = 50;
    role.width = 70;
    // display true planet if pirate
    if (window.gameData.player.role === 'pirate') {
      for (var i = 2; i < 7; i += 2) {
        console.log(window.gameData.board.matrix[i][9]);
        if (window.gameData.board.matrix[i][9].truePlanet) {
          createStaticTile({x: 9, y: i + 1, tile: {tileId: 'planet-true-1'}});
          break;
        }
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
