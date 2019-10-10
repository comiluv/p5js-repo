/* global tf */
const xVals = [];
const yVals = [];
let m;
let b;
const learningRate = 0.5;
const optimizer = tf.train.sgd(learningRate);
let memoryUsage;

function setup() {
    createCanvas(400, 400);
    background(0);
    memoryUsage = createP();

    m = tf.scalar(random(1)).variable();
    b = tf.scalar(random(1)).variable();
}

function draw() {
    if (xVals.length > 0) {
        tf.tidy(() => {
            const ys = tf.tensor1d(yVals);
            optimizer.minimize(() => loss(predict(xVals), ys));
        });
    }
    background(0);
    stroke(255);
    strokeWeight(8);
    for (let i = 0; i < xVals.length; ++i) {
        point(denormalizeX(xVals[i]), denormalizeY(yVals[i]));
    }

    const xs = [0, 1];
    const ys = tf.tidy(() => predict(xs));

    const lineY = ys.dataSync();
    ys.dispose();
    // console.log(lineY);

    strokeWeight(2);
    line(0, denormalizeY(lineY[0]), width, denormalizeY(lineY[1]));


    memoryUsage.html(`numTensors: ${tf.memory().numTensors}`);
}

function mousePressed() {
    xVals.push(normalizeX(mouseX));
    yVals.push(normalizeY(mouseY));
}

function loss(pred, labels) {
    return pred.sub(labels).square().mean();
    // (pred, label) => pred.sub(label).square().mean();
}

function predict(someX) {
    const tfxs = tf.tensor1d(someX);

    // y=mx+b
    const someY = tfxs.mul(m).add(b);

    return someY;
}

function normalizeX(x) {
    return x / width;
}

function denormalizeX(x) {
    return x * width;
}

function normalizeY(y) {
    return (height - y) / height;
}

function denormalizeY(y) {
    return height - y * height;
}
