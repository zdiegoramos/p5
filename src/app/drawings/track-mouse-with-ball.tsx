"use client";

import type p5 from "p5";
import { P5Canvas } from "@/components/p5";

function draw({
	background,
	mouseIsPressed,
	fill,
	circle,
	mouseX,
	mouseY,
}: p5) {
	background("tomato");

	if (mouseIsPressed === true) {
		//when mouse button is pressed, circles turn black
		fill(0);
	} else {
		fill(255);
	}

	//white circles drawn at mouse position
	circle(mouseX, mouseY, 100);
}

export function TrackMouseWithBall() {
	return <P5Canvas draw={draw} />;
}
