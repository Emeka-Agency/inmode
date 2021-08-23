import React from "react";
import { useImages } from './contexts/images-provider';

const SellingNew = ({ datas = {} }) => {
    
    if(datas == null || datas.length === 0) {
        return <></>;
    }

    const images = useImages();

    return (
        <div className="selling-new transition">
            <div className="selling-details-img transition">
                <img
                    // src={datas.picture && datas.picture.childImageSharp.fluid.srcWebp}
                    src={images.getOne('nextImage').childImageSharp.fluid.srcWebp}
                    srcSet={images.getOne('nextImage').childImageSharp.fluid.srcSetWebp}
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

SellingNew.propTypes = {

};

SellingNew.defaultProps = {

};

export default SellingNew;