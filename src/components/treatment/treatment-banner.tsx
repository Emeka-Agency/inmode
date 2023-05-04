import React from "react";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Treat_Banner_Interface } from "../interfaces";

const TreatmentBanner = ({ datas, variant = "teal" }:TreatmentBanner) => {

    // TODO récupérer images et vidéos pour chaque produit
    return (
        <div className="treatment-banner" data-variant={variant}>
            <div className="top-transition"></div>
            <div className="treatment-banner-media">
                <img
                    className="user-select-none"
                    src={resolveImg(datas?.picture)}
                    srcSet={resolveImgSet(datas?.picture)}
                    alt="banner"
                />
            </div>
            <div className={`treatment-banner-short-descr user-select-none variant-${variant}`}>{datas?.text}</div>
        </div>
    );
};

interface TreatmentBanner {
    datas?: InmodePanel_Treat_Banner_Interface;
    variant?: string;
};

export default TreatmentBanner;