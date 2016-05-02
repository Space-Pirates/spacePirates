angular.module('spacePirates', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'app.auth',
    'app.menu',
    'app.game',
    'auth0',
    'angular-storage',
    'angular-jwt'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login', 
        templateUrl: '/main-app/auth/auth.html', 
        controller: 'AuthController' 
      })
      .state('root', { 
        url: '/', 
        templateUrl: '/main-app/menu/menu.html', 
        controller: 'MenuController', 
        data: { requiresLogin: true } 
      });
  })

  .config(function(authProvider) {
    authProvider.init({
      domain: 'nassir.auth0.com',
      clientID: '8dmgNdTCUMwrlYjndTIXU3dhg5ei3vuq'
    });

    authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
      console.log('Login Success');
      profilePromise.then(function(profile) {
        store.set('profile', profile);
        store.set('token', idToken);
      });
      $location.path('/');
    });

    authProvider.on('loginFailure', function() {
      // Error Callback
    });
  })
  .run(function(auth) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();
  });


