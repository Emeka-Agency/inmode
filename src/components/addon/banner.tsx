import React from "react";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Addon_Interface } from "../interfaces";

const AddonBanner = ({ datas }:AddonBanner) => {
    
    if(!datas) {
        return <></>;
    }

    return (
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
    );
};

interface AddonBanner {
    datas: InmodePanel_Addon_Interface["Banner"];
};

export default AddonBanner;