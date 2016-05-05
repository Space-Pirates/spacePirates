angular.module('app.lobby', [])
  .controller('LobbyController', ['$scope', 'LobbyFactory', '$state', function($scope, LobbyFactory, $state){
    //Mock room data
    $scope.rooms = [];
    
    $scope.getGames = function(){
      LobbyFactory.getGames()
        .then(function(games){
          $scope.rooms = games;
        });
    };

    $scope.createGame = function () {
      //call to backEnd to create new gameState
      LobbyFactory.createGame()
        .then(function(gameId){
          $scope.joinGame(gameId);
        });
    };
    
    $scope.joinGame = function (gameId){
      $state.go('game.play({id: gameId})');
    };

    $scope.getGames();
  }]);