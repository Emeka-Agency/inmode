import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { InmodePanel_AboutUs_Interface } from "../interfaces";
import { resolveImg, resolveImgSet } from "../../functions/tools";

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
                src={resolveImg(datas.banner)}
                srcSet={resolveImgSet(datas.banner)}
                alt='about-us-banner'
            />
        </div>
    );
};

interface Banner {
    from?: string;
};

export default Banner;