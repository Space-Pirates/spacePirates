var thinky = require('./../thinky');

var type = thinky.type;

var Deck = thinky.createModel('Deck', {
  id: type.string(),
  gameId: type.string()
});

module.exports = Deck;
