angular.module('spacePirates', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'app.auth',
    'app.menu',
    'app.lobby',
    'app.game',
    'angular-storage',
    'angular-jwt'
  ])
  .config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('orange')

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
        template: '<md-toolbar>\
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

  $httpProvider.interceptors.push('AttachTokens');
  })
  .factory('AttachTokens', function (store) {
    var attach = {
      request: function (object) {
        var jwt = store.get('com.spacePirates');
        if (jwt) {
          jwt = JSON.parse(jwt);
          object.headers['x-access-token'] = jwt.token;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function ($rootScope, $state, Auth) {
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams){
     if (toState.authenticate && !Auth.isAuth()) {
       $state.transitionTo("signin");
       event.preventDefault();
     }
   });
  });

