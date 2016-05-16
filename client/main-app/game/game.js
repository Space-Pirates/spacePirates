angular.module('app.game', [])
.controller('GameController', ['$scope', 'store', '$stateParams', function($scope, store, $stateParams) {
  window.gameData = {
    players: {
      p1: {},
      p2: {},
      p3: {},
      p4: {}
    },
    board: {
      matrix: [],
      spriteMatrix: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      lastPlayed: {}
    },
    deck: {
      lastDiscard: {},
      tilesRemaining: 54
    },
    player: {
      role: '',
      hand: [],
      isTurn: false
    }
  };
  var user = JSON.parse(store.get('com.spacePirates'));
  var gameId = $stateParams.gameId;

  window.socket = io.connect({query: 'gameId=' + gameId + '&user='+user.username});

  socket.on('update', function(data) {
    // data has matrix, lastPlayed, x, y, tilesRemaining
    window.gameData.board.matrix = data.matrix;
    window.gameData.board.lastPlayed = data.lastPlayed;
    window.gameData.deck.tilesRemaining = data.tilesRemaining;
    createStaticTile({x: data.x, y: data.y, tile: data.lastPlayed});
    $scope.$parent.gameFeed.unshift({user: data.player.username, message: ' played a ' + data.lastPlayed.type});
    $scope.$parent.$digest();
  });

  window.socket.on('chat', function(chat){
      window.sounds['feed'].play();
      $scope.$parent.gameFeed.unshift(chat);
      $scope.$parent.$digest();
    });

  socket.on('startTurn', function() {
    window.sounds['turn'].play();
    window.gameData.player.isTurn = true;
    $scope.$parent.gameFeed.unshift({user: 'Your', message: ' Turn'});
    angular.element(document.querySelector('.my-video')).addClass('orange-border');
    $scope.$parent.$digest();
  });

  socket.on('endTurn', function() {
    window.gameData.player.isTurn = false;
    angular.element(document.querySelector('.my-video')).removeClass('orange-border');
  });

  startSocketListeners(); // Located in ./socket.js

  window.phone = PHONE({
    number: user.username,
    publish_key: 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c',
    subscribe_key: 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe',
    media: {
      audio: true,
      video:
      {
        height:200,
        width:280
      }
    },
    ssl: true
  });

  $scope.sessions = [];
  phone.ready(function(){
    $('#myVid').append(phone.video);
    socket.on('joined', function(user) {
      console.log(user.username);
      $scope.sessions.push(phone.dial(user.username));
    });
  });

  var player = 2;

  phone.receive(function(session){
    session.connected(function(session){
      if(session.number !== phone.number()){
        $('#player' + player).append(session.video);
        player++;
      }
    });
    session.ended(function(session){    player--;  });
  });
}])
.directive('gameCanvas', ['$injector', function($injector) {
  var linkFn = function(scope, ele, injector) {
    createGame(ele, scope, scope.game);
  };
  return {
    restrict: 'E',
    scope: {
      players: '=',
      mapId: '='
    },
    template: '<div id="gameCanvas"></div>',
    link: linkFn
  };
}]);
