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
            <div id="our-blog-bejma-link">
                <a href="https://drbejma.com/break-the-taboo-lets-talk-womens-menopause-urinery-health-concerns" target="_blank">
                    See our Women Blog
                </a>
            </div>
        </div>
    );
};

interface OurBlogBejma {

};

export default OurBlogBejma;