angular.module('app.gameChat', [])
.controller('GameChatController', ['$scope', 'store', '$rootScope', function($scope, store, $rootScope) {
  $scope.gameFeed = [];
  var user = JSON.parse(store.get('com.spacePirates'));

  $scope.chatSubmit = function(val){
    var chat = {user:user.username + ': ', message: val};
    $scope.gameFeed.unshift(chat);
    window.socket.emit('chat', chat);
    $scope.gameChat = '';
  };
  $scope.audioStatus = true;
  $scope.videoStatus = true;
  $scope.mute = function () {
    $scope.audioStatus = window.ctrl.toggleAudio();
    console.log($scope.audioStatus);
    // if( !audio) $('#mute').html('Unmute');
    // else $('#mute').html('Mute');
  };

  $scope.pause =  function() {
    $scope.videoStatus = window.ctrl.toggleVideo();
    console.log($scope.videoStatus);
    // if(!video) $('#pause').html('Unpause');
    // else $('#puase').html('Pause');
  };

  $rootScope.$on("$stateChangeStart", function (){
    console.log(window.phone.number());
    window.ctrl.hangup();
  });
}]);
