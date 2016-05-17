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
  };

  $scope.pause =  function() {
    $scope.videoStatus = window.ctrl.toggleVideo();
    console.log($scope.videoStatus);
  };

  $rootScope.$on("$stateChangeStart", function (){
    console.log(window.phone.number());
    window.ctrl.hangup();
  });
}])
.directive('showonhoverparent',function() {
  return {
    restrict: 'A',
    link : function(scope, element, attrs) {
    console.log(element);
      element.parent().bind('mouseenter', function() {
        console.log(element);
        element.css('display', 'inline');
          // element.show();
      });
      element.parent().bind('mouseleave', function() {
        element.css('display', 'none')
      });
    }
  };
});
