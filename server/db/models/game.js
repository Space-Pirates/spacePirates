var thinky = require('./../main');
var type = thinky.type;

var Game = thinky.createModel("Game", {
    id: type.string(),
});

module.exports = Game;
