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
  };

  $scope.pause =  function() {
    $scope.videoStatus = window.ctrl.toggleVideo();
  };

  $rootScope.$on("$stateChangeStart", function (){
    window.ctrl.hangup();
  });
}])
.directive('showonhover',function() {
  return {
    restrict: 'A',
    link : function(scope, element, attrs) {
      element.parent().bind('mouseenter', function() {
        element.css('display', 'inline');
      });
      element.parent().bind('mouseleave', function() {
        element.css('display', 'none');
      });
    }
  };
});
