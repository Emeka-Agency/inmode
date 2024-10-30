import React from "react";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Addon_Interface } from "../interfaces";
import { useImages } from "../contexts/images-provider";

const AddonBanner = ({ datas, name }:AddonBanner) => {
    
    if(!datas) {
        return <></>;
    }

    const images = useImages();

    const specialBandeau = (__name?:string) => {
        if(typeof __name != "string") {return <></>;}

        if(__name == "Morpheus8") {
            return <img src={images.resolve_img('BannerAddonMorpheus8')} srcSet={images.resolve_img_set('BannerAddonMorpheus8')} style={{width:'90%', height: 'auto', position: 'relative', zIndex: 1, margin: '64px 5%'}} />;
        }

        return <></>;
    }

    return (
        <>
            <div className="addon-banner">
                <div className="top-transition"></div>
                <div className="addon-banner-media">
                    <img
                        src={resolveImg(datas.left_img)}
                        srcSet={resolveImgSet(datas.left_img)}
                        alt="addon-banner"
                    />
                </div>
                <div className="addon-banner-details">
                    <img
                        className="addon-banner-logo"
                        src={resolveImg(datas.right_img)}
                        alt="addon-logo-text"
                    />
                    <div className="addon-banner-short-descr">{datas.right_text}</div>
                </div>
                <div className="addon-banner-mini">
                    <img
                        src={resolveImg(datas.mini)}
                        alt="addon-banner-mini"
                    />
                </div>
                <div className="addon-banner-mask"></div>
            </div>
            {specialBandeau(name)}
        </>
    );
};

interface AddonBanner {
    datas: InmodePanel_Addon_Interface["Banner"];
    name?: string;
};

export default AddonBanner;