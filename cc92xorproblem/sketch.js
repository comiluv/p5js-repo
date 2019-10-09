let nn;

const training_data = [{
    inputs: [0, 0],
    outputs: [0],
},
{
    inputs: [0, 1],
    outputs: [1],
},
{
    inputs: [1, 0],
    outputs: [1],
},
{
    inputs: [1, 1],
    outputs: [0],
},
];

let lr_slider;

const resolution = 10;
let cols;
let rows;

function setup() {
    createCanvas(400, 400);
    cols = width / resolution;
    rows = height / resolution;
    nn = new NeuralNetwork(2, 64, 1);
    lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);
}

function draw() {
    background(0);
    nn.setLearningRate(lr_slider.value());

    for (let i = 0; i < 1000; ++i) {
        const data = random(training_data);
        nn.train(data.inputs, data.outputs);
    }

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            const x2 = 1.0 * i / rows;
            const x1 = 1.0 * j / cols;
            const inputs = [x1, x2];
            const y = nn.predict(inputs);
            noStroke();
            fill(y * 255);
            rect(j * resolution, i * resolution, resolution, resolution);
        }
    }
}
