import { TrackMouseWithBall } from "@/app/drawings/track-mouse-with-ball";

export default function HomePage() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			{/* Add a border around the canvas as if it was a frame */}
			{/* <div className="h-full w-full p-9"> */}
			<TrackMouseWithBall />
		</div>
	);
}
