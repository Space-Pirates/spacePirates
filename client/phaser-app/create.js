var board;
var dragPosition;
var dropZone;
var boardTile;

// var tiles = [
//     {
//         name: 'intersection',
//         top: true,
//         right: true,
//         bottom: true,
//         left: true,
//         quantity: 5,
//         src: '/assets/intersection.png'
//     },
//     {
//         name: 'down',
//         top: true,
//         right: true,
//         bottom: true,
//         left: true,
//         quantity: 4,
//         src: '/assets/down.png'
//     },
//     {
//         name: 'T',
//         top: true,
//         right: false,
//         bottom: true,
//         left: true,
//         quantity: 5,
//         src: '/assets/T.png',
//         flip: function(){
//             this.top = !this.top;
//             this.right = !this.right;
//             this.bottom = !this.bottom;
//             this.left = !this.left;
//         }
//     }
// ];

function create() {
    dropZone = game.add.sprite(0, 0, 'zone');
    dropZone.height = 450;
    dropZone.width = 840;
    dropZone.tint = 0xff7777;
    
var start = 1;
var p1 = 1;
var p2 = 1;
var p3 = 1;

var board = [
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, p1, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, start, 0, 0, 0, 0, 0, 0, 0, p2, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, p3, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
    
    board.forEach(function(row, y){
        row.forEach(function(tile, x){
            boardTile = game.add.sprite(x*70, y*50, 'zone');
            boardTile.height = 45;
            boardTile.width = 65;
        });
    })
    
    card = game.add.sprite(900, 45, 'zone');
    card.height = 45;
    card.width = 65;
    card.tint = 0xffffff;
    
    card.inputEnabled = true;
    card.input.enableDrag();
    card.input.enableSnap(70, 50, false, true);

    card.events.onInputOver.add(onOver, this);
    card.events.onInputOut.add(onOut, this);
    card.events.onDragStart.add(onDragStart, this);
    card.events.onDragStop.add(onDragStop, this);

    dragPosition = new Phaser.Point(card.x, card.y);

}
