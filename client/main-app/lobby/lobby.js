angular.module('app.lobby', ['app.lobbyFact'])
  .controller('LobbyController', ['$scope', 'LobbyFactory', '$state', 'store', function($scope, LobbyFactory, $state, store){
    //Mock room data
    $scope.games = [];
    var user = JSON.parse(store.get('com.spacePirates'));
    $scope.getGames = function(){
      LobbyFactory.getGames()
        .then(function(games){
          $scope.games = games;
          window.lobbySocket = io.connect({query: 'game_id=LobbySocket&user='+user.username});
          window.lobbySocket.on('update', function(changes){
            console.log(changes);
          });
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
