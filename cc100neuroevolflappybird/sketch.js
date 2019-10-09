/* global Bird, Pipe, nextGeneration, NeuralNetwork
 */
/* exported birdSprite, pipeBodySprite, pipePeakSprite */
const totalBird = 500;
let birds;
let savedBirds;
let pipes;
let birdSprite;
let pipeBodySprite;
let pipePeakSprite;
let bgImg;
let bgX;
let globalCounter = 0;
const pipeSpeed = 2;
const parallax = 0.5;
let slider;
let brainJSON;

function preload() {
    birdSprite = loadImage("graphics/train.png");
    pipeBodySprite = loadImage("graphics/pipe_marshmallow_fix.png");
    pipePeakSprite = loadImage("graphics/pipe_marshmallow_fix.png");
    bgImg = loadImage("graphics/background.png");
    brainJSON = loadJSON("bird.json");
}

function setup() {
    createCanvas(800, 600);
    slider = createSlider(1, 100, 1, 1);
    reset();
}

function draw() {
    for (let n = 0; n < slider.value(); ++n) {
        if (globalCounter % 100 === 0) {
            pipes.push(new Pipe());
        }

        for (let i = pipes.length - 1; i >= 0; --i) {
            pipes[i].highlight = false;

            for (let j = birds.length - 1; j >= 0; --j) {
                if (pipes[i].hits(birds[j])) {
                    savedBirds = savedBirds.concat(birds.splice(j, 1));
                }
            }
            pipes[i].update();
            if (pipes[i].finished()) {
                pipes.splice(i, 1);
            }
        }

        for (let j = birds.length - 1; j >= 0; --j) {
            birds[j].think(pipes);
            birds[j].update();
            if (birds[j].y > height) {
                savedBirds = savedBirds.concat(birds.splice(j, 1));
            }
        }

        if (birds.length === 0) {
            globalCounter = 0;
            nextGeneration();
            pipes = [];
            pipes.push(new Pipe());
        }
        globalCounter++;
    }

    // drawing part
    image(bgImg, bgX, 0, bgImg.width, height);

    // bgX moves to left by pipe speed slowed down by parallax
    bgX -= pipeSpeed * parallax;
    // if bgX moved to far left so right border of bgImg start appearing in screen
    // calculate this by bgX has gone far left that bgImg is completely offscreen
    // and add width to that value
    if (bgX <= -bgImg.width + width) {
        image(bgImg, bgX + bgImg.width, 0, bgImg.width, height);
        if (bgX <= -bgImg.width) {
            bgX = 0;
        }
    }
    for (const bird of birds) {
        bird.show();
    }
    for (const pipe of pipes) {
        pipe.show();
    }
}

function keyPressed() {
    if (key === 'S' || key === 's') {
        const bird = birds[0];
        // let json = bird.brain.serialize();
        // save(json, "bird.json");
        saveJSON(bird.brain, "bird.json", false);
    }
    if (key === 'L' || key === 'l') {
        noLoop();
        const birdBrain = NeuralNetwork.deserialize(brainJSON);
        reset();
        noLoop();
        birds = [];
        for (let i = 0; i < totalBird; ++i) {
            const bird = new Bird(birdBrain);
            bird.mutate(0.1);
            birds.push(bird);
        }
        loop();
    }
}

function reset() {
    pipes = [];
    bgX = 0;
    globalCounter = 0;
    birds = [];
    savedBirds = [];
    slider.value(1);
    for (let i = 0; i < totalBird; ++i) {
        const bird = new Bird();
        birds.push(bird);
    }
    loop();
}
