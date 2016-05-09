var gameState = {

  preload: function() {
    game.load.image('nebula', 'phaser-app/assets/nebula.png');
    game.load.image('orange', 'phaser-app/assets/orange.png');
    game.load.image('planet', 'phaser-app/assets/planet.png');
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
    game.load.image('start', 'phaser-app/assets/route-intersection.png');
  },

  create: function() {
    //Create all playable spots
    var style = { font: "14px Arial", fill: "#ffffff", align: "center" };

    var dropZone = game.add.image(0, 50, 'nebula');
    dropZone.height = 450;
    dropZone.width = 840;

    var player1 = game.add.image(560, 500, 'orange');
    player1.height = 50;
    player1.width = 210;

    var player2 = game.add.image(0, 0, 'orange');
    player2.height = 50;
    player2.width = 210;

    var player3 = game.add.image(280, 0, 'orange');
    player3.height = 50;
    player3.width = 210;

    var player4 = game.add.image(560, 0, 'orange');
    player4.height = 50;
    player4.width = 210;

    var discard = game.add.image(0,500, 'orange');
    discard.height = 50;
    discard.width = 70;

    var hand = game.add.image(210 ,500, 'orange');
    hand.height = 50;
    hand.width = 210;

    var planet1 = game.add.sprite(650 ,150, 'planet');
    planet1.height = 50;
    planet1.width = 70;
    planet1.inputEnabled = true;
    planet1.events.onInputOver.add(onOver, this);
    planet1.events.onInputOut.add(onOut, this);

    var planet2 = game.add.sprite(650 ,250, 'planet');
    planet2.height = 50;
    planet2.width = 70;
    planet2.inputEnabled = true;
    planet2.events.onInputOver.add(onOver, this);
    planet2.events.onInputOut.add(onOut, this);

    var planet3 = game.add.sprite(650 ,350, 'planet');
    planet3.height = 50;
    planet3.width = 70;
    planet3.inputEnabled = true;
    planet3.events.onInputOver.add(onOver, this);
    planet3.events.onInputOut.add(onOut, this);

    var start = game.add.image(70, 250, 'start');
    start.height = 50;
    start.width = 70;

    game.add.text(50, 20, 'Drop Break Card', style);
    game.add.text(330, 20, 'Drop Break Card', style);
    game.add.text(610, 20, 'Drop Break Card', style);
    game.add.text(10, 518, 'Discard', style);
    game.add.text(280, 518, 'Player Hand', style);

    createTile({x:4,y:10,tile:{tileId:'start-T'}});
    var userId = JSON.parse(JSON.parse(window.localStorage.getItem('com.spacePirates'))).id;
    socket.emit('readyForHand', {userId: userId});
  }
};
