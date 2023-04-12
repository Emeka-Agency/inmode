import React from "react";
import { GatsbyImage_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";
import { resolveVideoClick } from "../../functions/video";
import { _log } from "../../functions/logger";

import "./index.css";

const Video = ({ video = {}, few = false, key = null, ...props }:Video) => {

    return (
        <div
            className={`${few ? 'few-videos' : ''} poster video ${props.className ?? ""}`}
            onClick={(e) => {resolveVideoClick(e, video.url || '');}}
            key={key}
        >
            <div
                className="video-poster background-image"
                style={{
                    backgroundImage: `url(${video.poster_link == "external" && typeof video.poster == "string" ? video.poster : resolveImg(video.poster)})`,
                    aspectRatio: video.poster_ratio ?? 'unset'
                }}
            >
                <span className="video-bg"></span>
            </div>
            <span className="video-play-btn"></span>
      </div>
    );
};

export default Video;

interface Video {
    video?: {
        url?: string;
        poster?: {localFile: GatsbyImage_Interface} | GatsbyImage_Interface | string;
        poster_link?: string;
        poster_ratio?: number;
        alt?: string;
    }
    few?: boolean;
    key?: string|number|null;
    className?: string;
    id?: string;
}