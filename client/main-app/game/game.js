angular.module('app.game', [])
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
