import React from "react";
import { GatsbyImage_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";
import { resolveVideoClick } from "../../functions/video";
import { _log } from "../../functions/logger";

import "./index.css";

const Video = ({ video = {}, few = false, key = null, ...props }:Video) => {

    const [ratio, setRatio] = React.useState<number>(0);

    const extractRatio = (url:string) => {
        const img = new Image();
        img.src = url;
        return img.width / img.height;
    }

    React.useEffect(() => {
        if(video.poster_ratio) {
            setRatio(video.poster_ratio);
        }
        else if(video.poster_link == "external" && typeof video.poster == "string") {
            setRatio(extractRatio(video.poster));
        }
        else if(typeof video.poster != "string" && resolveImg(video.poster)) {
            setRatio((video.poster?.localFile ? video.poster.localFile : video.poster).childImageSharp.fluid.aspectRatio);
        }
        else
        {
            setRatio(0);
        }
    }, [video]);

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
                    aspectRatio: ratio == 0 ? undefined : ratio,
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