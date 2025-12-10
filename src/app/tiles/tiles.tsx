"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

let colums = 0;
let rows = 0;
let blocks: ReturnType<typeof Block>[][] = [];
const mouseDistance = 30;

function Block(i: number, j: number, size: number) {
	// The position of the block is calculated based on its grid indices
	// and the size of each block to center it within its grid cell
	// Example: for i=0, j=0 and size=50, x=25, y=25
	// for i=1, j=0 and size=50, x=75, y=25, etc.
	const x = i * size + size / 2;
	const y = j * size + size / 2;

	return {
		angle: 0,
		display(p: p5) {
			p.push();
			p.translate(x, y);
			p.rotate(this.angle);
			p.rect(0, 0, size, size);
			p.pop();
		},
		move(p: p5) {
			const distance = p.dist(p.mouseX, p.mouseY, x, y);
			if (p.pmouseX - p.mouseX !== 0 || p.pmouseY - p.mouseY !== 0) {
				if (distance < mouseDistance) {
					this.angle += 1;
				}
			}
			if (this.angle > 0 && this.angle <= 90) {
				this.angle += 1;
			} else {
				this.angle = 0;
			}
		},
	};
}

function setup(p: p5) {
	p.angleMode(p.DEGREES);
	p.rectMode(p.CENTER);
	const size = p.width * 0.05;
	colums = p.width / size;
	rows = p.height / size;

	blocks = Array.from({ length: colums }, (_, i) =>
		Array.from({ length: rows }, (_, j) => Block(i, j, size)),
	);
}

function draw(p: p5) {
	p.background("tomato");

	blocks.flat().forEach((block) => {
		block.move(p);
		block.display(p);
	});
}

export function Tiles() {
	return <P5Canvas draw={draw} setup={setup} />;
}
