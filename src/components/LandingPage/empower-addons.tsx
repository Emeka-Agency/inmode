import React from "react";
import { InmodePanel_Addon_Interface, InmodePanel_Product_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";

import "./empower-addons.css";
import { Link } from "gatsby";
import { useImages } from "../contexts/images-provider";

const LandingEmpowerAddons = ({ addons }:LandingEmpowerAddons) => {

    if(!addons) {
        return <></>;
    }

    const images = useImages();

    return (
        <section className="empower-addons">
            <h2>functional gynecologist</h2>
            <div className="empower-addons-gynecologist empower-addons-list">
                {[{...addons["V-Tone"], Banner: {left_img: images.resolve_img("landingVTone")}}, {...addons["Morpheus8v"], Banner: {left_img: images.resolve_img("landingMorpheus8v")}}, {...addons["Forma"], Banner: {left_img: images.resolve_img("landingForma")}}].map(addon => (
                    <div className="empower-addons-list-elem">
                        <Link to={addon.MenuParams.url} className="zone-link" title={addon.Name}/>
                        <img src={addon.Banner?.left_img} alt={addon.Name} />
                        <div className="empower-addons-list-elem-name">{addon.Name}</div>
                        {/* <div className="empower-addons-list-elem-catchphrase"></div> */}
                    </div>
                ))}
            </div>
            <h2>aesthetics and surgical</h2>
            <div className="empower-addons-surgical empower-addons-list">
                {[{...addons["Morpheus8"], Banner: {left_img: images.resolve_img("landingMorpheus8")}}, {...addons["Evolve Tone"], Banner: {left_img: images.resolve_img("landingTone")}}, {...addons["Aviva"], Banner: {left_img: images.resolve_img("landingAviva")}}].map(addon => (
                    <div className="empower-addons-list-elem">
                        <Link to={addon.MenuParams.url} className="absolute-link"/>
                        <img src={addon.Banner?.left_img} alt={addon.Name} />
                        <div className="empower-addons-list-elem-name">{addon.Name}</div>
                        {/* <div className="empower-addons-list-elem-catchphrase"></div> */}
                    </div>
                ))}
            </div>
        </section>
    );
};

interface LandingEmpowerAddons {
    addons: {
        "Aviva": InmodePanel_Addon_Interface;
        "Evolve Tone": InmodePanel_Addon_Interface;
        "Forma": InmodePanel_Addon_Interface;
        "Morpheus8": InmodePanel_Addon_Interface;
        "Morpheus8v": InmodePanel_Addon_Interface;
        "V-Tone": InmodePanel_Addon_Interface;
    };
};

export default LandingEmpowerAddons;