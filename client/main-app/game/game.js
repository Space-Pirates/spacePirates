angular.module('app.game', [])
.controller('GameController', ['$scope', 'store', function($scope, store){
  $scope.players = {};
  var user = JSON.parse(store.get('com.spacePirates'));
  var number;
  if(user.username === "rdbruhn"){
    number = '1234';
  }else{
    number = '4321';
  }
  console.log(user);
  window.phone = PHONE({
        number        : number,
        publish_key   : 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c',
        subscribe_key : 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe',
        media         : { audio : true, video : {height:200, width:280} },
    });

  phone.ready(function(){
      // Obect.observe($scope.players, function(changes){
      //   changes.forEach(function(change){
      //     phone.dial(change.object.username
      //   }
      // });
      if(number==='1234'){
        number = '4321';
      }
      var session = phone.dial(number);
      $('#myVid').append(phone.video);
  });

  phone.receive(function(session){
    session.connected(function(session){
      console.log(phone);
      if(session.number !== phone.number()){
      session.video.height = 200; 
      session.video.width = 280;  
      $('#player2').append(session.video);
    }

    });
    session.ended(function(session){     /* call ended     */ });
  });

}])
.directive('gameCanvas', ['$injector', function($injector) {
      var linkFn = function(scope, ele, injector) {
        createGame(ele, scope, scope.players, scope.mapId, $injector);
      };
      return {
        restrict: 'E',
        scope: {
          players: '=',
          mapId: '='
        },
        template: '<div id="gameCanvas"></div>',
        link: linkFn
      };
}]);
