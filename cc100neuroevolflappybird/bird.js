/* exported Bird */
/* global birdSprite, NeuralNetwork */
class Bird {
    constructor(birdbrain) {
        this.y = height * 0.5;
        this.x = 64;
        this.score = 0;
        this.fitness = 0;

        this.gravity = 1;
        this.lift = -15;
        this.velocity = 0.6;
        this.radius = 16;
        this.diameter = this.radius * 2;
        this.rSquared = this.radius * this.radius;
        this.icon = birdSprite;
        if (birdbrain instanceof NeuralNetwork) {
            this.brain = birdbrain.copy();
        } else {
            this.brain = new NeuralNetwork(5, 6, 2);
        }
    }

    show() {
        // instead of drawing an ellipse, draw bird sprite
        image(this.icon, this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
        // fill(255, 150);
        // ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    think(pipes) {
        let nearPipe = pipes[0];
        for (let i = 0; i < pipes.length; ++i) {
            if (pipes[i].x + pipes[i].w > this.x) {
                nearPipe = pipes[i];
                break;
            }
        }
        const inputs = [this.y / height,
            nearPipe.top / height,
            nearPipe.bottom / height,
            nearPipe.x / width,
            this.velocity / 10,
        ];
        const output = this.brain.predict(inputs);
        if (output[0] > output[1]) {
            this.up();
        }
    }

    update() {
        this.score++;
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
        // if (this.y + this.radius > height) {
        //     this.y = height - this.radius;
        //     this.velocity = 0;
        // }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.velocity = 0;
        }
    }

    up() {
        this.velocity += this.lift;
    }

    mutate(rate) {
        this.brain.mutate(
            (val) => {
                if (Math.random() < rate) {
                    // return 2 * Math.random() - 1;
                    return val + randomGaussian() * 0.5;
                }
                return val;
            },
        );
    }
}
