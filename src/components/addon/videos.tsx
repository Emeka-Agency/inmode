import React from "react";
import Carousel from "../Carousel";
import Video from "../Video";
import { useImages } from '../contexts/images-provider';
import { InmodePanel_Addon_Interface } from "../interfaces";
import NoPicture from "../NoPic/no-picture";
import Sensible from "../NoPic/sensible";

const AddonVideos = ({ videos = [], title = "", name = "", sensible = false}:AddonVideos) => {

  const images = useImages();

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: true,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
        draggable: true,
    });

    return (
        <div className="videos-slide">
          <div className="title">
            {title}
          </div>
          <div className={`videos-container${videos.length < 3 ? ' few' : ''}`}>
            {videos.length == 0 ?
              sensible ?
                <Sensible from="addon-videos"/>
                :
                <NoPicture from ="addon-videos"/>
              :
              videos.length < 3 ?
                videos.map((video, key) => <Video few={true} video={{...video, alt: `addon-videos-${key}`}} key={key}/>)
                :
                <Carousel
                    id={`carousel-videos-${name}`}
                    options={flickityOptions}
                    classList={'carousel-videos transition'}
                >
                  {/* {[...(videos), ...(videos)].map((video, index) => { */}
                  {videos.map((video, key) => <Video few={false} video={{...video, alt: `addon-videos-${key}`}} key={key}/>)
                  }
                </Carousel>
            }
          </div>
        </div>
    );
}

interface AddonVideos {
  videos: InmodePanel_Addon_Interface["Videos"];
  title: InmodePanel_Addon_Interface["Name"];
  name: string;
  sensible: boolean;
}

export default AddonVideos;