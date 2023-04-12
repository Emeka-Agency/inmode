import { Link } from "gatsby";
import React from "react";
import Video from "../Video";

import "./video-testimonials.css";
import { getById } from "../../functions/selectors";
import { resolveOnClick } from "../../functions/resolve_mini_menu_opened";
import MenuSingleButton from "../menu/single-button";

const VideoTestimonials = (props:VideoTestimonials) => {

    const testimonials = [
        {
            name: "Dr Karim",
            type: "Practitioner",
            origin: "Morpheus8 workshop",
            url :"https://www.youtube.com/watch?v=3EADAqeaRik",
            poster: "https://i.ytimg.com/vi/3EADAqeaRik/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhfIGUoWDAP&rs=AOn4CLDSfHWVmVVQVT9SrqVEiOpQf3hVAQ"
        },
        {
            name: "Dr Ashana Guppa",
            type: "Pratictionner",
            origin: "Morpheus8 workshop",
            url :"https://www.youtube.com/watch?v=09fgqaayw2A",
            poster: "https://i.ytimg.com/vi/09fgqaayw2A/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIGUoZTAP&rs=AOn4CLBQ9RrVNqYbdrEAh1fI-kRrmCEutg"
        },
        {
            name: "Sara Cheeney",
            type: "Pure Perfection Clinic Director",
            origin: "InMode UK Symposium",
            url :"https://www.youtube.com/watch?v=Ss0A_Sjxa2w",
            poster: "https://i.ytimg.com/vi/Ss0A_Sjxa2w/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhjIGUoVzAP&rs=AOn4CLDTaFziA0j3bf5SfSeJKUyaiO1sAg"
        },
    ]

    return (
        <section className="video-testimonials">
            <div className="title">Customer testimonials</div>
            <div className="descr">Discover what our clients say about our products and events.</div>
            <div className="testimonials">
                {testimonials.map((testimonial, index_testimonial) => (
                    <div className="video-testimonial" key={index_testimonial}>
                        <Video className="testimonial-video" few={false} video={{url: testimonial.url, poster: testimonial.poster, poster_link: "external"}} key={null}/>
                        <div className="client">{[testimonial.name, testimonial.type].join(', ')}</div>
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

};