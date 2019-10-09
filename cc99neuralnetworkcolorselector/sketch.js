/*
 exported mousePressed
 */
/*
 global NeuralNetwork
 */

let r, g, b;
let brain;
let which = "black";

function pickColor() {
    r = random(255);
    g = random(255);
    b = random(255);
    redraw();
}


function setup() {
    createCanvas(600, 360);
    noLoop();
    brain = new NeuralNetwork(3, 3, 2);

    for (let i = 0; i < 100000; ++i) {
        let colR = random(255);
        let colG = random(255);
        let colB = random(255);
        let inputs = [colR / 255, colG / 255, colB / 255];
        let targets = trainColor(colR, colG, colB);
        brain.train(inputs, targets);
    }
    console.log("init training done");
    pickColor();
}

function draw() {
    background(r, g, b);
    strokeWeight(4);
    stroke(0);
    line(width * 0.5, 0, width * 0.5, height);
    textSize(64);
    noStroke();
    textAlign(CENTER, CENTER);
    fill(0);
    text("black", width * (1.0 / 4), height / 2);
    fill(255);
    text("white", width * (3.0 / 4), height / 2);

    which = colorPredictor(r, g, b);
    if (which === "black") {
        fill(0);
        ellipse(width * (1.0 / 4), height * (4.0 / 5), 60, 60);
    } else {
        fill(255);
        ellipse(width * (3.0 / 4), height * (4.0 / 5), 60, 60);
    }
}

function mousePressed() {
    // let targets;
    // if (mouseX > width * 0.5) {
    //     console.log("clicked right");
    //     targets = [0, 1];
    // } else {
    //     console.log("clicked left");
    //     targets = [1, 0];
    // }
    // let inputs = [r / 255, g / 255, b / 255];
    // brain.train(inputs, targets);
    pickColor();
}

function colorPredictor(r_, g_, b_) {
    let inputs = [r_ / 255, g_ / 255, b_ / 255];
    let outputs = brain.predict(inputs);
    console.log(outputs);
    if (outputs[0] > outputs[1]) {
        return "black";
    } else {
        return "white";
    }
    // if ((r_ + g_ + b_) > 300) {
    //     return "black";
    // }
    // return "white";
}

function trainColor(colR, colG, colB) {
    if ((colR + colG + colB) > 300) {
        return [1, 0];
    }
    return [0, 1];
}
