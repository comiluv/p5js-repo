/* global tf */
const xVals = [];
const yVals = [];
let operands = [];
let numPoly = 2;
let numPolySlider;
let draggingMouse = false;

const learningRate = 0.2;
const optimizer = tf.train.adam(learningRate);
let memoryUsage;
let displayOperands;

function initOperands() {
    // dispose disposes SOME values in the array
    // but not all of them
    tf.dispose(operands);
    operands = [];
    numPoly = numPolySlider.value();
    for (let i = 0; i <= numPoly; ++i) {
        operands.push(tf.scalar(random(-1, 1)).variable());
    }
}

function setup() {
    createCanvas(400, 400);
    background(0);
    memoryUsage = createP();
    displayOperands = createP();
    numPolySlider = createSlider(0, 20, numPoly, 1);
    numPolySlider.changed(initOperands);
    initOperands();
}

function draw() {
    if (draggingMouse && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        xVals.push(normalizeX(mouseX));
        yVals.push(normalizeY(mouseY));
    } else if (xVals.length > 0) {
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

    const curveX = [];
    for (let x = -1; x < 1; x += 0.01) {
        curveX.push(x);
    }
    const ys = tf.tidy(() => predict(curveX));

    const curveY = ys.dataSync();
    ys.dispose();
    // console.log(lineY);

    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < curveX.length; ++i) {
        vertex(denormalizeX(curveX[i]), denormalizeY(curveY[i]));
    }
    endShape();

    const outputString = [];
    for (let i = 0; i < operands.length; ++i) {
        const coeff = operands[i].dataSync()[0].toFixed(3); // dataSync returns an array
        switch (i) {
            case 0:
                outputString.push(`${coeff}`);
                break;
            default:
                outputString.push(`${coeff}x<sup>${i}</sup>`);
                break;
        }
    }
    memoryUsage.html(`numTensors: ${tf.memory().numTensors}<br>numBytes: ${tf.memory().numBytes}<br>numDataBuffers: ${tf.memory().numDataBuffers}<br>numPoints: ${xVals.length}`);
    displayOperands.html(`<p>Operands: ${numPoly}<br>f(x) = ${outputString.reverse().join(" + ")}</p>`);
    // noLoop();
}

function mouseReleased() {
    draggingMouse = false;
}

function mousePressed() {
    draggingMouse = true;
}

function loss(pred, labels) {
    return pred.sub(labels).square().mean();
    // (pred, label) => pred.sub(label).square().mean();
}

function predict(someX) {
    const tfxs = tf.tensor1d(someX);

    // initialize ys with zeros it's going to be injective from tfxs x=>f(x)
    let someY = tf.zerosLike(tfxs) // same as tf.zeros([1,someX.length])
        .variable();

    /* y = operands[0]x^0 + operands[1]x^1 + operands[2]x^2 + ...
     ... + operands[operands.length - 1]x^(operands.length - 1) */
    for (let i = 0; i < operands.length; ++i) {
        const coefficient = operands[i];
        const exponent = tf.fill(tfxs.shape, i);
        const coefftimesxpowexponent = tfxs.pow(exponent).mul(coefficient);
        const result = someY.add(coefftimesxpowexponent);
        // someY = someY.add(coefftimesxpowexponet) causes memory leak for some weird
        // fucking reason I don't know
        someY.dispose();
        someY = result.clone();
    }
    return someY;
}

function normalizeX(x) {
    // return map(x, 0, width, -1, 1);
    return (2.0 * x) / width - 1;
}

function denormalizeX(x) {
    // return map(x, -1, 1, 0, width);
    return ((x + 1) * width) / 2.0;
}

function normalizeY(y) {
    // return map(y, 0, height, 1, -1);
    return (2.0 * (height - y)) / height - 1;
}

function denormalizeY(y) {
    // return map(y, 1, -1, 0, height);
    return height - ((y + 1) * height) / 2.0;
}
