angular.module('spacePirates', [
    'ngAria',
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'pubnub.angular.service',
    'app.auth',
    'app.menu',
    'app.lobby',
    'app.game',
    'app.gameChat',
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
        data: { requiresLogin: true },
        authenticate: true
      })
      .state('menu.lobby', {
        url: '/lobby',
        templateUrl: 'main-app/lobby/lobby.html',
        controller: 'LobbyController',
        authenticate: true
      })
      .state('menu.instructions', {
        url: '/instructions',
        template: '<md-toolbar>\
                    <h1 class="md-toolbar-tools">How To Play</h1>\
                  </md-toolbar>\
                  <md-card>\
                    <md-card-title>Follow all the Rules!!!</md-card-title>\
                  </md-card>',
        authenticate: true
      })
      .state('logout', {
        url: '/login'
      })
      .state('game', {
      url: '/game',
      abstract:true,
      controller: 'GameChatController',
      templateUrl: 'main-app/game/game.html',
      authenticate: true
    })
    .state('game.play', {
      url: '/:gameId',
      controller: 'GameController',
      template: '<div class="game-canvas"><game-canvas></game-canvas></div>',
      authenticate: true
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
       $state.transitionTo("login");
       event.preventDefault();
     }
   });
  });
