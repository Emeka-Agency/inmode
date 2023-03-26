import { Link } from "gatsby";
import React from "react";
import HeaderTop from "./header-top";
import HeaderBottom from "./header-bottom";
import HeaderMini from "./header-mini";
import { useWindowSize } from "../../functions/window-size";
import { disableMainScroll } from "../../functions/disable-scroll";
import { useImages } from '../contexts/images-provider';
// {/* SWITCH CART */}
  
import { useCart } from '../contexts/cart-provider';
import CartBasket from "../CartBasket";

// {/* SWITCH CART END */}

import { getById, selectOne } from "../../functions/selectors";
import { useUser } from "../contexts/user-provider";

const Header = ({}:Header) => {

    const images = useImages();

    const openMenu = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        getById('header-mini')?.classList.add('opened');
        size.width < 1200 && disableMainScroll();
    }

    // {/* SWITCH CART */}
        
    const cart = useCart();

    // {/* SWITCH CART END */}

    const user = useUser();
    const size = useWindowSize();

    React.useEffect(() => {

    }, [user]);

    return (
        <header>
            <div className="header-content container">
                <div className="header-logo background-image" style={{backgroundImage: 'url('+ images.resolve_img('headerLogo3') +')'}}>
                {/* <div className="header-logo background-image" style={{backgroundImage: 'url(https://www.inmodemd.com/wp-content/uploads/2017/08/logo.png)'}}> */}
                    <Link to="/" className="zone-link" title="Inmode">
                    </Link>
                </div>
                <div className={`header-parts${user.logged() ? ' logged' : ''}`}>
                    {size.width > 1199 && <HeaderTop/>}
                    {size.width > 1199 && <HeaderBottom/>}
                    {size.width < 1200 && <HeaderMini/>}
                    {/* SWITCH CART */}

                    {/* { cart.cart.length > 0 || cart.appeared ? <CartBasket/>: null } */}
                    <CartBasket/>

                    {/* SWITCH CART END */}
                    {
                        user.logged() && size.width > 480 &&
                        <Link className="profile-link" to="/profile">
                            <img src={images.resolve_img("profileIcon")}/>
                            {size.width > 1199 && <span>Profil</span>}
                        </Link>
                    }
                    {
                        user.logged() && size.width > 480 &&
                        <div className="menu-single menu-text logout" title="Déconnexion" onClick={function() {user.logout();}}>
                            {size.width > 1199 && <span>Déconnexion</span>}
                            <img src={images.resolve_img("logoutIcon")}/>
                        </div>
                    }
                    {
                        user.logged() == false && size.width >= 600 &&
                        <div className="menu-single menu-text login" title="Connexion" onClick={function() {user.login(null);}}>Connexion</div>
                    }
                    {/* {
                        user.logged() == false && size.width >= 600 &&
                        <div className="menu-single menu-text signin" title="Inscription" onClick={function() {user.signin(null);}}>Inscription</div>
                    } */}
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
};

export default Header
