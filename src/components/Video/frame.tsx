import React from "react";
import { resolve_video_click } from "../../functions/video";
import { useImages } from "../contexts/images-provider";

const VideoFrame = (props:VideoFrame) => {

    const images = useImages();

    return (
        <div
            id="video-iframe"
            onClick={(e) => {resolve_video_click(e);}}
        >
            <img className="close-pic" src={images.resolve_img('closeWhiteIcon')} onClick={(e) => resolve_video_click(e)}/>
        </div>
    );
};

interface VideoFrame {

};

export default VideoFrame;