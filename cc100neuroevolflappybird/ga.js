/* exported nextGeneration */
/* global totalBird, Bird, birds, savedBirds */

function nextGeneration() {
    calculateFitness(savedBirds);
    for (let i = 0; i < totalBird; ++i) {
        birds[i] = pickOne();
    }
    savedBirds = [];
    console.log("next gen");
}

function pickOne() {
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r -= savedBirds[index].fitness;
        index++;
    }
    index--;
    const bird = savedBirds[index];
    const child = new Bird(bird.brain);
    child.mutate(0.1);
    return child;
}

function calculateFitness(byrds) {
    let sum = 0;
    for (const bird of byrds) {
        sum += bird.score;
    }
    for (const bird of byrds) {
        bird.fitness = bird.score / sum;
    }
}
