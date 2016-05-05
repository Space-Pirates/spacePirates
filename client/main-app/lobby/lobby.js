angular.module('app.lobby', ['app.lobbyFact'])
  .controller('LobbyController', ['$scope', 'LobbyFactory', '$state', 'store', function($scope, LobbyFactory, $state, store){
    //Mock room data
    $scope.games = [{id: '555342342', players: ['Rob','Jak']}];
    var user = JSON.parse(store.get('com.spacePirates'));
    $scope.getGames = function(){
      LobbyFactory.getGames()
        .then(function(games){
         // $scope.games = games;
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
      $state.go('game.play', {id: gameId});
    };

    $scope.getGames();
  }]);
