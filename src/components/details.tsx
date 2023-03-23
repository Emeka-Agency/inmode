import React from "react";
import RequestInformation from "./RequestInformation";
import { useImages } from './contexts/images-provider';
import { GatsbyImage_Interface, InmodePanel_Base_SectionTitreText_Interface, InmodePanel_Base_Texte_Interface, InmodePanel_Generic_WhatIs_Interface } from "./interfaces";
import { resolveImg, resolveImgSet } from "../functions/tools";

const GenericDetails = ({ datas }:GenericDetails) => {

    const images = useImages();

    return (
        <div id="what-is" className="details">
            <div className="what-is transition">
                <div className="details-img transition">
                    <img
                        src={resolveImg(datas.what_is?.picture)}
                        srcSet={resolveImgSet(datas.what_is?.picture)}
                        alt="detail-main-pic"
                    />
                </div>
                {(datas.what_is?.TitleText ?? []).map((section:InmodePanel_Base_SectionTitreText_Interface, key:number) => {
                    return (
                        <div key={key}>
                            <div className="title">
                                {section.title}
                            </div>
                            <p className="text">
                                {section.text}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div id={datas.anchor_key || "list"}></div>
            <div className="text-list transition">
                <div className="title">
                    {datas.list_title}
                </div>
                {datas.list && datas.list.map((elem, key) => {
                    return (
                        <div key={key} className="list-elem">
                            {datas.list_icon && <img
                                src={images.resolve_img('keyBenefitIcon')}
                                alt={`elem-${key}`}
                                className="before-text"
                            />}
                            {!datas.list_icon && <span className="before-text">&bull;</span>}
                            <div className="text">{elem.texte}</div>
                        </div>
                    );
                })}
            </div>
            <RequestInformation/>
        </div>
    );
}

interface GenericDetails {
    datas: {
        what_is?: InmodePanel_Generic_WhatIs_Interface;
        anchor_key?: string;
        list_title?: string;
        list?: InmodePanel_Base_Texte_Interface[];
        list_icon: GatsbyImage_Interface|null;
    }
}

export default GenericDetails;