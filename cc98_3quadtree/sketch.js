/* global Particle, Rectangle, QuadTree, Point, Circle
 */
const particles = [];

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 1000; ++i) {
        particles[i] = new Particle(random(width), random(height));
    }
}

function draw() {
    background(0);
    const boundary = new Rectangle(width * 0.5, height * 0.5, width, height);
    const qtree = new QuadTree(boundary, 4);
    for (const p of particles) {
        const point = new Point(p.x, p.y, p);
        qtree.insert(point);
        p.move();
        p.render();
        p.setHighlight(false);
    }

    for (const p of particles) {
        const range = new Circle(p.x, p.y, p.r * 2);
        const points = qtree.query(range);
        for (const point of points) {
            const other = point.userData;
            if (p !== other && p.intersects(other)) {
                p.setHighlight(true);
            }
        }
    }
}
