var gameSpecs = require('./game-spec');
var deckSpecs = require('./deck-spec');
var boardSpecs = require('./board-spec');
var playerSpecs = require('./player-spec');

describe('Backend Game Logic', function () {
  describe('Game Class', gameSpecs);
  xdescribe('Deck Class', deckSpecs);
  xdescribe('Board Class', boardSpecs);
  xdescribe('Player Class', playerSpecs);
});
