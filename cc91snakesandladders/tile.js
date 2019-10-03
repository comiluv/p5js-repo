class Tile {
    constructor(x, y, wh, index_, snakeorladder) {
        this.x = x;
        this.y = y;
        this.wh = wh;
        this.index = index_;
        this.snakeorladder = snakeorladder;
        this.color = (this.index % 2) * 100 + 100;
    }

    show() {
        noStroke();
        fill(this.color);
        rect(this.x, this.y, this.wh, this.wh);

        // fill(255);
        // textSize(32);
        // text(this.index + "->" + this.next, this.x, this.y + resolution);
    }

    showSnakeAndLadder() {
        if (this.snakeorladder !== 0) {
            const myc = this.getCenter();
            const nxtc = tiles[this.index + this.snakeorladder].getCenter();
            strokeWeight(4);
            stroke(this.snakeorladder > 0 ? 255 : 0);
            line(myc[0], myc[1], nxtc[0], nxtc[1]);
            noStroke();
        }
    }

    getCenter() {
        const cx = this.x + this.wh * 0.5;
        const cy = this.y + this.wh * 0.5;
        return [cx, cy];
    }

    highlight() {
        noStroke();
        fill(100, 200, 255, 150);
        rect(this.x, this.y, this.wh, this.wh);
    }
}
