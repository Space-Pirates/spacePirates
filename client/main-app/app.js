angular.module('spacePirates', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'app.auth',
    'app.menu',
    'app.lobby',
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
      .state('menu', { 
        url: '/menu',
        templateUrl: '/main-app/menu/menu.html', 
        controller: 'MenuController', 
        data: { requiresLogin: true } 
      })
      .state('menu.lobby', {
        url: '/lobby',
        templateUrl: 'main-app/lobby/lobby.html',
        controller: 'LobbyController',
      })
      .state('menu.instructions', {
        url: '/instructions',
        template: '<md-toolbar class="md-theme-indigo">\
                    <h1 class="md-toolbar-tools">How To Play</h1>\
                  </md-toolbar>\
                  <md-card>\
                    <md-card-title>Follow all the Rules!!!</md-card-title>\
                  </md-card>',
      })
      .state('logout', {
        url: '/login'
      })
      .state('game', {
      url: '/game',
      abstract: true,
      templateUrl: 'main-app/game/game.html'
    })
    .state('game.play', {
      url: '/:id',
      template: '<game-canvas></game-canvas>',
      controller: 'GameController'
    });;
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
      $location.path('/menu/lobby');
    });

    authProvider.on('loginFailure', function() {
      // Error Callback
    });
  })
  .run(function(auth) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();
  });


