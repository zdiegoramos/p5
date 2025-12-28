"use client";

import type p5 from "p5";
import { useEffect, useRef } from "react";

function sketch({
	canvasElement,
	draw,
	setup,
	preload,
	disableResize,
}: {
	canvasElement: HTMLDivElement;
	draw: (p: p5) => void;
	setup?: (p: p5, height: number, width: number) => void;
	preload?: (p: p5) => void;
	disableResize?: boolean;
}) {
	return (p: p5) => {
		if (preload) {
			console.log("Preloading...");
			() => preload(p);
		}

		p.setup = () => {
			const width = canvasElement.getBoundingClientRect().width;
			const height = canvasElement.getBoundingClientRect().height;
			if (setup) {
				setup(p, height, width);
			} else {
				p.createCanvas(width, height);
			}
		};

		if (!disableResize) {
			p.windowResized = () => {
				const width = canvasElement.getBoundingClientRect().width;
				const height = canvasElement.getBoundingClientRect().height;
				p.resizeCanvas(width, height);
			};
		}

		p.draw = () => draw(p);
	};
}

export function P5Canvas({
	draw,
	setup,
	preload,
	...props
}: React.ComponentProps<"div"> & {
	draw: (p: p5) => void;
	setup?: (p: p5, height: number, width: number) => void;
	preload?: (p: p5) => void;
}) {
	const p5CanvasRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const p5Current = p5CanvasRef.current;

		if (p5Current === null) {
			return;
		}

		// Dynamically import p5 only on the client side
		let p5Instance: p5 | null = null;
		import("p5").then((p5Module) => {
			p5Instance = new p5Module.default(
				sketch({ canvasElement: p5Current, draw, setup, preload }),
				p5Current,
			);
		});

		return () => {
			p5Instance?.remove();
		};
	}, [draw, setup, preload]);

	return (
		<div
			ref={p5CanvasRef}
			style={{ width: "100%", height: "100%" }}
			{...props}
		/>
	);
}
