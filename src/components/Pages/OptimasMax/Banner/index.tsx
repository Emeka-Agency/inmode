import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

import ProductBanner from "../../../product/banner";

const OptimasMaxBanner = ({}:OptimasMaxBanner) => {

    const images = useImages();

    const banner = {
        left_video: "https://inmodemd.fr/public/vids/Optimas%20Max%20Final%20SQ_LR.mp4",
        right_img: {localFile: images.get_one('OptimasMax__BannerLogo')},
        right_text: "RF Fractionnée, IPL, Laser & traitements vasculaires",
        mini: {localFile: images.get_one('OptimasMax__BannerMini')},
    };

    return (
        <ProductBanner datas={banner} name="OptimasMax"/>
    );
};

interface OptimasMaxBanner {

};

export default OptimasMaxBanner;