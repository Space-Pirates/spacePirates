var gameSpecs = require('./game-spec');
var deckSpecs = require('./deck-spec');
var boardSpecs = require('./board-spec');
var playerSpecs = require('./player-spec');
var gameEndSpecs = require('./end-check-spec');

describe('Backend Game Logic', function () {
  describe('Game Class', gameSpecs);
  describe('Deck Class', deckSpecs);
  describe('Board Class', boardSpecs);
  describe('Player Class', playerSpecs);
  describe('isEnded', gameEndSpecs);
});
