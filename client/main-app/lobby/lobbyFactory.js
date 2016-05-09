angular.module('app.lobbyFact',[])
.factory('LobbyFactory', ['$http', function($http){
  var getGames = function(){
    return $http({
      method: 'GET',
      url: '/game'
    }).then(function successCallback(resp){
        return resp.data;
    }, function errorCallback(resp){
        console.log(resp.data);
    });
  };

  var createGame = function(title){
     return $http({
      method: 'POST',
      url: '/game',
      data: {
        title: title
      }
    }).then(function successCallback(resp){
        return resp.data;
    }, function errorCallback(resp){
        console.log(resp.data);
    });
  };

  return{
    getGames: getGames,
    createGame: createGame
  };

}]);
