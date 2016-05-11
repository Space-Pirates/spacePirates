angular.module('app.gameChat', [])
.controller('GameChatController', ['$scope', 'store', function($scope, store) {
  $scope.gameFeed = [];
  var user = JSON.parse(store.get('com.spacePirates'));

  $scope.chatSubmit = function(val){
    var chat = {user:user.username, message: val};
    $scope.gameFeed.unshift(chat);
    window.socket.emit('chat', chat);
    $scope.gameChat = '';
  };
}]);