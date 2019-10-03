const resolution = 40;
const tiles = [];

let player;

const rolls = [];
let gameIndex = 0;
let averageRolls = 0;
let avgP;
let cols;
let rows;

function setup() {
    createCanvas(400, 400);
    avgP = createP('');
    cols = width / resolution;
    rows = height / resolution;

    let x = 0;
    let y = (rows - 1) * resolution;
    let dir = 1;
    for (let i = 0; i < cols * rows; ++i) {
        const tile = new Tile(x, y, resolution, i, 0);
        tiles.push(tile);
        x += resolution * dir;
        if (x >= width || x <= -resolution) {
            dir *= -1;
            x += resolution * dir;
            y -= resolution;
        }
    }
    player = new Player();
    rolls[gameIndex] = 0;

    // Duplicate tiles can be picked in this process
    // Make snakes
    for (let i = 0; i < 5; ++i) {
        const tile = tiles[floor(random(cols, tiles.length - 1))];
        const snakeVal = floor(random(-1 * tile.index, -1 * (tile.index % cols)));
        tile.snakeorladder = snakeVal;
        // console.log("snakeVal " + i + " tile: " + tile.index + " val: " + snakeVal);
    }
    // Make ladders
    for (let i = 0; i < 5; ++i) {
        const tile = tiles[floor(random(0, tiles.length - cols))];
        const ladderVal = floor(random(cols - (tile.index % cols), tiles.length - 1 - tile.index));
        tile.snakeorladder = ladderVal;
        // console.log("ladderVal " + i + " tile: " + tile.index + " val: " + ladderVal);
    }
}

function draw() {
    background(51);
    // frameRate(5);
    noStroke();
    for (const tile of tiles) {
        tile.show();
    }
    for (const tile of tiles) {
        tile.showSnakeAndLadder();
    }
    if (player.state === player.states.MOVE_STATE) {
        player.move();
    }
    if (player.state === player.states.ROLL_STATE) {
        player.roll();
        rolls[gameIndex]++;
    }

    let gameover = false;
    if (player.spot >= tiles.length - 1) {
        player.spot = tiles.length - 1;
        // console.log("game over");
        gameover = true;
    }
    player.show(tiles);

    if (gameover) {
        gameIndex++;
        rolls[gameIndex] = 0;
        player.reset();
        gameover = false;
    }


    let sum = 0;
    for (let i = 0; i < rolls.length - 1; ++i) {
        sum += rolls[i];
    }
    averageRolls = sum / (rolls.length - 1);
    avgP.html(averageRolls);
}
