function getRandomSize() {
    const r1 = floor(random(1, 17));
    const r2 = floor(random(1, 17));
    return r1 + r2;
}

class Snowflake {
    constructor(sx, sy, img) {
        const x = sx || random(width);
        const y = sy || random(-100, -10);
        this.img = img;
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.r = getRandomSize();
        this.angle = random(TWO_PI);
        this.dir = random(1) > 0.5 ? 1 : -1;
        this.xOff = 0;
    }

    randomize() {
        const x = random(width);
        const y = random(-100, -10);
        this.pos = createVector(x, y);
        this.vel = createVector();
        this.acc = createVector();
        this.r = getRandomSize();
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.xOff = sin(this.angle) * this.r;
        if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        } else if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        }

        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.2);
        if (this.vel.mag() < 1) {
            this.vel.normalize();
        }
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.angle += this.dir * this.vel.mag() * 0.005;
    }

    render() {
        // stroke(255);
        // strokeWeight(this.r);
        // point(this.pos.x, this.pos.y);
        push();
        translate(this.pos.x + this.xOff, this.pos.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r, this.r);
        pop();
    }

    offScreen() {
        return this.pos.y > height + this.r;
    }
}
