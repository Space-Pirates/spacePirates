var board;
var dragPosition;
var dropZone;
var boardTile;
var tile1, tile2;

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
            boardTile.empty = true;
        });
    });
    
    tile1 = game.add.sprite(900, 45, 'zone');
    tile1.height = 45;
    tile1.width = 65;
    tile1.tint = 0xffffff;
    
    tile1.inputEnabled = true;
    tile1.input.enableDrag();
    tile1.input.enableSnap(70, 50, false, true);

    tile1.events.onInputOver.add(onOver, this);
    tile1.events.onInputOut.add(onOut, this);
    tile1.events.onDragStart.add(onDragStart, this);
    tile1.events.onDragStop.add(onDragStop, this);

    tile2 = game.add.sprite(900, 95, 'zone');
    tile2.height = 45;
    tile2.width = 65;
    tile2.tint = 0xffffff;
    
    tile2.inputEnabled = true;
    tile2.input.enableDrag();
    tile2.input.enableSnap(70, 50, false, true);

    tile2.events.onInputOver.add(onOver, this);
    tile2.events.onInputOut.add(onOut, this);
    tile2.events.onDragStart.add(onDragStart, this);
    tile2.events.onDragStop.add(onDragStop, this);

    dragPosition = new Phaser.Point(tile1.x, tile1.y);
    dragPosition2 = new Phaser.Point(tile2.x, tile2.y);

}
