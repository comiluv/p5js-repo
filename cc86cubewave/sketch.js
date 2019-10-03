let angle = 0;
const w = 36;
const magicAngle = Math.atan(1 / Math.sqrt(2));
let maxD;

function setup() {
    createCanvas(600, 600, WEBGL);
    maxD = dist(0, 0, width * 0.5, height * 0.5);
}

function draw() {
    background(201);
    /* https://en.wikipedia.org/wiki/Isometric_projection */
    ortho(-width, width, -height, height, 0, 1000);
    /* https://en.wikipedia.org/wiki/Magic_angle */
    rotateX(-magicAngle);
    rotateY(-QUARTER_PI);
    pointLight(255, 255, 255, 0, 0, 400);
    pointLight(100, 50, 100, -300, -300, height / 2);
    directionalLight(150, 150, 150, -0.8, -0.8, 0);

    for (let z = 0; z < height; z += w) {
        for (let x = 0; x < width; x += w) {
            push();
            const d = dist(x, z, width * 0.5, height * 0.5);
            const offset = map(d, 0, maxD, -PI, PI);
            const a = angle + offset;
            const h = floor(map(sin(a), -1, 1, 100, 300));
            translate(x - width * 0.5, 0, z - height * 0.5);
            ambientMaterial(200, 200, 100, 255);
            box(w - 2, h, w - 2);
            pop();
        }
    }
    angle -= 0.1;
}
