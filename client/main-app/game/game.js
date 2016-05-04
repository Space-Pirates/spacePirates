angular.module('app.game', [])
.controller('GameController', ['$scope', 'Pubnub',  function($scope, Pubnub){
  Pubnub.init({
    publish_key: 'pub-c-fcdb7326-54d1-4514-9471-95b2d2a880ed',
    subscribe_key: 'sub-c-d24b6fd2-119c-11e6-875d-0619f8945a4f'
  });
  $scope.streams = {};
  $scope.gameId = 'Game';
  $scope.myUuid = 'me';

  Pubnub.subscribe({
    channel: $scope.gameId,
    callback: function (message) {
      // Do nothing in our callback
    },
    presence: function (data) {
      if (data.action === 'join' && data.uuid != myUuid) {
        var parts = data.uuid.split('-');
        var newUser = newUserTemplate({
          name: parts[1],
          id: parts[0]
        });
        userList.append(newUser);
      } else if (data.action === 'leave' && data.uuid != myUuid) {
        var parts = data.uuid.split('-');
        var item = userList.find('li[data-user=\'' + parts[0] + '\']');
        item.remove();
      }
    }
  });

  function gotStream(stream) {
    video = document.querySelector('#myVid');
    video.src = URL.createObjectURL(stream);
    video.onloadedmetadata = function(e) {
      video.play();
    };
    myStream = stream; // Save the stream for later use
  };

  navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia;

  navigator.getUserMedia({ audio: true, video: true }, gotStream, function(err) {
         console.log("The following error occurred: " + err.name);
      });

  function publishStream(uuid) {
    Pubnub.publish({
      user: uuid,
      stream: myStream
    });

    Pubnub.subscribe({
      user: uuid,
      stream: function (data, event) {
        document.querySelector('#call-video').src = window.URL.createObjectUrl(event.stream);
      },
      disconnect: function (uuid, pc) {
        document.querySelector('#call-video').src = '';
      $(document).trigger('call:end');
      }
    });
  }

  // Pubnub.onNewConnection(function (uuid) {
  //   if (myStream != null) {
  //     publishStream(uuid);
  //   }
  // });

  Pubnub.subscribe({
    channel: $scope.gameId,
    callback: function (data) {
      if (data.caller == myUuid) {
        publishStream(data.callee);
      }
    }
  });

  //var video_out = document.getElementById("vid-box");
  //var vid_thumb = document.getElementById("my-vid");

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
