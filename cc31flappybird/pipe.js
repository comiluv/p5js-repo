/* exported Pipe */
/* global pipeBodySprite, pipePeakSprite */
class Pipe {
    constructor() {
        this.top = random(height / 2 - 32);
        this.bottom = random(height / 2 - 32);
        this.x = width;
        this.w = 20;
        this.speed = 2;
        this.highlight = false;
        this.peakImg = pipePeakSprite;
        this.bodyImg = pipeBodySprite;
    }

    show() {
        // fill(255);
        // if (this.highlight) {
        //     fill(255, 0, 0);
        // }
        // rect(this.x, 0, this.w, this.top);
        // rect(this.x, height - this.bottom, this.w, this.bottom);

        // instead of drawing rectangles, draw sprites
        const numBlockTop = Math.ceil((this.top - this.peakImg.height) / this.bodyImg.height);
        const numBlockBottom = Math.ceil((this.bottom - this.peakImg.height) / this.bodyImg.height);

        // draw top block
        image(this.peakImg, this.x, this.top - this.peakImg.height, this.w, this.peakImg.height);
        // draw rest of the top blocks
        for (let i = 1; i <= numBlockTop; ++i) {
            image(this.bodyImg, this.x, this.top - (i + 1) * this.bodyImg.height,
                this.w, this.bodyImg.height);
        }

        // draw bottom
        image(this.peakImg, this.x, height - this.bottom, this.w, this.peakImg.height);
        // draw rest of the bottom blocks
        for (let i = 1; i <= numBlockBottom; ++i) {
            image(this.bodyImg, this.x, height - this.bottom + i * this.bodyImg.height,
                this.w, this.bodyImg.height);
        }
    }

    update() {
        this.x -= this.speed;
    }

    finished() {
        return this.x < -this.w;
    }

    hits(bird) {
        // Bird outside rectangle completely
        if (bird.x + bird.radius < this.x || bird.x - bird.radius > this.x + this.w) {
            return false;
        }
        if (bird.y - bird.radius > this.top && bird.y + bird.radius < height - this.bottom) {
            return false;
        }

        // Bird inside rectangle completely
        if (bird.x > this.x && bird.x < this.x + this.w
            && (bird.y < this.top || bird.y > height - this.bottom)) {
            return true;
        }

        const xNear = Math.max(this.x, Math.min(bird.x, this.x + this.w));
        const yNearTop = Math.max(0, Math.min(bird.y, this.top));
        const yNearBottom = Math.max(height - this.bottom, Math.min(bird.y, height));
        /* // Visualizing the web
        stroke(255);
        strokeWeight(1);
        line(bird.x, bird.y, xNear, yNearTop);
        line(bird.x, bird.y, xNear, yNearBottom); */
        return ((xNear - bird.x) ** 2 + (yNearTop - bird.y) ** 2 < bird.rSquared)
            || ((xNear - bird.x) ** 2 + (yNearBottom - bird.y) ** 2 < bird.rSquared);
    }
}
