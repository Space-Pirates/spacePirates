angular.module('app.menu', [])
  .controller('MenuController', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
    //Mock room data
    $scope.rooms = [{id:1, players:['Rob','Jak','Mike','Nassir']},{id:2, players:['Rob','Jak','Mike','Nassir']},{id:3, players:['Rob','Jak']},{id:4, players:['Mike','Nassir']},{id:5, players:['Nassir']},]
    $scope.createGame = function () {
      //call to backEnd to create new gameState
    };
  }]);
