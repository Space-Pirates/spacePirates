var thinky = require('./../thinky');
var Game = require('./game');

var type = thinky.type;

var Deck = thinky.createModel('Deck', {
  id: type.string(),
});

Deck.belongsTo(Game, 'game', 'deckId', 'id');

module.exports = Deck;
