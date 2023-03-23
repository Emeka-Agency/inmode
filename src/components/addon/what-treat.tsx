import React from "react";
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Addon_Interface } from "../interfaces";
import RequestInformation from "../RequestInformation";

const AddonWhatTreat = (datas:AddonWhatTreat) => {
    
  if(!datas || !datas.WhatTreats) {
      return <></>;
  }

    return (
        <div id="what-treat" className="addon-what-treat">
          <div className="title">{datas.title}</div>
          <div className="treats">
            {datas.WhatTreats.map((treat, key:number) => {
              return (
                <div key={key} className="treat-part">
                  <img
                    src={resolveImg(treat.picture)}
                    alt="addon-what-treat"
                  />
                  <div className="it-treats">{treat.title}</div>
                  <div className="treat-descr">{treat.text}</div>
                </div>
              );
            })}
          </div>
            <RequestInformation/>
        </div>
    );
};

interface AddonWhatTreat {
  title?: string;
  WhatTreats: InmodePanel_Addon_Interface["WhatTreats"];
}

export default AddonWhatTreat;