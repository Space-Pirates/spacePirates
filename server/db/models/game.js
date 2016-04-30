var thinky = require('./../thinky');
var type = thinky.type;

var Game = thinky.createModel("Game", {
    id: type.string(),
});

module.exports = Game;
