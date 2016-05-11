angular.module('app.menu', [])
  .controller('MenuController', ['$scope', '$mdSidenav', 'Auth', 'store', function($scope, $mdSidenav, Auth, store){
    var user = JSON.parse(store.get('com.spacePirates'));
    $scope.feed = [];
    
    $scope.signout = function () {
      Auth.signout();
    };
    
    // lobbySocket setup for listening for game adds
    window.lobbySocket = io.connect({query: 'gameId=LobbySocket&user='+user.username});
    
    $scope.submit = function(val){
      var chat = {user:user.username, message: val};
      $scope.feed.unshift(chat);
      window.lobbySocket.emit('chat', chat);
      $scope.chat = '';
    };

    window.lobbySocket.on('chat', function(chat){
      $scope.feed.unshift(chat);
      $scope.$digest();
    });

  }]);
