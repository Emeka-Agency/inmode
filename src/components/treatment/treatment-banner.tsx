import React from "react";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Treat_Banner_Interface } from "../interfaces";

const TreatmentBanner = ({ datas, variant }:TreatmentBanner) => {

    // TODO récupérer images et vidéos pour chaque produit
    return (
        <div className="treatment-banner">
            <div className="top-transition"></div>
            <div className="treatment-banner-media">
                <img
                    src={resolveImg(datas?.picture)}
                    srcSet={resolveImgSet(datas?.picture)}
                    alt="banner"
                />
            </div>
            <div className={`treatment-banner-short-descr variant-${variant}`}>{datas?.text}</div>
        </div>
    );
};

interface TreatmentBanner {
    datas?: InmodePanel_Treat_Banner_Interface;
    variant?: string;
};

export default TreatmentBanner;