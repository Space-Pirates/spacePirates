var thinky = require('./../thinky');

var type = thinky.type;

var Deck = thinky.createModel('Deck', {
  id: type.string(),
  gameId: type.string(),
  lastDiscard: type.string(),
  tilesRemaining: type.number(),
  tiles: type.array()
});

module.exports = Deck;
