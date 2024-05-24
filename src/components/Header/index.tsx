import { Link } from "gatsby";
import React from "react";
import HeaderTop from "./header-top";
import HeaderBottom from "./header-bottom";
import HeaderMini from "./header-mini";
import { useWindowSize } from "../../functions/window-size";
import { disableMainScroll } from "../../functions/disable-scroll";
import { useImages } from '../contexts/images-provider';
// {/* SWITCH CART */}
  
import CartBasket from "../CartBasket";

// {/* SWITCH CART END */}

import { getById, selectOne } from "../../functions/selectors";

import "./index.css";

const Header = ({variant = "teal"}:Header) => {

    const images = useImages();

    const openMenu = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        getById('header-mini')?.classList.add('opened');
        selectOne('.header-parts')?.classList.add('mini-opened');
        size.width < 1200 && disableMainScroll();
    }

    const size = useWindowSize();

    React.useEffect(() => {

    }, []);

    return (
        <header data-variant={variant}>
            <div className="header-content">
                <div className="header-parts">
                    {size.width > 1199 && <HeaderTop/>}
                    {size.width > 1199 && <HeaderBottom/>}
                    {
                        size.width < 1200 && 
                        <div className="header-logo background-image" style={{backgroundImage: 'url('+ images.resolve_img('footerLogo3') +')'}}>
                            <Link to="/" className="absolute-link" title="Inmode"></Link>
                        </div>
                    }
                    {size.width < 1200 && <HeaderMini/>}
                    {/* SWITCH CART */}

                    {/* { cart.cart.length > 0 || cart.appeared ? <CartBasket/>: null } */}
                    <CartBasket/>

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
  variant?: string;
};

export default Header
