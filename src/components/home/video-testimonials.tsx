import { Link } from "gatsby";
import React from "react";
import Video from "../Video";

import "./video-testimonials.css";
import Carousel from "../Carousel";
import { FlickityOptions_Interface } from "../interfaces";

const VideoTestimonials = ({ vt_id = null, testimonials, from = "carousel" }:VideoTestimonials) => {

    if(!testimonials || testimonials.length == 0) {
        return <></>;
    }

    const [noTestimonials, setNoTestimonials]:[boolean, React.Dispatch<boolean>] = React.useState(false);

    const [current, setCurrent]:[number, React.Dispatch<number>] = React.useState(-1);
    const [flickityOptions, setFlickityOptions]:[FlickityOptions_Interface, React.Dispatch<FlickityOptions_Interface>] = React.useState({
        initialIndex: current === -1 ? 0 : current,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
        // autoPlay: false
    });

    React.useEffect(() => {

    }, [noTestimonials]);

    if(noTestimonials === true) {
        return <></>;
    }

    return (
        <section id={vt_id ?? null} className="video-testimonials">
            <div className="title">Customer testimonials</div>
            <div className="descr">Discover what our clients say about our products and events.</div>
            <div className="testimonials">
                {noTestimonials ? <h1 style={{fontSize: 24}}>No current video testimonials</h1> : testimonials.map((testimonial, index_testimonial) => (
                    <div className="video-testimonial" data-testimonial={index_testimonial + 1} key={index_testimonial}>
                        <img
                            style={{visibility: "hidden"}}
                            src={typeof testimonial.poster == "string" ? testimonial.poster : resolveImg(testimonial.poster)}
                            onLoad={function(e) {
                                if(typeof document == "undefined") {return false;}
                                let elem = document.querySelector(`.video-testimonials .testimonials .video-testimonial[data-testimonial="${index_testimonial + 1}"]`)
                                if(!(elem instanceof HTMLElement)) {return false;}
                                if((e.target.width ?? 0) <= 120) {
                                    elem.style.setProperty('display', 'none');
                                    if(Array.from(document.querySelectorAll(`.video-testimonials .testimonials .video-testimonial[data-testimonial][style]`)).length == testimonials.length) {
                                        setNoTestimonials(true);
                                    }
                                }
                                else {
                                    elem.style.removeProperty('display');
                                }
                            }}
                        />
                        <Video className="testimonial-video" few={false} video={{url: testimonial.url, poster: testimonial.poster, poster_link: "external"}} key={null}/>
                        <div className="client">{[testimonial.name, testimonial.type].join('')}</div>
                        <div className="origin">{testimonial.origin}</div>
                    </div>
                ))}
            </div>
            <Link id="book-a-demo" to="/contact" title="Book a demo">
                book a demo
            </Link>
        </section>
    );
};

export default VideoTestimonials;

interface VideoTestimonials {
    vt_id?: string;
    testimonials: {
        name: string;
        type: string;
        origin: string;
        url: string;
        poster: string;
    }[];
    from?: string;
};