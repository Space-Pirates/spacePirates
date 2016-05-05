angular.module('app.lobby', [])
  .controller('LobbyController', ['$scope', 'LobbyFactory', '$state', 'store', function($scope, LobbyFactory, $state, store){
    //Mock room data
    $scope.rooms = [];
    var user = JSON.parse(store.get('com.spacePirates'));
    $scope.getGames = function(){
      LobbyFactory.getGames()
        .then(function(games){
          $scope.rooms = games;
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
      $state.go('game.play({id:' + gameId +'})');
    };

    $scope.getGames();
  }]);
