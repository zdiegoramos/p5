// Learned from Patt Vira
// https://www.youtube.com/watch?v=Fbzqfsy5GnM

"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

let img: p5.Image | null = null;

async function setup(p: p5, height: number, width: number) {
	p.createCanvas(width, height);
	try {
		img = await p.loadImage("/wave.png");
	} catch (error) {
		console.error("Error loading image:", error);
	}
}

function draw(p: p5) {
	p.background(0);
	if (img) {
		p.image(img, 0, 0, p.width, p.height);
	} else {
		// Show loading state
		p.fill(255);
		p.textAlign(p.CENTER, p.CENTER);
		p.text("Loading...", p.width / 2, p.height / 2);
	}
}

export function PixelImage() {
	return <P5Canvas draw={draw} setup={setup} />;
}
