import React from "react";
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Addon_Interface, InmodePanel_Addon_WhatTreat_Interface } from "../interfaces";
import RequestInformation from "../RequestInformation";
import { useWindowSize } from "../../functions/window-size";

const AddonWhatTreat = (datas:AddonWhatTreat) => {
    
    if(!datas || !datas.WhatTreats) {
        return <></>;
    }

    if(!datas.variant) {
        datas.variant = "teal";
    }

    const mobileVersion = (datas:InmodePanel_Addon_WhatTreat_Interface[]) => 
        <div className="treats">
            {datas.map((treat, key:number) => 
                <div key={key} className="treat-part">
                    <img
                        src={resolveImg(treat.picture)}
                        alt="addon-what-treat"
                        className="what-treats-img"
                    />
                    <div className="it-treats">{treat.title}</div>
                    <div className="treat-descr">{treat.text}</div>
                </div>
            )}
        </div>

    const largeVersion = (datas:InmodePanel_Addon_WhatTreat_Interface[]) => 
        <>
            <div className="treats">
                {datas.map((treat, key:number) => {
                    return (
                        <div key={key} className="treat-part">
                        <img
                            src={resolveImg(treat.picture)}
                            alt="addon-what-treat"
                            className="what-treats-img"
                        />
                        </div>
                    );
                })}
            </div>
            <div className="treats">
                {datas.map((treat, key:number) => {
                    return (
                        <div key={key} className="treat-part" style={{padding: '0 8px', boxSizing: 'border-box'}}>
                            <div className="it-treats">{treat.title}</div>
                        </div>
                    );
                })}
            </div>
            <div className="treats">
                {datas.map((treat, key:number) => {
                    return (
                        <div key={key} className="treat-part" style={{padding: '0 8px', boxSizing: 'border-box'}}>
                            <div className="treat-descr">{treat.text}</div>
                        </div>
                    );
                })}
            </div>
        </>

    return (
        <div id="what-treat" className="addon-what-treat">
            <div className="title">{datas.title}</div>
            {useWindowSize().width > 768 ? largeVersion(datas.WhatTreats) : mobileVersion(datas.WhatTreats)}
            <RequestInformation variant={datas.variant}/>
        </div>
    );
};

interface AddonWhatTreat {
  title?: string;
  WhatTreats: InmodePanel_Addon_Interface["WhatTreats"];
  variant: string;
};

export default AddonWhatTreat;