import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Carousel from "../Carousel";

import { FlickityOptions_Interface, InmodePanel_AboutUs_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";

const Staff = ({ from = "" }:Staff) => {

    const [datas]:[InmodePanel_AboutUs_Interface, React.Dispatch<InmodePanel_AboutUs_Interface>] = React.useState(useStaticQuery(graphql`
        {
            strapiAboutUs {
                staff {
                    picture {
                        caption
                        url
                        localFile {
                            absolutePath
                            childImageSharp {
                                fluid {
                                srcWebp
                                srcSetWebp
                                }
                            }
                            publicURL
                            url
                        }
                        width
                        height
                    }
                    name
                    position
                    short_descr
                }
            }
        }
    `).strapiAboutUs);

    const [flickityOptions]:[FlickityOptions_Interface, React.Dispatch<any>] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
    });
    
    return (
        <div className={`staff${from ? ` ${from}` : ''}`}>
            <div className="container-1660">
                <Carousel
                    id={`carousel-${from}`}
                    options={flickityOptions}
                    classList={'slides-main transition carousel-staff'}
                >
                    {datas.staff && datas.staff.map((slide, key) => {
                        return (
                            <div
                                key={key}
                                className="elem"
                            >
                                <img
                                    className="user-select-none"
                                    src={resolveImg(slide.picture)}
                                    alt={`about-us-staff-${key}`}
                                />
                                <div className="name user-select-none">
                                    {slide.name}
                                </div>
                                <div className="position user-select-none">
                                    {slide.position}
                                </div>
                                <div className="descr user-select-none">
                                    {slide.short_descr}
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    );
};

interface Staff {
    from?: string;
};

export default Staff;