angular.module('app.auth', [])
  .controller('AuthController', function($scope, $state, Auth) {
    $scope.user = {};

    $scope.signin = function () {
      Auth.signin($scope.user)
        .then(function (data) {
          store.set('com.spacePirates', JSON.stringify(data));
          $state.go('menu.lobby');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    $scope.signup = function () {
      Auth.signup($scope.user)
        .then(function (data) {
          store.set('com.spacePirates', JSON.stringify(data));
          $state.go('menu.lobby');
        })
        .catch(function (error) {
          console.error(error);
        });
    };
  })
  .factory('Auth', function ($http, $state, store) {
    var signin = function (user) {
      return $http({
        method: 'POST',
        url: '/signin',
        data: user
      })
      .then(function (res) {
        return res.data;
      });
    };

    var signup = function (user) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: user
      })
      .then(function (res) {
        return res.data;
      });
    };

    var isAuth = function () {
      return !!store.get('com.spacePirates');
    };

    var signout = function () {
      store.remove('com.spacePirates');
      state.go('login');
    };

    return {
      signin: signin,
      signup: signup,
      isAuth: isAuth,
      signout: signout
    };
  });
