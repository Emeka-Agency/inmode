import { Link } from "gatsby";
import React from "react";
import HeaderTop from "./header-top";
import HeaderBottom from "./header-bottom";
import HeaderMini from "./header-mini";
import { useWindowSize } from "../../functions/window-size";
import { disableMainScroll } from "../../functions/disable-scroll";
import { useImages } from '../contexts/images-provider';
// {/* SWITCH CART */}
  
// import { useCart } from '../contexts/cart-provider';
// import CartBasket from "../CartBasket";

// {/* SWITCH CART END */}

import { oneById } from "../../functions/selectors";

const Header = ({}:Header) => {

  const images = useImages();

  const openMenu = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    let _temp:any = oneById('header-mini');
    _temp && _temp.classList.add('opened');
    size.width < 1200 && disableMainScroll();
  }

  // {/* SWITCH CART */}
    
//   const cart = useCart();

  // {/* SWITCH CART END */}

  const size = useWindowSize();

  return (
    <header>
      <div className="header-content container">
        <div className="header-logo background-image" style={{backgroundImage: 'url('+ images.getOne('headerLogo').childImageSharp.fluid.srcWebp +')'}}>
          <Link to="/" className="zone-link" title="Inmode">
          </Link>
        </div>
        <div className="header-parts">
          {size.width > 1199 && <HeaderTop/>}
          {size.width > 1199 && <HeaderBottom/>}
          {size.width < 1200 && <HeaderMini/>}
          {/* SWITCH CART */}

          {/* { cart.cart.length > 0 || cart.appeared ? <CartBasket/>: null } */}

          {/* SWITCH CART END */}
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
};

interface Header {
  siteTitle?: string;
}

export default Header
