/* exported Bird */
/* global birdSprite */
class Bird {
    constructor() {
        this.y = height * 0.5;
        this.x = 64;

        this.gravity = 1;
        this.lift = -15;
        this.velocity = 0.6;
        this.radius = 16;
        this.diameter = this.radius * 2;
        this.rSquared = this.radius * this.radius;
        this.icon = birdSprite;
    }

    show() {
        // instead of drawing an ellipse, draw bird sprite
        image(this.icon, this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
        // fill(255, 150);
        // ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    update() {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        if (this.y + this.radius > height) {
            this.y = height - this.radius;
            this.velocity = 0;
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.velocity = 0;
        }
    }

    up() {
        this.velocity += this.lift;
    }
}
