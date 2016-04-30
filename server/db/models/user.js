var thinky = require('./../main');
var type = thinky.type;

var User = thinky.createModel("User", {
    id: type.string(),
    name: type.string(),
    age: type.number(),
    username: type.string(),
    password: type.string()
});

module.exports = User;
