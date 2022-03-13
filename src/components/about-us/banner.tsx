import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { InmodePanel_AboutUs_Interface } from "../interfaces";

const Banner = ({ from = "" }:Banner) => {

    const [datas]:[InmodePanel_AboutUs_Interface, React.Dispatch<InmodePanel_AboutUs_Interface>] = React.useState(useStaticQuery(graphql`
        {
            strapiAboutUs {
                banner {
                    localFile {
                        childImageSharp {
                            fluid {
                                srcWebp
                                srcSetWebp
                            }
                        }
                    }
                }
            }
        }
    `).strapiAboutUs);

    return (
        <div className={`full-img-banner${from ? ` ${from}` : ''}`}>
            <img
                src={datas.banner ? datas.banner.localFile.childImageSharp.fluid.srcWebp : ""}
                srcSet={datas.banner ? datas.banner.localFile.childImageSharp.fluid.srcSetWebp : ""}
                alt='about-us-banner'
            />
        </div>
    );
};

interface Banner {
    from?: string;
};

export default Banner;