/**
 * Guest Tutorial #2: Web Animations and Mo.js with Sarah Drasner
 * https://www.youtube.com/watch?v=yRxWa8lXasI&list=PLRqwX-V7Uu6bYBG4PsCJpsvMka3boE9pR&index=4
 */

const burst = new mojs.Burst({
	radius: { 0: 100 },
	count: 20,
	children: {
		shape: 'cross',
		stroke: 'teal',
		strokeWidth: { 6: 0 },
		angle: { 360: 0 },
		radius: { 30: 5 },
		duration: 3000
	}
});

const burst2 = new mojs.Burst({
	radius: { 0: 200 },
	count: 12,
	children: {
		shape: 'zigzag',
		points: 7,
		stroke: { 'magenta': 'pink' },
		fill: 'none',
		strokeWidth: { 6: 0 },
		angle: { '-360': 0 },
		opacity: { 1: 0 },
		radius: { 30: 5 },
		duration: 3000
	}
});

const burst3 = new mojs.Burst({
	radius: { 0: 200 },
	count: 5,
	children: {
		fill: 'purple',
		points: 7,
		angle: { '-360': 0 },
		opacity: { 1: 0 },
		radius: { 10: 5 },
		duration: 3000
	}
});

const circ_opt = {
	radius: { 0: 200 },
	fill: 'none',
	stroke: 'yellow',
	opacity: { 1: 0 },
	duration: 3500
};

const circ = new mojs.Shape({
	...circ_opt
});

const circ2 = new mojs.Shape({
	...circ_opt,
	delay: 500
});

const timeline = new mojs.Timeline({
	repeat: 999
}).add(burst, burst2, burst3, circ, circ2)
	.play();