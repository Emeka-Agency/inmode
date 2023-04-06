import { GatsbyImage_Interface } from "../components/interfaces";
import { selectOne, oneByTag, getById } from "./selectors";
import { resolveImg } from "./tools";

export const resolve_video_click = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if(e.currentTarget.id === "video-iframe" || e.currentTarget.classList.contains('close-pic')) {
      oneByTag('main')?.style.removeProperty('z-index');
      getById('video-iframe')?.classList.remove('opened');
      e.currentTarget.innerHTML = "";
      selectOne('header')?.classList.remove('video-opened');
      selectOne('.header-mini-menu')?.classList.remove('video-opened');
    }
};

export const openVideo = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, url:string, img?: GatsbyImage_Interface | {localfile: GatsbyImage_Interface}) => {
    e.preventDefault();
    if(url.includes('youtube')) {
      url = url.replace('watch?v=', 'embed/') + '?autoplay=1&amp;autohide=1&amp;fs=1&amp;rel=0&amp;hd=1&amp;wmode=transparent&amp;enablejsapi=1&amp;html5=1';
    }
    else if(url.includes('vimeo')) {
      url = url.replace('https://vimeo.com/', '//player.vimeo.com/video/') + '?autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1';
    }
    selectOne('header')?.classList.add('video-opened');
    selectOne('.header-mini-menu')?.classList.add('video-opened');
    oneByTag('main')?.style.setProperty('z-index', '4');
    getById('video-iframe')?.classList.add('opened');
    let iframe = '';
    iframe += '<img class="close-pic" src=' + resolveImg(img) + ' onclick="resolve_video_click(e)"/>';
    iframe += '<iframe ';
    iframe += 'allowfullscreen="allowfullscreen" ';
    iframe += 'allow="autoplay; fullscreen" ';
    iframe += 'src="' + url +'" ';
    iframe += 'scrolling="no"';
    iframe += '></iframe>';
    let _temp = getById('video-iframe');
    if(_temp instanceof Element) {_temp.innerHTML = iframe;}
};

export const resolveVideoClick = (e:React.MouseEvent<HTMLDivElement, MouseEvent>, url:string) => {
    openVideo(e, url);
};