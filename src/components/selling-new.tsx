import React from "react";
import { useImages } from './contexts/images-provider';
import { InmodePanel_Generic_SellingNewGeneration_Interface } from "./interfaces";

const SellingNew = ({ datas = {} }:SellingNew) => {
    
    if(datas == null || datas.length === 0) {
        return <></>;
    }

    const images = useImages();

    return (
        <div className="selling-new transition">
            <div className="selling-details-img transition">
                <img
                    // src={datas.picture && datas.picture.localFile.childImageSharp.fluid.srcWebp}
                    src={images.resolve_img('nextImage')}
                    srcSet={images.resolve_img('nextImage')}
                    alt="selling-new"
                />
            </div>
            <div className="selling-details">
                <div className="title">
                    {datas.title}
                </div>
                <p className="text">
                    {datas.text}
                </p>
            </div>
        </div>
    );
}

interface SellingNew {
    datas: InmodePanel_Generic_SellingNewGeneration_Interface;
}

export default SellingNew;