import React from "react";
import { Link } from "gatsby";
import { useImages } from "../contexts/images-provider";

import "./header-top.css";
import { getById } from "../../functions/selectors";
import { resolveOnClick } from "../../functions/resolve_mini_menu_opened";
import MenuSingleButton from "../menu/single-button";

const HeaderTop = (props:HeaderTop) => {

    const images = useImages();

    return (
        <section className="header-top">
            <div className="header-logo background-image">
                <img src={images.resolve_img('headerLogo')} alt="inmode-logo"/>
                <Link to="/" className="zone-link" title="Inmode">
                </Link>
            </div>
            <Link id="book-a-demo" to="/contact" title="Book a demo">
                book a demo
            </Link>
        </section>
    );
};

interface HeaderTop {

};

export default HeaderTop;