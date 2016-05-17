var _ = require('underscore');
var Planet = function(isTrue) {
    this.truePlanet = isTrue;
    this.tileId = 'planet-neutral-#';
    this.top = 1;
    this.left = 1;
    this.bottom = 1;
    this.right = 1;
};

module.exports = function() {
  var planets = _.shuffle([new Planet(true), new Planet(false), new Planet(false)]);
  var e = {};
  var a = planets[0],
      b = planets[1],
      c = planets[2];

  var matrix = [
    [e, e, e, e, e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e, e, a, e, e],
    [e, e, e, e, e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e, e, b, e, e],
    [e, e, e, e, e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e, e, c, e, e],
    [e, e, e, e, e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e, e, e, e, e]
  ];

  return matrix;
}
