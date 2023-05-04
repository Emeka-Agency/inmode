import React from "react";
import { useImages } from './contexts/images-provider';
import { InmodePanel_Generic_SellingArgs_Interface } from "./interfaces";

const SellingArgs = ({ datas }:SellingArgs) => {

    const images = useImages();
    
    if(!datas || (datas instanceof Object && Object.keys(datas).length === 0)) {
        return <></>;
    }

    return (
        <div id="selling" className="selling-args">
            <div className="title">{datas.SectionTitle}</div>
            {(datas?.Arg || []).map((arg, key) => {
                return (
                    <div key={key} className="key">
                        {/* TODO single type */}
                        <img
                            src={images.resolve_img('keyBenefitIcon')}
                            alt="key_benefit"
                        />
                        <div className="text">{arg.texte}</div>
                    </div>
                );
            })}
        </div>
    );
};

interface SellingArgs {
    datas?: InmodePanel_Generic_SellingArgs_Interface;
};

export default SellingArgs;