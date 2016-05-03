angular.module('app.auth', [])
  .controller('AuthController', ['$scope', 'auth', function($scope, auth){
    $scope.auth = auth;
  }]);
