import React from "react";
import { GatsbyImage_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";
import { resolveVideoClick } from "../../functions/video";

import "./index.css";
import { _log } from "../../functions/logger";

const Video = ({ video = {}, few = false, key = null, ...props }:Video) => {

    _log(video);

    return (
        <div
            className={`${few ? 'few-videos' : ''} poster video ${props.className}`}
            onMouseDown={(e) => {resolveVideoClick(e, video.url || '');}}
            onMouseUp={(e) => {resolveVideoClick(e, video.url || '');}}
            onClick={(e) => {resolveVideoClick(e, video.url || '');}}
            key={key}
        >
            <div
                className="video-poster"
                style={{backgroundImage: `url(${video.poster_link == "external" && typeof video.poster == "string" ? video.poster : resolveImg(video.poster)})`}}
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
        alt?: string;
    }
    few?: boolean;
    key?: string|number|null;
    className?: string;
    id?: string;
}