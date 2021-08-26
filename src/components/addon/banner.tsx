import React from "react";
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
                    src={datas.left_img && datas.left_img.localFile.childImageSharp.fluid.srcWebp}
                    srcSet={datas.left_img && datas.left_img.localFile.childImageSharp.fluid.srcSetWebp || ""}
                    alt="addon-banner"
                />
            </div>
            <div className="addon-banner-details">
                <img
                    className="addon-banner-logo"
                    src={datas.right_img && datas.right_img.localFile.childImageSharp.fluid.srcWebp}
                    alt="addon-logo-text"
                />
                <div className="addon-banner-short-descr">{datas.right_text}</div>
            </div>
            <div className="addon-banner-mini">
                <img
                    src={datas.mini && datas.mini.localFile.childImageSharp.fluid.srcWebp}
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