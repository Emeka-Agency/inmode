import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import HeaderTop from "./header-top";
import HeaderBottom from "./header-bottom";
import HeaderMini from "./header-mini";
import { get_img_path } from "../functions/get_images";

const Header = ({ siteTitle }) => {

  const openMenu = (e) => {
    // console.log("openMenu()");
    e.preventDefault();
    document.getElementById('header-mini').classList.add('opened');
  }

  return (
    <header>
      <div className="header-content container">
        <div className="header-logo background-image" style={{backgroundImage: 'url('+get_img_path('/icons/header-logo.png')+')'}}>
          <Link to="/" className="zone-link">
          </Link>
        </div>
        <div className="header-parts">
          <HeaderTop/>
          <HeaderBottom/>
          <HeaderMini/>
          <button
            className="header-mini-menu"
            onClick={(e)=>{openMenu(e)}}
          >
            Menu
          </button>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
