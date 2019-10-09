/* global Rectangle, QuadTree, Point */
let qt;
let totalPoints = 0;
let totalPointsP;
let radarPoints = 0;
let radarPointsP;

function setup() {
    createCanvas(800, 800);
    background(51, 255);
    totalPointsP = createP("totalPoints");
    radarPointsP = createP("radarPoints");

    const boundary = new Rectangle(width * 0.5, height * 0.5, width * 0.5, height * 0.5);
    qt = new QuadTree(boundary, 4);

    for (let i = 0; i < 1000; ++i) {
        const p = new Point(random(width), random(height));
        qt.insert(p);
        totalPoints++;
    }
    qt.show();
}

function draw() {
    if (mouseIsPressed) {
        for (let i = 0; i < 5; ++i) {
            const m = new Point(mouseX + random(-10, 10), mouseY + random(-10, 10));
            totalPoints++;
            qt.insert(m);
        }
    }
    background(0);
    qt.show();

    const range = new Rectangle(mouseX, mouseY, 100, 100);
    stroke(0, 255, 0);
    rectMode(CENTER);
    rect(range.x, range.y, range.w * 2, range.h * 2);
    radarPoints = 0;
    const points = qt.query(range);

    for (const p of points) {
        stroke(0, 255, 0);
        strokeWeight(5);
        point(p.x, p.y);
    }
    totalPointsP.html(totalPoints);
    radarPointsP.html(radarPoints);
}
