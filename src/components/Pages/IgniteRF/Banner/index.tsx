import React from "react";

import "./index.css";
import { useImages } from "../../../contexts/images-provider";

import ProductBanner from "../../../product/banner";

const IgniteRFBanner = ({}:IgniteRFBanner) => {

    const images = useImages();

    const banner = {
        left_img: images.get_one("IgniteRFBannerLogo"),
        // right_img: {localFile: images.get_one('IgniteRFBannerRight')},
        right_img: {localFile: images.get_one('IgniteRFLogoRight')},
        right_text: "Remodelage mini-invasif du visage et du corps",
        // mini: {localFile: images.get_one('IgniteRFBannerRight')}
        mini: {localFile: images.get_one('IgniteRFLogoRight')},
        video_start: 10,
        video_stop: 18
    };

    return (
        <ProductBanner datas={banner} name="IgniteRF"/>
    );
};

interface IgniteRFBanner {

};

export default IgniteRFBanner;