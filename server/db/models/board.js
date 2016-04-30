var thinky = require('./../thinky');
var type = thinky.type;

var Board = thinky.createModel("Board", {
    id: type.string(),
});

module.exports = Board;
