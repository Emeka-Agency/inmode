import React from "react";
import { useImages } from './contexts/images-provider';

const SellingArgs = ({ datas }) => {

    const images = useImages();
    
    if(!datas || datas.length === 0) {
        return false;
    }

    return (
        <div id="selling" className="selling-args">
            <div className="title">{datas.SectionTitle}</div>
            {datas.Arg.map((arg, key) => {
                return (
                    <div key={key} className="key">
                        {/* TODO single type */}
                        <img
                            src={images.getOne('keyBenefitIcon').childImageSharp.fluid.srcWebp}
                            alt="key_benefit"
                        />
                        <div className="text">{arg.texte}</div>
                    </div>
                );
            })}
        </div>
    );
}

SellingArgs.propTypes = {

};

SellingArgs.defaultProps = {

}

export default SellingArgs;