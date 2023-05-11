import React from "react";
import { InmodePanel_Addon_Interface, InmodePanel_Product_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";

import "./empower-addons.css";
import { Link } from "gatsby";

const LandingEmpowerAddons = ({ addons }:LandingEmpowerAddons) => {

    if(!addons) {
        return <></>;
    }

    console.log(addons);

    return (
        <section className="empower-addons">
            <h2>functional gynecologist</h2>
            <div className="empower-addons-gynecologist empower-addons-list">
                {[addons["V-Tone"], addons["Morpheus8v"], addons["Forma"]].map(addon => (
                    <div className="empower-addons-list-elem">
                        <Link to={addon.MenuParams.url} className="zone-link" title={addon.Name}/>
                        <img src={resolveImg(addon.Banner?.left_img)} alt={addon.Name} />
                        <div className="empower-addons-list-elem-name">{addon.Name}</div>
                        {/* <div className="empower-addons-list-elem-catchphrase"></div> */}
                    </div>
                ))}
            </div>
            <h2>aesthetics and surgical</h2>
            <div className="empower-addons-surgical empower-addons-list">
                {[addons["Morpheus8"], addons["Evolve Tone"], addons["Aviva"]].map(addon => (
                    <div className="empower-addons-list-elem">
                        <Link to={addon.MenuParams.url} className="absolute-link"/>
                        <img src={resolveImg(addon.Banner?.left_img)} alt={addon.Name} />
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