const snow = [];
const gravity = p5.prototype.createVector(0, 0.03);
let spritesheet;
const textures = [];
let zOff = 0;

function preload() {
    spritesheet = loadImage('./flakes32.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            const img = spritesheet.get(x, y, 32, 32);
            textures.push(img);
        }
    }
}

function draw() {
    background(0);
    snow.push(new Snowflake(0, 0, random(textures)));
    for (const flake of snow) {
        const xOff = flake.pos.x / width;
        const yOff = flake.pos.y / height;
        const wAngle = noise(xOff, yOff, zOff) * TWO_PI;
        const wind = p5.Vector.fromAngle(wAngle);
        wind.mult(random(-0.02, 0.02));
        flake.applyForce(wind);
        flake.applyForce(gravity);
        flake.update();
        flake.render();
    }
    zOff += 0.01;

    for (let i = snow.length - 1; i >= 0; --i) {
        if (snow[i].offScreen()) {
            snow.splice(i, 1);
        }
    }
}
