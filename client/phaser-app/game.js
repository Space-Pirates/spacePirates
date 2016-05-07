var gameState = {

  preload: function() {
    game.load.image('nebula', 'phaser-app/assets/nebula.png');
    game.load.image('ship', 'phaser-app/assets/spaceship.png');
    game.load.image('orange', 'phaser-app/assets/orange.png');
    game.load.image('planet', 'phaser-app/assets/planet.png');
    game.load.image('start', 'phaser-app/assets/start.png');
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

    var planet2 = game.add.sprite(650 ,250, 'planet');
    planet2.height = 50;
    planet2.width = 70;

    var planet3 = game.add.sprite(650 ,350, 'planet');
    planet3.height = 50;
    planet3.width = 70;

    var start = game.add.image(50, 250, 'start');
    start.height = 50;
    start.width = 70;

    game.add.text(50, 20, 'Drop Break Card', style);
    game.add.text(330, 20, 'Drop Break Card', style);
    game.add.text(610, 20, 'Drop Break Card', style);
    game.add.text(10, 518, 'Discard', style);
    game.add.text(280, 518, 'Player Hand', style);
    
    createTile(4, 10, 'ship');
  }
};
