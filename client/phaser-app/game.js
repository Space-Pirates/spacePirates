var gameState = {

  preload: function() {

    game.load.image('board', 'phaser-app/assets/new-game-board.png');
    game.load.image('pirate', 'phaser-app/assets/pirate-icon.png');
    game.load.image('settler', 'phaser-app/assets/settler-icon.png');
    game.load.image('planet-true', 'phaser-app/assets/planet-true.png');
    game.load.image('planet-false', 'phaser-app/assets/planet-false.png');
    game.load.image('discard', 'phaser-app/assets/discard-icon.png');
    game.load.image('remaining-routes-bar', 'phaser-app/assets/remaining-routes-bar.png');

    game.load.image('dead-end-horizontal-half', 'phaser-app/assets/dead-end-horizontal-half.png');
    game.load.image('dead-end-horizontal-T', 'phaser-app/assets/dead-end-horizontal-T.png');
    game.load.image('dead-end-horizontal', 'phaser-app/assets/dead-end-horizontal.png');
    game.load.image('dead-end-intersection', 'phaser-app/assets/dead-end-intersection.png');
    game.load.image('dead-end-left-turn', 'phaser-app/assets/dead-end-left-turn.png');
    game.load.image('dead-end-right-turn', 'phaser-app/assets/dead-end-right-turn.png');
    game.load.image('dead-end-vertical-half', 'phaser-app/assets/dead-end-vertical-half.png');
    game.load.image('dead-end-vertical-T', 'phaser-app/assets/dead-end-vertical-T.png');
    game.load.image('dead-end-vertical', 'phaser-app/assets/dead-end-vertical.png');
    game.load.image('route-horizontal-T', 'phaser-app/assets/route-horizontal-T.png');
    game.load.image('route-horizontal', 'phaser-app/assets/route-horizontal.png');
    game.load.image('route-intersection', 'phaser-app/assets/route-intersection.png');
    game.load.image('route-left-turn', 'phaser-app/assets/route-left-turn.png');
    game.load.image('route-right-turn', 'phaser-app/assets/route-right-turn.png');
    game.load.image('route-vertical-T', 'phaser-app/assets/route-vertical-T.png');
    game.load.image('route-vertical', 'phaser-app/assets/route-vertical.png');
    game.load.image('special-block-A', 'phaser-app/assets/special-block-A.png');
    game.load.image('special-block-B', 'phaser-app/assets/special-block-B.png');
    game.load.image('special-block-C', 'phaser-app/assets/special-block-C.png');
    game.load.image('special-destroy', 'phaser-app/assets/special-destroy.png');
    game.load.image('special-reveal', 'phaser-app/assets/special-reveal.png');
    game.load.image('special-unblock-A', 'phaser-app/assets/special-unblock-A.png');
    game.load.image('special-unblock-AB', 'phaser-app/assets/special-unblock-AB.png');
    game.load.image('special-unblock-AC', 'phaser-app/assets/special-unblock-AC.png');
    game.load.image('special-unblock-B', 'phaser-app/assets/special-unblock-B.png');
    game.load.image('special-unblock-BC', 'phaser-app/assets/special-unblock-BC.png');
    game.load.image('special-unblock-C', 'phaser-app/assets/special-unblock-C.png');

    game.load.audio('turn', 'phaser-app/assets/turn_note.ogg');
    game.load.audio('pickup', 'phaser-app/assets/card_pickup.ogg');
    game.load.audio('drop', 'phaser-app/assets/card_drop.ogg');
    game.load.audio('feed', 'phaser-app/assets/feed_note.ogg');
    game.load.audio('settlers', 'phaser-app/assets/end_settlers.ogg');
    game.load.audio('pirates', 'phaser-app/assets/end_pirates.ogg');
  },

  create: function() {
    var style = { font: "14px Pirate Font", fill: "#ffffff", align: "center" };
    var board = game.add.image(0, 0, 'board');
    var userId = JSON.parse(JSON.parse(window.localStorage.getItem('com.spacePirates'))).id;

    // add sounds, make them available
    window.sounds = {
        turn: game.add.audio('turn'),
        pickup: game.add.audio('pickup'),
        drop: game.add.audio('drop'),
        feed: game.add.audio('feed'),
        settlers: game.add.audio('settlers'),
        pirates: game.add.audio('pirates')
    }

    // player has loaded all game assets and is ready to receive first hand
    socket.emit('readyForHand', {userId: userId});
  }
};
