class Player {
    constructor() {
        this.startSpot = -1;
        this.spot = -1;
        this.dice = 0;
        this.destSpot = -1;
        this.states = {
            ROLL_STATE: "roll state",
            MOVE_STATE: "move state",
        };
        this.state = this.states.ROLL_STATE;
    }

    roll() {
        this.dice = floor(random(1, 7));
        let startTile = 0;
        if (tiles[this.spot] && tiles[this.spot].snakeorladder) {
            this.dice--;
            startTile += tiles[this.spot].snakeorladder;
            tiles[this.spot + tiles[this.spot].snakeorladder].highlight();
        }
        for (let i = 1; i <= this.dice; ++i) {
            tiles[min(tiles.length - 1, startTile + this.spot + i)].highlight();
        }
        this.destSpot = min(tiles.length - 1, startTile + this.spot + this.dice);
        this.state = this.states.MOVE_STATE;
    }

    move() {
        if (this.spot === this.destSpot) {
            this.startSpot = this.spot;
            this.state = this.states.ROLL_STATE;
        } else if (tiles[this.startSpot] && tiles[this.startSpot].snakeorladder && this.spot === this.startSpot) {
            this.spot += tiles[this.startSpot].snakeorladder;
        } else if (this.spot !== this.destSpot) {
            this.spot++;
        }
    }

    show(tiles) {
        const current = tiles[this.spot];
        if (current) {
            fill(255, 100, 200);
            const center = current.getCenter();
            ellipse(center[0], center[1], current.wh / 3.0);
        }
    }

    reset() {
        this.startSpot = -1;
        this.spot = -1;
        this.dice = 0;
        this.destSpot = -1;
        this.state = this.states.ROLL_STATE;
    }
}
