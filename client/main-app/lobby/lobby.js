angular.module('app.lobby', ['app.lobbyFact'])
  .controller('LobbyController', ['$scope', 'LobbyFactory', '$state', 'store', function($scope, LobbyFactory, $state, store){


    var user = JSON.parse(store.get('com.spacePirates'));

    $scope.userId = user.id;
    $scope.games = [];

    // lobbySocket setup for listening for game adds
    window.lobbySocket = io.connect({query: 'game_id=LobbySocket&user='+user.username});
    window.lobbySocket.on('update', function(change){
      $scope.games.push(change);
      $scope.$apply();
    });

    $scope.getGames = function(){
      LobbyFactory.getGames()
        .then(function(games){
          $scope.games = games;
        });
    };

    $scope.createGame = function () {
      //call to backEnd to create new gameState
      LobbyFactory.createGame(user)
        .then(function(data){
          $scope.joinGame(data);
        });
    };

    $scope.joinGame = function (data){
      window.lobbySocket.disconnect();
      $state.go('game.play', data);
    };

    $scope.getGames();
  }]);
