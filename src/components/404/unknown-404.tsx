import React from "react";
import { Link } from "gatsby";

import './index.css';

const Unknown404 = ({  }:Unknown404) => {

    return (
        <div className="_404-zone">
            <div className="_404-message">
                Il semblerait que la page que vous cherchez n'existe pas
            </div>
            <div className="_404-suggestions">
                <Link to="/" title="Accueil">Accueil</Link>
                <Link to="/workstation" title="Machines">Machines</Link>
                {/* SWITCH CART */}

                <a href="https://fr.inmoderesources.com/account/login" title="Shop" target="_blank">Shop</a>

                {/* SWITCH CART END */}
            </div>
        </div>
    );
};

interface Unknown404 {

};

export default Unknown404;