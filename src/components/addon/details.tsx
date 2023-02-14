import React from "react";
import RequestInformation from "../RequestInformation";
import { useImages } from '../contexts/images-provider';
import { InmodePanel_Addon_Interface } from "../interfaces";

const AddonDetails = ({ name = "", datas }:AddonDetails) => {

    const images = useImages();
    
    if(!datas) {
        return false;
    }
    else if(!datas.WhatIs && !datas.BeforesAfters) {
        return false;
    }
    else if(datas.WhatIs && datas.BeforesAfters && datas.BeforesAfters.length == 0) {
        return false;
    }

    return (
        <div className="addon-details">
            <div id="what-is" className="what-is transition">
                <div className="addon-details-img transition">
                    <img
                        src={datas.WhatIs && datas.WhatIs.picture && datas.WhatIs.picture.localFile.childImageSharp?.fluid.srcWebp}
                    />
                </div>
                    {datas.WhatIs && datas.WhatIs.TitleText && datas.WhatIs.TitleText.map((section, key) => {
                        return (
                            <div key={key}>
                                <div className="title">
                                    {section.title}
                                </div>
                                <p className="text">
                                    {section.text}
                                </p>
                            </div>
                        )
                    })}
            </div>
            <div className="key-benefits transition">
                <div className="title">
                    {'key benefits:'}
                </div>key_benefit
                {datas.BeforesAfters && datas.BeforesAfters.map((benefit, key:number) => {
                    return (
                        <div key={key} className="key">
                            <img
                                src={images.getOne('keyBenefitIcon').childImageSharp?.fluid.srcWebp}
                                alt="key_benefit"
                            />
                            <div className="text">{benefit.text}</div>
                        </div>
                    );
                })}
            </div>
            <RequestInformation/>
        </div>
    );
}

interface AddonDetails {
    name?: string;
    datas: InmodePanel_Addon_Interface;
}

export default AddonDetails;