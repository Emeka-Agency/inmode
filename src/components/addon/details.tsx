import React from "react";
import RequestInformation from "../RequestInformation";
import { useImages } from '../contexts/images-provider';
import { InmodePanel_Addon_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";

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
                        src={resolveImg(datas.WhatIs?.picture)}
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
                                src={images.resolve_img('keyBenefitIcon')}
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
};

interface AddonDetails {
    name?: string;
    datas: InmodePanel_Addon_Interface;
};

export default AddonDetails;