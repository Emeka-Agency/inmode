import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { openModale, pressMedia } from "../../functions/modale";
import { InmodePanel_PressMedia_Interface, PressMedia_Interface } from "../interfaces";

import './index.css';

const PressMedia = ({datas, prop_key, openCarousel}:PressMediaParams) => {

    if(!datas) {
        return <></>;
    }

    return (
        <div className="press-media">
            {
                datas.Picture
                &&
                <div className="press-media-picture-div">
                    <img
                        className="press-media-picture-img"
                        src={datas.Picture && datas.Picture.localFile.childImageSharp.fluid.srcWebp}
                        srcSet={datas.Picture && datas.Picture.localFile.childImageSharp.fluid.srcSetWebp}
                        onClick={(e) => openCarousel(e, prop_key)}
                    />
                </div>
            }
            <div className="press-media-text-zone">
                {datas.URL && <a className="zone-link" href={datas.URL} target="_blank"></a>}
                <div className="press-media-down-part custom-scrollbar">
                    {
                        datas.Short
                        &&
                        <div
                            className="press-media-short"
                        >
                            {datas.Short.substring(0, 30)}
                            {datas.Short.length > 30 ? '...' : ''}
                        </div>
                    }
                    {
                        datas.Description
                        &&
                        <div
                            className="press-media-description"
                        >
                            {datas.Description.substring(0, 70)}
                            {datas.Description.length > 70 ? '...' : ''}
                        </div>
                    }
                    {
                        datas.URL ? 
                        <a className="press-media-url" href={datas.URL} target="_blank">
                            Read more
                        </a>
                        :
                        <div className="press-media-url"></div>
                    }
                </div>
            </div>
        </div>
    );
};

interface PressMediaParams {
    datas: InmodePanel_PressMedia_Interface;
    prop_key: number;
    openCarousel(e:React.MouseEvent<HTMLDivElement, MouseEvent>, index:number):void;
};

export default PressMedia;