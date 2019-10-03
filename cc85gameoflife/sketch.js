const resoultion = 5;
let rows;
let cols;
let grid;
let genCount = 0;
let genDisplay;

function setup() {
    createCanvas(600, 400);
    genDisplay = createElement("h2", str(genCount));
    rows = height / resoultion;
    cols = width / resoultion;
    grid = make2Darray(rows, cols);
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0, 255);
    genDisplay.html(str(genCount));
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            const x = j * resoultion;
            const y = i * resoultion;
            if (grid[i][j]) {
                fill(255);
            } else {
                fill(0);
            }
            rect(x, y, resoultion - 1, resoultion - 1);
        }
    }
    const next = make2Darray(rows, cols);

    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            const state = grid[i][j];

            // Count live neighbors!
            const neighbors = sumOfNeighbors(grid, i, j);
            if (state === 0 && neighbors === 3) {
                next[i][j] = 1;
            } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = grid[i][j];
            }
        }
    }

    // Compute next based on grid
    grid = next;
    genCount++;
}

function sumOfNeighbors(arr, row, col) {
    let s = 0;
    for (let i = -1; i < 2; ++i) {
        for (let j = -1; j < 2; ++j) {
            if (i || j) {
                const rowVal = (rows + row + i) % rows;
                const colVal = (cols + col + j) % cols;
                // console.log("row: " + rowVal + " col: " + colVal);
                s += arr[rowVal][colVal];
            }
        }
    }
    return s;
}


function make2Darray(rows_, cols_) {
    const arr = new Array(rows_);
    for (let i = 0; i < arr.length; ++i) {
        arr[i] = new Array(cols_);
    }
    return arr;
}
