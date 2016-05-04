angular.module('app.auth', [])
  .controller('AuthController', function($scope, $state, Auth, store, $mdDialog, $mdMedia) {
    $scope.user = {};

    $scope.showDialog = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/main-app/auth/authDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
          .then(function(data) {
            if (data.action === 'signin') {
              // console.log(data.user);
              signin(data.user);
            } else if (data.action === 'signup') {
              // console.log(data.user);
              signup(data.user);
            }
          });
    };

    var signin = function (user) {
      Auth.signin(user)
        .then(function (data) {
          store.set('com.spacePirates', JSON.stringify(data));
          $state.go('menu.lobby');
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    var signup = function (user) {
      Auth.signup(user)
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
        data: user,
        contentType: 'application/json'
      })
      .then(function (res) {
        return res.data;
      });
    };

    var signup = function (user) {
      return $http({
        method: 'POST',
        url: '/signup',
        data: user,
        contentType: 'application/json'
      })
      .then(function (res) {
        return res.data;
      });
    };

    var isAuth = function () {
      return !!store.get('com.spacePirates');
    };

    var signout = function () {
      console.log('signout');
      store.remove('com.spacePirates');
      $state.transitionTo('login');
    };

    return {
      signin: signin,
      signup: signup,
      isAuth: isAuth,
      signout: signout
    };
  });

function DialogController($scope, $mdDialog) {
  $scope.data = {};
  $scope.data.user = {};
  $scope.data.action = '';
  $scope.cpass = '';
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.submit = function() {
    $mdDialog.hide($scope.data);
  };
}
