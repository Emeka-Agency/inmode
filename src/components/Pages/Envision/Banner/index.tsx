import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

import ProductBanner from "../../../product/banner";

const EnvisionBanner = ({}:EnvisionBanner) => {

    const images = useImages();

    const banner = {
        left_video: "https://inmodemd.fr/public/vids/envision_banner_cut.mp4",
        // right_img: {localFile: images.get_one('EnvisionBannerRight')},
        right_img: {localFile: images.get_one('EnvisionLogoRight')},
        right_text: "Traitements de précision des tissus oculaires",
        // mini: {localFile: images.get_one('EnvisionBannerRight')}
        mini: {localFile: images.get_one('EnvisionLogoRight')},
        video_start: 10,
        video_stop: 18
    };

    return (
        <ProductBanner datas={banner}/>
    );
};

interface EnvisionBanner {

};

export default EnvisionBanner;