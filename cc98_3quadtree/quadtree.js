/* exported Point, Circle, Rectangle, QuadTree
 */

class Point {
    constructor(x, y, userData) {
        this.x = x;
        this.y = y;
        this.userData = userData;
    }

    show() {
        stroke(255);
        strokeWeight(4);
        point(this.x, this.y);
    }
}

class Circle {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rSquared = this.r * this.r;
    }

    contains(point) {
        const d = ((this.x - point.x) ** 2) + ((this.y - point.y) ** 2);
        return d <= this.rSquared;
    }

    intersects(range) {
        const xDist = Math.abs(range.x - this.x);
        const yDist = Math.abs(range.y - this.y);

        const { r } = this;

        const { w } = range;
        const { h } = range;

        const edges = (xDist - w) ** 2 + (yDist - h) ** 2;

        if (xDist > (r + w) || yDist > (r + h)) {
            return false;
        }

        if (xDist <= w || yDist < h) {
            return true;
        }

        return edges <= this.rSquared;
    }
}

class Rectangle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {
        return (point.x >= this.x - this.w
            && point.x <= this.x + this.w
            && point.y >= this.y - this.h
            && point.y <= this.y + this.h);
    }

    intersects(range) {
        return !(range.x - range.w > this.x + this.w
            || range.x + range.w < this.x - this.w
            || range.y - range.h > this.y + this.h
            || range.y + range.h < this.y - this.h);
    }
}

class QuadTree {
    constructor(boundary, n) {
        this.boundary = boundary;
        this.capacity = n;
        this.points = [];
        this.divided = false;
    }

    insert(point) {
        if (!this.boundary.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) {
            this.subdivide();
        }

        return this.northwest.insert(point) || this.northeast.insert(point)
            || this.southwest.insert(point) || this.southeast.insert(point);
    }

    subdivide() {
        // prefer destructuring
        const { x } = this.boundary;
        const { y } = this.boundary;
        const { w } = this.boundary;
        const { h } = this.boundary;
        const nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
        const ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
        const sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
        const se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
        this.northwest = new QuadTree(nw, this.capacity);
        this.northeast = new QuadTree(ne, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.southeast = new QuadTree(se, this.capacity);
        this.divided = true;
    }

    show() {
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
        if (this.divided) {
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southeast.show();
        }
        for (const p of this.points) {
            p.show();
        }
    }

    query(range, arr) {
        if (!arr) {
            arr = [];
        }
        if (!this.boundary.intersects(range)) {
            // empty array
            return [];
        }
        for (const p of this.points) {
            if (range.contains(p)) {
                arr.push(p);
            }
        }
        if (this.divided) {
            this.northwest.query(range, arr);
            this.northeast.query(range, arr);
            this.southwest.query(range, arr);
            this.southeast.query(range, arr);
        }
        return arr;
    }
}
