class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.intersects = false;
    }

    rend() {
        if (this.intersects) {
            fill(150, 100, 255);
        } else {
            noFill();
        }
        stroke(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = r * r;
    }

    intersects(rectangle) {
        // Showing https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_098.3_QuadTree_Collisions/P5/quadtree.js
        const xDist = Math.abs(rectangle.x - this.x);
        const yDist = Math.abs(rectangle.y - this.y);

        if (xDist > this.r + rectangle.w / 2 || yDist > this.r + rectangle.h / 2) {
            return false;
        }
        if (xDist <= rectangle.w / 2 || yDist <= rectangle.h / 2) {
            return true;
        }
        const edges = (xDist - rectangle.w / 2) ** 2 + (yDist - rectangle.h / 2) ** 2;
        return edges <= this.rSquared;
    }

    rend() {
        noFill();
        stroke(255, 200, 150);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }
}


let r;

function setup() {
    createCanvas(700, 600);
    r = new Rectangle(width * 0.5, height * 0.5, random(90, 200), random(90, 200));
}

function draw() {
    background(51);
    const c = new Circle(mouseX, mouseY, 50);
    r.intersects = false;
    r.intersects = c.intersects(r);
    r.rend();
    c.rend();
}
