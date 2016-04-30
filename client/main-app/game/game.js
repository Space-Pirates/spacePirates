angular.module('app.game', [])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('game', {
      url: '/game',
      abstract: true,
      template: '<div class="game">\
                  <div ui-view></div>\
                </div>'
    })
    .state('game.play', {
      url: '/:id',
      template: '<game-canvas></game-canvas>',
      controller: 'GameController'
    });
}])
.controller('GameController', ['$scope', function($scope){

}])
.directive('gameCanvas', ['$injector', function($injector) {
      var linkFn = function(scope, ele, injector) {
        createGame(ele, scope, scope.players, scope.mapId, $injector);
      };
      return {
        restrict: 'E',
        scope: {
          players: '=',
          mapId: '='
        },
        template: '<div id="gameCanvas"></div>',
        link: linkFn
      };
}]);
