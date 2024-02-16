import React from "react";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Treat_Banner_Interface } from "../interfaces";

const TreatmentBanner = ({ datas, variant = "teal", name }:TreatmentBanner) => {

    // TODO récupérer images et vidéos pour chaque produit
    return (
        <div className="treatment-banner" data-treatment={name} data-variant={variant}>
            <div className="top-transition"></div>
            <div
                className="treatment-banner-media"
                // style={{
                //     backgroundImage: `url(${resolveImg(datas?.picture)})`,
                //     backgroundSize: "cover",
                //     backgroundPosition: "center",
                //     backgroundRepeat: "no-repeat",
                // }}
            >
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
    name?: string;
};

export default TreatmentBanner;