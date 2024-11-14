import React from "react";
import RequestInformation from "./RequestInformation";
import { useImages } from './contexts/images-provider';
import { GatsbyImage_Interface, InmodePanel_Base_SectionTitreText_Interface, InmodePanel_Base_Texte_Interface, InmodePanel_Generic_WhatIs_Interface } from "./interfaces";
import { resolveImg, resolveImgSet } from "../functions/tools";

const GenericDetails = ({ datas }:GenericDetails) => {

    const images = useImages();

    const special = (title?: string) => {
        if((title ?? "").toLowerCase() == "define") {return true;}
        if((title ?? "").toLowerCase() == "envision") {return true;}
        return false;
    }

    const special_icon = (title?: string) => {
        if(!special(title)) {return false;}
        if((title ?? "").toLowerCase() == "define") {
            return <img
                src={images.resolve_img("keyBenefitDefine")}
                srcSet={images.resolve_img_set("keyBenefitDefine")}
                alt={`elem-define`}
                className="before-text user-select-none"
            />
        }
        if((title ?? "").toLowerCase() == "envision") {
            return <img
                src={images.resolve_img("keyBenefitEnvision")}
                srcSet={images.resolve_img_set("keyBenefitEnvision")}
                alt={`elem-envision`}
                className="before-text user-select-none"
            />
        }
        return false;
    }
    
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

    const get_variant = (variation?:string, machine?:string) => {
        if(variation == "dusty-rose") {return 'keyBenefitIconRose';}
        if(machine == "IgniteRF") {return 'keyBenefitIgniteRF2';}
        return 'keyBenefitIconTeal';
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
                                {!special(datas.name) && datas.list_icon && <img
                                    src={images.resolve_img(get_variant(datas.variant, datas.name))}
                                    alt={`elem-${key}`}
                                    className="before-text user-select-none"
                                />}
                                {special(datas.name) && special_icon(datas.name)}
                                {!datas.list_icon && <span className="before-text user-select-none">&bull;</span>}
                                <div className="text user-select-none">{prepare_str(elem.texte || "")}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {["EmpowerRF", "Optimas Max"].indexOf(datas.name || "") > -1 ? <></> : <RequestInformation variant={datas.variant}/>}
            {datas.name != "Define" ? <></> :
            <div id="page-define-whatis-video">
                <iframe src="https://inmodemd.fr/public/vids/define_presentation.mp4" title="Define par InMode - Remodelage du visage" loading="lazy"> </iframe>
            </div>}
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