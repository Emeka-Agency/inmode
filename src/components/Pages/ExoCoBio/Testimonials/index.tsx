import React from "react";
import { Link } from "gatsby";

import './index.css';
import { useImages } from "../../../contexts/images-provider";

const ExoCoBioTestimonials = ({  }:ExoCoBioTestimonials) => {

    const videos = [
        {url: "https://www.youtube.com/watch?v=xPGMcyZh05M", poster: "https://img.youtube.com/vi/xPGMcyZh05M/0.jpg"},
        {url: "https://www.youtube.com/watch?v=_g8wzA8yuoc", poster: "https://img.youtube.com/vi/_g8wzA8yuoc/0.jpg"},
        {url: "https://www.youtube.com/watch?v=pX-KSOsDn3g", poster: "https://img.youtube.com/vi/pX-KSOsDn3g/0.jpg"},
    ];

    const images = useImages();
    const [index, setIndex]:[number, React.Dispatch<number>] = React.useState(0);

    ///////////////////////////////

    const [isDragging, setIsDragging] = React.useState(false);
    const [canPlay, setCanPlay] = React.useState(true);
    const [startPosition, setStartPosition] = React.useState(0);
    const [translate, setTranslate] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleDragStart = (e:any) => {
        console.log('handleDragStart');
        setIsDragging(true);
        const initialPosition = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        setStartPosition(initialPosition);
    };

    const handleDragMove = (e:any) => {
        console.log('handleDragMove');
        if (!isDragging) return;
        setCanPlay(false);
        const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const diff = currentPosition - startPosition;
        setTranslate(diff);
    };

    const handleDragEnd = () => {
        console.log('handleDragEnd');
        setIsDragging(false);
        setTimeout(() => setCanPlay(true), 500);
        if (Math.abs(translate) > 50) {
            if (translate < 0 && index < videos.length - 1) {
                exocobio_next_video();
            } else if (translate > 0 && index > 0) {
                exocobio_previous_video();
            }
        }
        setTranslate(0);
    };

    ///////////////////////////////
    
    function is_first(i:number) {return i == 0;}
    function is_last(i:number) {return i == videos.length - 1;}
    
    function exocobio_previous_video() {
        if(is_first(index)) {return false;}
        exocobio_video_update_index(index - 1);
    }
    
    function exocobio_next_video() {
        if(is_last(index)) {return false;}
        exocobio_video_update_index(index + 1);
    }
    
    function exocobio_video_update_index(i:number) {
        is_first(i) ? previous_disabled(true) : previous_disabled(false);
        is_last(i) ? next_disabled(true) : next_disabled(false);
        exocovio_videos_positions(i);
        exocobio_dots_active(i);
        setIndex(i);
    }
    
    function previous_disabled(val:boolean) {
        ((el) => {
            if(el instanceof HTMLButtonElement) {
                el.disabled = val;
            }
        })(containerRef.current?.parentElement?.querySelector('#exocobio-videos-previous'));
    }
    
    function next_disabled(val:boolean) {
        ((el) => {
            if(el instanceof HTMLButtonElement) {
                el.disabled = val;
            }
        })(containerRef.current?.parentElement?.querySelector('#exocobio-videos-next'));
    }
    
    function exocovio_videos_positions(i:number) {
        Array.from(containerRef.current?.parentElement?.querySelectorAll('.page_exocobio-testimonials-videos-video') || [])
        .forEach((video, vi) => {
            if(video instanceof HTMLDivElement) {
                video.classList[vi == i ? 'remove' : 'add']('slow_fadeout');
                video.style.transform = `translateX(calc(-${i * 100}% + ${translate}px - ${i == vi ? 0 : (i - vi) * 54}px))`;
            }
        });
    }

    function exocobio_dots_active(i:number) {
        Array.from(containerRef.current?.parentElement?.nextElementSibling?.querySelectorAll('#exocobio-videos-dots li') || [])
        .forEach((dot, doti) => {
            if(dot instanceof HTMLLIElement) {
                dot.classList[doti == i ? 'add' : 'remove']('current');
            }
        });
    }

    function exocobio_init_dots() {
        Array.from(containerRef.current?.parentElement?.nextElementSibling?.querySelectorAll('#exocobio-videos-dots li') || [])
        .forEach((dot, doti) => {
            if(dot instanceof HTMLLIElement) {
                dot.addEventListener('click', () => 
                    exocobio_video_update_index(
                        ((i) => 
                            typeof i == "number" ? i : 0
                        )(parseInt(dot.getAttribute('data-index') || ""))
                    )
                );
            }
        });
    }

    React.useEffect(() => {
        exocobio_video_update_index(0);
        exocobio_init_dots();
    }, []);

    React.useEffect(() => {
        document.getElementById("page_exocobio-testimonials-videos")?.classList[canPlay || isDragging == false ? 'remove' : 'add']('dragging');
    }, [canPlay, isDragging]);

    React.useEffect(() => {
        Array.from(containerRef.current?.parentElement?.querySelectorAll('.page_exocobio-testimonials-videos-video video') || [])
        .forEach((video, vi) => {
            if(video instanceof HTMLVideoElement && vi != index) {
                video.pause();
            }
        });
    }, [index]);

    return (
        <div id="page_exocobio-testimonials">
            <h2>TÉMOIGNAGES</h2>
            <div id="page_exocobio-testimonials-carrousel">
                <div id="page_exocobio-testimonials-videos_container">
                    <div
                        id="page_exocobio-testimonials-videos"
                        ref={containerRef}
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                    >
                        <button id="exocobio-videos-previous" onClick={() => exocobio_previous_video()}>
                            <svg fill="#fff" viewBox="0 0 100 100">
                                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path>
                            </svg>
                        </button>
                        {
                            videos.map((video, i) => {
                                return <div
                                    key={"page_exocobio-testimonials-videos-video-" + i}
                                    className="page_exocobio-testimonials-videos-video"
                                    style={{ transform: `translateX(calc(-${index * 100}% + ${translate}px - ${index == i ? 0 : (index - i) * 54}px))` }}
                                >
                                    <video
                                        controls={true}
                                        onClick={(e) => !canPlay && e.preventDefault()}
                                        poster={video.poster}
                                        onPlaying={(e) => e.currentTarget.classList.add('playing')}
                                        onPause={(e) => e.currentTarget.classList.remove('playing')}
                                    >
                                        <source src={video.url} type="video/mp4" />
                                    </video>
                                    <img src={video.poster} onClick={(e) => {
                                        e.preventDefault();
                                        canPlay && e.currentTarget.parentElement?.querySelector('video')?.play();
                                        canPlay && e.currentTarget.parentElement?.querySelector('video')?.classList.add('playing');
                                    }} draggable={false}/>
                                </div>
                            })
                        }
                        <button id="exocobio-videos-next" onClick={() => exocobio_next_video()}>
                            <svg fill="#fff" viewBox="0 0 100 100">
                                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) "></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <ul id="exocobio-videos-dots">{videos.map((_, i) => (<li data-index={i}></li>))}</ul>
            </div>
        </div>
    );
};

interface ExoCoBioTestimonials {

};

export default ExoCoBioTestimonials;
