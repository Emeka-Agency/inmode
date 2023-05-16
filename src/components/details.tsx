import React from "react";
import RequestInformation from "./RequestInformation";
import { useImages } from './contexts/images-provider';
import { GatsbyImage_Interface, InmodePanel_Base_SectionTitreText_Interface, InmodePanel_Base_Texte_Interface, InmodePanel_Generic_WhatIs_Interface } from "./interfaces";
import { resolveImg, resolveImgSet } from "../functions/tools";

const GenericDetails = ({ datas }:GenericDetails) => {

    const images = useImages();

    return (
        <div id="what-is" className="details">
            <div
                className="details-img transition user-select-none background-image"
                // style={{backgroundImage: `url(${resolveImg(datas.what_is?.picture)})`}}
            >
                <img src={resolveImg(datas.what_is?.picture)} alt="details-img" />
            </div>
            <div className="what-is-txts">
                <div className="what-is-main transition">
                    {(datas.what_is?.TitleText ?? []).map((section:InmodePanel_Base_SectionTitreText_Interface, key:number) => {
                        return (
                            <div key={key}>
                                <div className="title user-select-none">
                                    {section.title}
                                </div>
                                <p className="text user-select-none">
                                    {section.text}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div id={datas.anchor_key || "list"}></div>
                <div className="what-is-text-list transition">
                    <div className="title">
                        {datas.list_title}
                    </div>
                    {datas.list && datas.list.map((elem, key) => {
                        return (
                            <div key={key} className="list-elem">
                                {datas.list_icon && <img
                                    src={images.resolve_img(datas.variant == "dusty-rose" ? 'keyBenefitIconRose' : 'keyBenefitIconTeal')}
                                    alt={`elem-${key}`}
                                    className="before-text user-select-none"
                                />}
                                {!datas.list_icon && <span className="before-text user-select-none">&bull;</span>}
                                <div className="text user-select-none">{elem.texte}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <RequestInformation variant={datas.variant}/>
        </div>
    );
};

interface GenericDetails {
    datas: {
        what_is?: InmodePanel_Generic_WhatIs_Interface;
        before_keys?: string;
        anchor_key?: string;
        list_title?: string;
        list?: InmodePanel_Base_Texte_Interface[];
        list_icon: string|null;
        variant?: string;
    }
};

export default GenericDetails;