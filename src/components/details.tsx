import React from "react";
import RequestInformation from "./RequestInformation";
import { useImages } from './contexts/images-provider';
import { InmodePanel_Base_SectionTitreText_Interface, InmodePanel_Base_Texte_Interface, InmodePanel_Generic_WhatIs_Interface, InmodePanel_Product_Interface, InmodePanel_Product_WhatIsProduct_Interface } from "./interfaces";
import { resolveImg, resolveImgSet } from "../functions/tools";

const GenericDetails = ({ datas }:GenericDetails) => {

    const images = useImages();

    return (
        <div id="what-is" className={["details", datas.classes ?? []].join(' ')} style={datas.style}>
            <div className="what-is transition">
                <div className="details-img transition">
                    <img
                        src={resolveImg(datas.what_is.picture)}
                        srcSet={resolveImgSet(datas.what_is.picture)}
                        alt="detail-main-pic"
                    />
                </div>
                {(datas.what_is.TitleText ?? []).map((section:InmodePanel_Base_SectionTitreText_Interface, key:number) => {
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
                {!datas.benefits ? <>
                    <div className="title">
                        {datas.list_title}
                    </div>
                    {datas.list && datas.list.map((elem, key) => {
                        return (
                            <div key={key} className="list-elem">
                                {datas.list_icon && <img
                                    src={images.resolve_img('keyBenefitIcon') || images.resolve_img('keyBenefitIcon')}
                                    alt={`elem-${key}`}
                                    className="before-text"
                                />}
                                {!datas.list_icon && <span className="before-text">&bull;</span>}
                                <div className="text">{elem.texte}</div>
                            </div>
                        );
                    })}
                </> : datas.benefits}
            </div>
            <RequestInformation/>
        </div>
    );
}

interface GenericDetails {
    datas :{
        classes: string[];
        style: React.CSSProperties;
        what_is: InmodePanel_Generic_WhatIs_Interface;
        before_keys: string;
        list: InmodePanel_Base_Texte_Interface[];
        list_title: string;
        list_icon: string;
        anchor_key: string;
        benefits: React.ReactNode;
    };
}

export default GenericDetails;