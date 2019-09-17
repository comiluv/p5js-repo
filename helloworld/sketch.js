/*
 * Hello World showing rainbows and reflections and other misc. effects
 */
let anim = 0;
let rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

function setup()
{
	createCanvas(windowWidth, windowHeight);
	textAlign(CENTER);
	textSize(128);
	noStroke();
	fill(255);
}

function draw()
{
	background(51, 50);
	push();
	translate(0, 0.5 * height);
	strokeWeight(1);
	for (let i = 10; i < 0.5 * height; i += 10)
	{
		stroke(i, 25);
		strokeWeight(1 + i * 0.1);
		line(0, anim + i, width, anim + i);
	}
	pop();
	anim = anim > 10 ? 0 : anim + 1;
	let altCol = 0;
	for (let i = 7; i >= 1; i--)
	{
		let r = i * width / 7;
		let currCol = color(rainbowColors[altCol]);
		fill(currCol, 10);
		stroke(currCol, 10);
		arc(0.5 * width, 0.5 * height, r, r, PI, 0);
		altCol = altCol >= rainbowColors.length - 1 ? 0 : ++altCol;
	}
	fill(255);
	noStroke();
	text("Hello World", width * 0.5, height * 0.5);
	stroke(255, 50);
	strokeWeight(4);
	line(0, 0.5 * height, width, 0.5 * height);
	push();
	scale(1, -1);
	fill(255, 30);
	noStroke();
	text("Hello World", 0.5 * width, -0.5 * height);
	pop();
}