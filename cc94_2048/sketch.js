let grid = [];
let wh = 0;
let score = 0;

function isGameWon() {
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (grid[i][j] >= 2048) {
                return true;
            }
        }
    }
    return false;
}

function isGameOver() {
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (grid[i][j] === 0) {
                return false;
            }
            if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
                return false;
            }
            if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

function blankGrid() {
    const blankOne = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    return blankOne;
}

function setup() {
    createCanvas(400, 400);
    noLoop();
    wh = width / 4.0;
    grid = blankGrid();
    addNumber();
    addNumber();
    updateCanvas();
}

function updateCanvas() {
    background(255);
    drawGrid();
    select('#score').html(score);
}

function drawGrid() {
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            noFill();
            strokeWeight(2);
            stroke(0);
            rect(j * wh, i * wh, wh, wh, 10, 10);
            if (grid[i][j]) {
                textAlign(CENTER, CENTER);
                const s = grid[i][j];
                textSize(sizesAndColor[s].size);
                fill(sizesAndColor[s].color);
                rect(j * wh, i * wh, wh, wh, 10, 10);
                stroke(255);
                fill(255);
                text(grid[i][j], j * wh + 0.5 * wh, i * wh + 0.5 * wh);
            }
        }
    }
}

function copyGrid(inputGrid) {
    const extra = blankGrid();
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            extra[i][j] = inputGrid[i][j];
        }
    }
    return extra;
}

function compare(gridA, gridB) {
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (gridA[i][j] !== gridB[i][j]) {
                return true;
            }
        }
    }
    return false;
}

function flipGrid(grid2d) {
    for (let i = 0; i < 4; ++i) {
        grid2d[i] = grid2d[i].reverse();
    }
}

// Transposition works here because what matters is that columns are
// converted to rows, and relationship between converted rows does not matter
// Usual transposition of a matrix
function transposeGrid(grid2d) {
    for (let i = 0; i < 4; ++i) {
        for (let j = i; j < 4; ++j) {
            const temp = grid2d[i][j];
            grid2d[i][j] = grid2d[j][i];
            grid2d[j][i] = temp;
        }
    }
}

// Transposition of a matrix in the other diagonal
function transposeGridDash(grid2d) {
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4 - i; ++j) {
            const temp = grid2d[i][j];
            grid2d[i][j] = grid2d[3 - j][3 - i];
            grid2d[3 - j][3 - i] = temp;
        }
    }
}

/*
 0  1  2  3          12  8  4  0
 4  5  6  7    <=    13  9  5  1
 8  9 10 11    =>    14 10  6  2
12 13 14 15          15 11  7  3
 */
// https://www.geeksforgeeks.org/inplace-rotate-square-matrix-by-90-degrees/
function rotateCounterClockwise(grid2d) {
    const n = grid2d.length;
    for (let i = 0; i < n / 2; ++i) {
        for (let j = i; j < n - 1 - i; ++j) {
            const temp = grid2d[i][j];
            grid2d[i][j] = grid2d[j][n - 1 - i];
            grid2d[j][n - 1 - i] = grid2d[n - 1 - i][n - 1 - j];
            grid2d[n - 1 - i][n - 1 - j] = grid2d[n - 1 - j][i];
            grid2d[n - 1 - j][i] = temp;
        }
    }
    return 1;
}

function rotateClockwise(grid2d) {
    const n = grid2d.length;
    for (let i = 0; i < n / 2; ++i) {
        for (let j = i; j < n - 1 - i; ++j) {
            const temp = grid2d[i][j];
            grid2d[i][j] = grid2d[n - 1 - j][i];
            grid2d[n - 1 - j][i] = grid2d[n - 1 - i][n - 1 - j];
            grid2d[n - 1 - i][n - 1 - j] = grid2d[j][n - 1 - i];
            grid2d[j][n - 1 - i] = temp;
        }
    }
    return 2;
}

// One "move"
function keyPressed() {
    const validKey = {
        38: true, // UP_ARROW
        39: true, // RIGHT_ARROW
        40: true, // DOWN_ARROW
        37: true, // LEFT_ARROW
    };
    if (keyCode in validKey) {
        let flipped = false;
        let rotated = 0; // rotated counter clockwise = 1, clockwise = 2
        let transposed = false;
        let transposedDash = false;
        switch (keyCode) {
            case LEFT_ARROW:
                flipGrid(grid);
                flipped = true;
                break;
            case RIGHT_ARROW:
                // do something
                break;
            case UP_ARROW:
                transposeGridDash(grid);
                transposedDash = true;
                break;
            case DOWN_ARROW:
                transposeGrid(grid);
                transposed = true;
                break;
            default:
                break;
        }

        const past = copyGrid(grid);
        for (let i = 0; i < 4; ++i) {
            grid[i] = operate(grid[i]);
        }
        const changed = compare(past, grid);
        if (flipped) {
            flipGrid(grid);
        } else if (transposed) {
            transposeGrid(grid);
        } else if (transposedDash) {
            transposeGridDash(grid);
        }
        if (changed) {
            addNumber();
        }
        updateCanvas();
        if (isGameWon()) {
            console.log("Game Won");
        } else if (isGameOver()) {
            console.log("Game Over");
        }
    }

    if (key === 'r' || key === 'R') {
        grid = blankGrid();
        score = 0;
        addNumber();
        addNumber();
        updateCanvas();
    }
}

function operate(row) {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
}


// Making new array
function slide(row) {
    let arr = row.filter((val) => val);
    const missing = 4 - arr.length;
    const zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

// Operating on array itself
function combine(row) {
    for (let i = 3; i >= 1; --i) {
        const a = row[i];
        const b = row[i - 1];
        if (a === b) {
            row[i] = a + b;
            score += row[i];
            row[i - 1] = 0;
            // break;
        }
    }
    return row;
}

function addNumber() {
    const options = [];
    for (let i = 0; i < 4; ++i) {
        for (let j = 0; j < 4; ++j) {
            if (grid[i][j] === 0) {
                options.push({
                    x: j,
                    y: i,
                });
            }
        }
    }
    if (options.length > 0) {
        const spot = random(options);
        const r = random(1);
        grid[spot.y][spot.x] = r > 0.5 ? 2 : 4;
    }
}
