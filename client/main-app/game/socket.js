function startSocketListeners($scope) {
  socket.on('startGame', function(data) {
    window.gameData.board.matrix = data.matrix;
    window.gameData.deck.tilesRemaining = data.tilesRemaining;
    window.gameData.players = data.players;
    window.gameData.turnOrder = data.turnOrder;
    reorderVids();

    $scope.$watch(function() {return gameData.deck.routesRemaining},
    function(val) {
      $scope.routesRemaining = 'Routes Remaining: ' + val;
    });
    $scope.$digest();
  });

  socket.on('hand', function(data) {
    window.gameData.player.role = data.role;
    window.gameData.player.hand = data.hand;
    window.gameData.player.isTurn = data.isTurn;
    // display discard
    createStaticTile({x: 0,
          y: 10,
          tile: {
            tileId: 'discard-1'
          }
        });
    // display remaining routes bar
    createStaticTile({x: 0,
          y: 0,
          tile: {
            tileId: 'remaining-routes-bar-1'
          }
        });
    // display role
    var role = game.add.image(770, 500, data.role);
    role.height = 50;
    role.width = 70;
    // display true planet if pirate
    if (window.gameData.player.role === 'pirate') {
      for (var i = 2; i < 7; i += 2) {
        createStaticTile({x: 9,
          y: i + 1,
          tile: {
            tileId: gameData.board.matrix[i][9].truePlanet ? 'planet-true-1' : 'planet-false-1'
          }
        });
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
    $scope.$parent.gameFeed.unshift({user: 'Game ', message: 'Over'});
    $scope.$parent.$digest();
    window.gameData.player.isTurn = false;
    if (data.tilesRemaining) {
      $scope.$parent.gameFeed.unshift({user: 'Settlers ', message: 'Won'});
      window.sounds['settlers'].play();
      window.gameData.winners = 'settlers';
    } else {
      $scope.$parent.gameFeed.unshift({user: 'Pirates ', message: 'Won'});
      window.sounds['pirates'].play();
      window.gameData.winners = 'pirates';
    }
    setTimeout(function() {
      $scope.showGameOver();
    }, 3000);
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

function reorderVids(){
  var user = JSON.parse(JSON.parse(window.localStorage.getItem('com.spacePirates'))).id;
  var curPlayerIdx = window.gameData.turnOrder.indexOf(user); // -1
  var idx = curPlayerIdx + 1;
  //remove videos
  var $player2 = $('#player2 video').clone();
  var $player3 = $('#player3 video').clone();
  var $player4 = $('#player4 video').clone();

  var videos = {};
  videos[$player2.attr('data-number')] = $player2;
  videos[$player3.attr('data-number')] = $player3;
  videos[$player4.attr('data-number')] = $player4;

  if (curPlayerIdx < 0) {
    return;
  }

  //loop through and append in order
  var loc = 2
  while(idx !== curPlayerIdx){
    console.log(idx, curPlayerIdx)
    if(idx < 4){
      var username = window.gameData.players[window.gameData.turnOrder[idx]].username;
      var $vid = videos[username];
      $('#player'+ loc + ' video').remove();
      console.log('#player'+ loc);
      $('#player'+ loc).append($vid);
      idx++;
      loc++;
    }else{
      idx = 0;
    }
  }
}
