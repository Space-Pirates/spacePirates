angular.module('app.lobby', ['app.lobbyFact'])
  .controller('LobbyController', ['$scope', 'LobbyFactory', '$state', 'store', function($scope, LobbyFactory, $state, store){
    //Mock room data
    var user = JSON.parse(store.get('com.spacePirates'));
    window.lobbySocket = io.connect({query: 'game_id=LobbySocket&user='+user.username});
    window.lobbySocket.on('update', function(change){
      console.log(change);
      $scope.games.push(change);
      $scope.$apply();
    });

    $scope.getGames = function(){
      LobbyFactory.getGames()
        .then(function(games){
          console.log(games);
          $scope.games = games;
        });
    };

    $scope.createGame = function () {
      //call to backEnd to create new gameState
      LobbyFactory.createGame(user)
        .then(function(gameId){
          $scope.joinGame(gameId);
        });
    };

    $scope.joinGame = function (gameId){
      window.lobbySocket.disconnect();
      $state.go('game.play', {id: gameId});
    };

    $scope.getGames();
  }]);
