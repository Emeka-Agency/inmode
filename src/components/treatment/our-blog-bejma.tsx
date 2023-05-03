import React from "react";
import { useImages } from "../contexts/images-provider";
import Video from "../Video";

import "./our-blog-bejma.css";

const OurBlogBejma = (datas:OurBlogBejma) => {

    const images = useImages();

    return (
        <div id="our-blog-bejma">
            <Video
                video={{
                    url: "https://www.youtube.com/watch?v=QDWqcDwJm_c",
                    poster: images.resolve_img('womenBejmaPoster'),
                    poster_link: "external",
                    poster_ratio: images.get_ratio('womenBejmaPoster')
                }}
            />
            <a id="our-blog-bejma-link" title="Book a demo" href="https://drbejma.com/break-the-taboo-lets-talk-womens-menopause-urinery-health-concerns">See our Women Blog</a>
        </div>
    );
};

interface OurBlogBejma {

};

export default OurBlogBejma;