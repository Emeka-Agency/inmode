import React from "react";
import { Link } from "gatsby";

import './index.css';

const Unknown404 = ({  }:Unknown404) => {

    return (
        <div className="_404-zone">
            <div className="_404-message">
                It seems that the page you are looking for does not exist
            </div>
            <div className="_404-suggestions">
                <Link to="/" title="Home">Home</Link>
                <Link to="/workstation" title="Workstations">Workstations</Link>
                {/* SWITCH CART */}

                {/* <Link to="/shop" title="Shop">Shop</Link> */}

                {/* SWITCH CART END */}
            </div>
        </div>
    );
}

interface Unknown404 {

};

export default Unknown404;