import { VideoIcon } from "lucide-react";

function CallButton ({handleVideoCall}) {
    return (
        <div>
            <button onClick={handleVideoCall}>
                <VideoIcon />
            </button>
        </div>
    )
}

export default CallButton;