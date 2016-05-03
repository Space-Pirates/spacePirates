var deckSpecs = require('./deck-spec');
var boardSpecs = require('./board-spec');
var playerSpecs = require('./player-spec');

describe('Backend Game Logic', function () {
  describe('Deck Class', deckSpecs);
  describe('Board Class', boardSpecs);
  describe('Player Class', playerSpecs);
});
