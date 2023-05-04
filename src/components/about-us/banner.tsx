import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import { InmodePanel_AboutUs_Interface } from "../interfaces";
import { resolveImageRatio, resolveImg, resolveImgSet } from "../../functions/tools";

const Banner = ({ from = "" }:Banner) => {

    const [datas]:[InmodePanel_AboutUs_Interface, React.Dispatch<InmodePanel_AboutUs_Interface>] = React.useState(useStaticQuery(graphql`
        {
            strapiAboutUs {
                banner {
                    caption
                    url
                    localFile {
                        absolutePath
                        childImageSharp {
                            fluid {
                                srcWebp
                                srcSetWebp
                                aspectRatio
                            }
                        }
                        publicURL
                        url
                    }
                }
            }
        }
    `).strapiAboutUs);

    return (
        <div className={`user-select-none full-img-banner${from ? ` ${from}` : ''}`}>
            <img
                className="user-select-none"
                src={resolveImg(datas.banner)}
                srcSet={resolveImgSet(datas.banner)}
                alt='about-us-banner'
                style={{aspectRatio: resolveImageRatio(datas?.banner?.localFile)}}
            />
        </div>
    );
};

interface Banner {
    from?: string;
};

export default Banner;