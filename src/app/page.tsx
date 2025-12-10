import { TrackMouseWithBall } from "@/app/track-mouse-with-ball";

export default function HomePage() {
	return (
		<div className="h-screen w-screen">
			{/* Add a border around the canvas as if it was a frame */}
			{/* <div className="h-full w-full p-9"> */}
			<TrackMouseWithBall />
			{/* </div> */}
		</div>
	);
}
