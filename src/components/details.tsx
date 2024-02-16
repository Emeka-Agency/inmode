import React from "react";
import RequestInformation from "./RequestInformation";
import { useImages } from './contexts/images-provider';
import { GatsbyImage_Interface, InmodePanel_Base_SectionTitreText_Interface, InmodePanel_Base_Texte_Interface, InmodePanel_Generic_WhatIs_Interface } from "./interfaces";
import { resolveImg, resolveImgSet } from "../functions/tools";

const GenericDetails = ({ datas }:GenericDetails) => {

    const images = useImages();
    
    const prepare_str = (descr:string) => {
        return <div dangerouslySetInnerHTML={{ __html: descr
            .replace(/(\[P\])/g, '<p>').replace(/(\[\/P\])/g, '</p>')
            .replace(/(\[B\])/g, '<b>').replace(/(\[\/B\])/g, '</b>')
            .replace(/(\[I\])/g, '<i>').replace(/(\[\/I\])/g, '</i>')
            .replace(/(\[BR\])/g, '<br />')
            .replace(/(\[UL\])/g, '<ul>').replace(/(\[\/UL\])/g, '</ul>')
            .replace(/(\[OL\])/g, '<ol>').replace(/(\[\/OL\])/g, '</ol>')
            .replace(/(\[LI\])/g, '<li>').replace(/(\[\/LI\])/g, '</li>')
            .replace(/(\[H1\])/g, '<h1>').replace(/(\[\/H1\])/g, '</h1>')
            .replace(/(\[H2\])/g, '<h2>').replace(/(\[\/H2\])/g, '</h2>')
            .replace(/(\[H3\])/g, '<h3>').replace(/(\[\/H3\])/g, '</h3>')
            .replace(/(\[H4\])/g, '<h4>').replace(/(\[\/H4\])/g, '</h4>')
            .replace(/(\[H5\])/g, '<h5>').replace(/(\[\/H5\])/g, '</h5>')
            .replace(/(\[H6\])/g, '<h6>').replace(/(\[\/H6\])/g, '</h6>')
        }}></div>;
    }

    return (
        <div id="what-is" className="details">
            <div
                className="details-img transition user-select-none background-image"
            >
                <img
                    src={resolveImg(datas.what_is?.picture)}
                    alt="details-img"
                    style={{
                        maxHeight: ['formav', 'diolazexl', 'vasculaze', 'lumecca'].indexOf((datas.name ?? "").toLowerCase()) >= 0 ? '450px' : 'unset',
                        margin: '0 auto',
                        display: 'block'
                    }}
                />
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
                                <div className="text user-select-none">{prepare_str(elem.texte)}</div>
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
        name?: string;
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