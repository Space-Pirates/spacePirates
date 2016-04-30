angular.module('app.menu', [])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider
      .state('menu', {
        url:'',
        templateUrl: '/main-app/menu/menu.html',
        controller: 'MenuController'
      });
  }])
  .controller('MenuController', ['$scope', function($scope){
    $scope.data = {};
  }]);
