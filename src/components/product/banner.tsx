import React from "react";
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Base_Banner_Interface } from "../interfaces";

const ProductBanner = ({ datas }:ProductBanner_Interface) => {

    const videoRef = React.useRef(null);
    const startTime = datas?.video_start ?? null; // Start time in seconds
    const endTime = datas?.video_stop ?? null; // End time in seconds
  
    React.useEffect(() => {
        if(!startTime || !endTime) return;
        const video = videoRef.current;
        if (!video) return;
    
        const onLoadedMetadata = () => {
            video.currentTime = startTime; // Set the start time
            video.style.visibility = "visible";
        };

        const onTimeUpdate = () => {
            if (video.currentTime < startTime) {
                video.currentTime = startTime; // Optional: rewind to start time
            } else
            if (video.currentTime >= endTime) {
                // video.pause(); // Stop the video at the end time
                video.currentTime = startTime; // Optional: rewind to start time
            }
        };
    
        video.addEventListener('loadedmetadata', onLoadedMetadata);
        video.addEventListener('timeupdate', onTimeUpdate);
    
        // Cleanup event listeners on component unmount
        return () => {
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('timeupdate', onTimeUpdate);
        };
    }, [startTime, endTime]); // Re-run effect if start or end time changes

    // TODO récupérer images et vidéos pour chaque produit
    return (
        <div className="product-banner transition">
            <div className="top-transition"></div>
            <div className="product-banner-media">
                {datas.left_video ?
                    <video
                        style={{visibility: "hidden"}}
                        ref={videoRef}
                        playsInline={false} 
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        // poster={datas.left_img && datas.left_img.localFile.childImageSharp?.fluid.srcWebp}
                        height={380}
                    >
                        <source
                            src={datas.left_video}
                            type="video/mp4"
                        />
                        <track src="" kind="subtitles" srcLang="en" label="English"></track>
                    </video>
                    :
                datas.left_img ?
                    <img
                        className="product-banner-left-img"
                        src={resolveImg(datas.left_img)}
                        alt="bodytite-logo-text"
                    />
                    :
                    null
                }
            </div>
            <div className="product-banner-details">
                <img
                    className="product-banner-logo"
                    src={resolveImg(datas.right_img)}
                    alt="bodytite-logo-text"
                />
                <div className="product-banner-short-descr">
                    {datas.right_text}
                </div>
            </div>
            <div className="product-banner-mini">
                <img
                    src={resolveImg(datas.mini)}
                    alt="product-banner-mini"
                />
            </div>
            <div className="product-banner-mask"></div>
        </div>
    );
};

interface ProductBanner_Interface {
    datas: InmodePanel_Base_Banner_Interface;
};

export default ProductBanner;