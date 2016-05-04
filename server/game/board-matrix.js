var _ = require('underscore');
var Planet = function(isTrue) {
  return {
    truePlanet: isTrue,
    top: 1,
    left: 1,
    bottom: 1,
    right: 1
  }
};
var planets = _.shuffle([Planet(true), Planet(false), Planet(false)]);
var e = {};
var a = planets[0],
    b = planets[1],
    c = planets[2];

module.exports = [
  [e, e, e, e, e, e, e, e, e, e, e, e],
  [e, e, e, e, e, e, e, e, e, e, e, e],
  [e, e, e, e, e, e, e, e, e, e, a, e],
  [e, e, e, e, e, e, e, e, e, e, e, e],
  [e, e, e, e, e, e, e, e, e, e, b, e],
  [e, e, e, e, e, e, e, e, e, e, e, e],
  [e, e, e, e, e, e, e, e, e, e, c, e],
  [e, e, e, e, e, e, e, e, e, e, e, e],
  [e, e, e, e, e, e, e, e, e, e, e, e]
];
