import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { InmodePanel_AboutUs_Interface } from '../interfaces';

const AboutUs = ({ from = "" }:AboutUs) => {

    const [datas]:[InmodePanel_AboutUs_Interface, React.Dispatch<InmodePanel_AboutUs_Interface>] = React.useState(useStaticQuery(graphql`
        {
            strapiAboutUs {
                about_video_url
                about_txt
            }
        }
    `).strapiAboutUs);

    return (
        <div className={`about${from ? ` ${from}` : ''}`}>
            <div className="container">
                <div className="title">About InMode</div>
                <div className="content">
                    <iframe
                        title="about-us"
                        src={datas.about_video_url}
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >
                        
                    </iframe>
                    <div className="txt">
                        {datas.about_txt}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface AboutUs {
    from?: string;
};

export default AboutUs;