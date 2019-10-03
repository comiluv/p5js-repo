let target;
let pos = 0;
const drag = 0.75;
const strength = 0.1;

function setup()
{
  createCanvas(600, 800);
  // background(0);
}

let vel = 0;
const r = 50;

function draw()
{
  background('rgba(16,0,0, 0.4)');
  target = mouseX;

  let force = target - pos;
  force *= strength;
  vel *= drag;
  vel += force;

  pos += vel;

  fill(214, 71, 150);
  ellipse(pos, 400, r);
}
