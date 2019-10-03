/* 
from https://www.youtube.com/watch?v=bEyTZ5ZZxZs
also see https://10print.org
 */
let unit;
let w_or_h;
let i = 0,
	j = 0;

function setup()
{
	createCanvas(windowWidth, windowHeight);
	w_or_h = width > height ? width : height;
	unit = w_or_h / 50;
	colorMode(HSB, 360);
	strokeWeight(unit >> 2);
	background(0);
}

function draw()
{
	stroke(random(360),360,360);
	if (random(1) < 0.5)
	{
		line(i, j, i + unit, j + unit);
	}
	else
	{
		line(i, j + unit, i + unit, j);
	}
	i += unit;
	if (i > width)
	{
		i = 0;
		j += unit;
	}
	if (j > height)
	{
		background(0);
		i = j = 0;
	}
}