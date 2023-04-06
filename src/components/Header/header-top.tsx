import React from "react";
import { Link } from "gatsby";
import { useImages } from "../contexts/images-provider";

import "./header-top.css";

const HeaderTop = (props:HeaderTop) => {

    const images = useImages();

    return (
        <section className="header-top">
            <div className="header-logo background-image">
                <img src={images.resolve_img('headerLogo')} alt="inmode-logo"/>
                <Link to="/" className="zone-link" title="Inmode">
                </Link>
            </div>
            <Link id="book-a-demo" to="/contact"><span className="label">book a demo</span></Link>
        </section>
    );
};

interface HeaderTop {

};

export default HeaderTop;