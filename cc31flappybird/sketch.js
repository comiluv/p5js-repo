/* global Bird, Pipe
 */
let bird;
let pipes;
let score = 0;
let birdSprite;
let pipeBodySprite;
let pipePeakSprite;
let bgImg;
let bgX;
const parallax = 0.5;

function preload() {
    birdSprite = loadImage("graphics/train.png");
    pipeBodySprite = loadImage("graphics/pipe_marshmallow_fix.png");
    pipePeakSprite = loadImage("graphics/pipe_marshmallow_fix.png");
    bgImg = loadImage("graphics/background.png");
}

function setup() {
    createCanvas(800, 600);
    reset();
}

function draw() {
    background(0, 255);
    image(bgImg, bgX, 0, bgImg.width, height);

    // bgX moves to left by pipe speed slowed down by parallax
    bgX -= pipes[0].speed * parallax;
    // if bgX moved to far left so right border of bgImg start appearing in screen
    // calculate this by bgX has gone far left that bgImg is completely offscreen
    // and add width to that value
    if (bgX <= -bgImg.width + width) {
        image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
        if (bgX <= -bgImg.width) {
            bgX = 0;
        }
    }

    if (frameCount % 60 === 0) {
        pipes.push(new Pipe());
    }
    for (let i = pipes.length - 1; i >= 0; --i) {
        pipes[i].highlight = false;
        if (pipes[i].hits(bird)) {
            pipes[i].highlight = true;
            console.log("hit");
        }
        pipes[i].update();
        pipes[i].show();
        if (pipes[i].finished()) {
            pipes.splice(i, 1);
            score++;
        }
    }
    bird.update();
    bird.show();
}

function keyPressed() {
    if (key === ' ') {
        bird.up();
    }
}

function reset() {
    score = 0;
    pipes = [];
    bgX = 0;
    bird = new Bird();
    pipes.push(new Pipe());
    loop();
}
