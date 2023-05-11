import React from "react";
import { InmodePanel_Addon_Interface, InmodePanel_Product_Interface } from "../interfaces";
import { resolveImg } from "../../functions/tools";

import "./evolvex-addons.css";
import { Link } from "gatsby";

const LandingEvolveXAddons = ({ addons }:LandingEvolveXAddons) => {

    if(!addons) {
        return <></>;
    }

    console.log(addons);

    return (
        <section className="evolvex-addons">
            <h2>hands-free total body transformation</h2>
            <div className="evolvex-addons-gynecologist evolvex-addons-list">
                {[addons["Evolve Tite"], addons["Evolve Transform"], addons["Evolve Tone"]].map(addon => (
                    <div className="evolvex-addons-list-elem">
                        <Link to={addon.MenuParams.url} className="zone-link" title={addon.Name}/>
                        <img src={resolveImg(addon.Banner?.left_img)} alt={addon.Name} />
                        <div className="evolvex-addons-list-elem-name">{addon.Name}</div>
                        {/* <div className="evolvex-addons-list-elem-catchphrase"></div> */}
                    </div>
                ))}
            </div>
        </section>
    );
};

interface LandingEvolveXAddons {
    addons: {
        "Evolve Tite": InmodePanel_Addon_Interface;
        "Evolve Transform": InmodePanel_Addon_Interface;
        "Evolve Tone": InmodePanel_Addon_Interface;
    };
};

export default LandingEvolveXAddons;