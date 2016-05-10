angular.module('app.menu', [])
  .controller('MenuController', ['$scope', '$mdSidenav', 'Auth', function($scope, $mdSidenav, Auth){
    $scope.signout = function () {
      Auth.signout();
    };
  }]);
