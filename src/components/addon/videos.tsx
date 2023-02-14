import React from "react";
import { getById, selectOne, getOneByTag } from "../../functions/selectors";
import Carousel from "../Carousel";
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
    

    const resolve_click = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      if(e.currentTarget.id === "video-iframe" || e.currentTarget.classList.contains('close-pic')) {
        let _temp:any = getOneByTag('main');
        _temp && _temp.style.removeProperty('z-index');
        _temp = getById('video-iframe');
        _temp && _temp.classList.remove('opened');
        e.currentTarget.innerHTML = "";
        _temp = selectOne('header');
        _temp && _temp.classList.remove('video-opened');
        _temp = selectOne('.header-mini-menu');
        _temp && _temp.classList.remove('video-opened');
      }
    }

    const openVideo = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, url:string) => {
      e.preventDefault();
      if(url.includes('youtube')) {
        url = url.replace('watch?v=', 'embed/') + '?autoplay=1&amp;autohide=1&amp;fs=1&amp;rel=0&amp;hd=1&amp;wmode=transparent&amp;enablejsapi=1&amp;html5=1';
      }
      else if(url.includes('vimeo')) {
        url = url.replace('https://vimeo.com/', '//player.vimeo.com/video/') + '?autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1';
      }
      let _temp:any = selectOne('header');
      _temp && _temp.classList.add('video-opened');
      _temp = selectOne('.header-mini-menu');
      _temp && _temp.classList.add('video-opened');
      _temp = getOneByTag('main');
      _temp && _temp.style.setProperty('z-index', 4);
      _temp = getById('video-iframe');
      _temp && _temp.classList.add('opened');
      let iframe = '';
      iframe += '<img class="close-pic" src=' + images.getOne('closeWhiteIcon').publicURL + ' onclick="resolve_click(e)"/>';
      iframe += '<iframe ';
      iframe += 'allowfullscreen="allowfullscreen" ';
      iframe += 'allow="autoplay; fullscreen" ';
      iframe += 'src="' + url +'" ';
      iframe += 'scrolling="no"';
      iframe += '></iframe>';
      _temp = getById('video-iframe');
      if(_temp) {_temp.innerHTML = iframe;}
    }

    const resolveVideoClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, url:string) => {
      openVideo(e, url);
    }

    return (
        <div className="videos-slide">
          <div id="video-iframe" onClick={(e) => {resolve_click(e);}}></div>
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
                videos.map((video, key) => {
                  return (
                    <div
                      className=" few-videos poster video"
                      onMouseDown={(e) => {resolveVideoClick(e, video.url || '');}}
                      onMouseUp={(e) => {resolveVideoClick(e, video.url || '');}}
                      onClick={(e) => {resolveVideoClick(e, video.url || '');}}
                    >
                      <img
                        src={video.poster && video.poster.localFile.childImageSharp?.fluid.srcWebp}
                        alt={`addon-videos-${key}`}
                      />
                      <span className="video-bg"></span>
                      <span className="video-play-btn"></span>
                    </div>
                  );
                })
                :
                <Carousel
                    id={`carousel-videos-${name}`}
                    options={flickityOptions}
                    classList={'carousel-videos transition'}
                >
                  {/* {[...(videos), ...(videos)].map((video, index) => { */}
                  {videos.map((video, key) => {
                      return (
                        <div
                          className="poster video"
                          onMouseDown={(e) => {resolveVideoClick(e, video.url || '');}}
                          onMouseUp={(e) => {resolveVideoClick(e, video.url || '');}}
                          onClick={(e) => {resolveVideoClick(e, video.url || '');}}
                          key={key}
                        >
                          <img
                            src={video.poster && video.poster.localFile.childImageSharp?.fluid.srcWebp}
                            alt={`addon-videos-${key}`}
                          />
                          <span className="video-bg"></span>
                          <span className="video-play-btn"></span>
                        </div>
                      );
                    })
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