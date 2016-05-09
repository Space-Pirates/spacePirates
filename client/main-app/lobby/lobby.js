angular.module('app.lobby', ['app.lobbyFact'])
  .controller('LobbyController', ['$scope', 'LobbyFactory', '$state', 'store', '$mdDialog', function($scope, LobbyFactory, $state, store, $mdDialog){


    var user = JSON.parse(store.get('com.spacePirates'));
    $scope.userId = user.id;
    $scope.games = [];

    // lobbySocket setup for listening for game adds
    window.lobbySocket = io.connect({query: 'game_id=LobbySocket&user='+user.username});
    window.lobbySocket.on('update', function(change){
      $scope.games.push(change);
      $scope.$apply();
    });

    var getGames = function(){
      LobbyFactory.getGames()
        .then(function(games){
          $scope.games = games;
        });
    };

    var createGame = function (title) {
      //call to backEnd to create new gameState
      LobbyFactory.createGame(title)
        .then(function(gameId){
          $scope.joinGame(gameId);
        });
    };

    $scope.joinGame = function (gameId){
      window.lobbySocket.disconnect();
      $state.go('game.play', {gameId: gameId});
    };

    $scope.showDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/main-app/lobby/lobbyDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(data) {
          console.log(data.game);
          createGame(data.game.title);
      });
    };

    getGames();
  }]);

function DialogController($scope, $mdDialog) {
  $scope.data = {};
  $scope.data.game = {};
  $scope.data.action = '';
  $scope.cpass = '';
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.submit = function() {
    $mdDialog.hide($scope.data);
  };
}