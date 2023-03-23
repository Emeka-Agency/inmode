import React from "react"
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Base_Banner_Interface } from "../interfaces";

const ProductBanner = ({ datas }:ProductBanner_Interface) => {

    // TODO récupérer images et vidéos pour chaque produit
    return (
        <div className="product-banner transition">
            <div className="top-transition"></div>
            <div className="product-banner-media">
                <video
                    playsInline={false} 
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    poster={datas.left_img && datas.left_img.localFile.childImageSharp?.fluid.srcWebp}
                    height={380}
                >
                    <source
                        src={datas.left_video}
                        type="video/mp4"
                    />
                    <track src="" kind="subtitles" srcLang="en" label="English"></track>
                </video>
            </div>
            <div className="product-banner-details">
                <img
                    className="product-banner-logo"
                    src={resolveImg(datas.right_img)}
                    alt="bodytite-logo-text"
                />
                <div className="product-banner-short-descr">
                    {datas.right_text}
                </div>
            </div>
            <div className="product-banner-mini">
                <img
                    src={resolveImg(datas.mini)}
                    alt="product-banner-mini"
                />
            </div>
            <div className="product-banner-mask"></div>
        </div>
    );
}

interface ProductBanner_Interface {
    datas: InmodePanel_Base_Banner_Interface;
};

export default ProductBanner;