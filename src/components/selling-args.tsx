import React from "react";
import { useImages } from './contexts/images-provider';
import { InmodePanel_Base_Texte_Interface, InmodePanel_Generic_SellingArgs_Interface } from "./interfaces";

const SellingArgs = ({ datas }:SellingArgs) => {

    const images = useImages();
    
    if(datas == null || datas.length === 0) {
        return <></>;
    }

    return (
        <div id="selling" className="selling-args">
            <div className="title">{datas.SectionTitle}</div>
            {datas.Arg && datas.Arg.map((arg:InmodePanel_Base_Texte_Interface, key:number) => {
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

interface SellingArgs {
    datas: InmodePanel_Generic_SellingArgs_Interface;
}

export default SellingArgs;