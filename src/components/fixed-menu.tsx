import React from "react";
import Menu from "./menu";
import { Link } from "gatsby";
import MenusContext from "./contexts/menus-context";
// {/* SWITCH CART */}

import CartBasket from "./CartBasket";
import { useCart } from './contexts/cart-provider';

// {/* SWITCH CART END */}
import { useImages } from './contexts/images-provider';
import { useUser } from "./contexts/user-provider";
import { useWindowSize } from "../functions/window-size";

const FixedMenu = ({ customClass }:{ customClass?:string }) => {

    const [menus] = React.useState(React.useContext(MenusContext).header_bottom);

    const [ isVisible, setIsVisible ]:[boolean, React.Dispatch<boolean>] = React.useState(Boolean(false));

    React.useEffect(() => {
        const handleScroll = (e:Event) => { 
            if (window?.pageYOffset > 50 && window?.innerWidth > 999) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        };
        window?.addEventListener('scroll', handleScroll)
        return () => {
            window?.removeEventListener('scroll', handleScroll)
        };
    }, []);

    
    // {/* SWITCH CART */}
    
    const cart = useCart();

    // {/* SWITCH CART END */}

    const images = useImages();
    const user = useUser();
    const size = useWindowSize();

    return (
        <div id="fixed-menu" className={`transition ${isVisible ? "visible" : "invisible"}${' ' + (customClass ?? '')}`} style={{top: isVisible == true ? 0 : -55, boxShadow: isVisible == true ? undefined : 'unset'}}>
            <div className="fixed-menu-container">
                <div className="fixed-menu-logo user-select-none">
                    <img
                        src={images.resolve_img('footerLogo3')}
                        srcSet={images.resolve_img_set('footerLogo3')}
                        alt="header-logo"
                    />
                    <Link to="/" className="absolute-link" title="Inmode"></Link>
                </div>
                <div className="fixed-menus">
                    {menus && menus.map((menu:any, key:number) => {
                        return (
                            <Menu key={key} prop_key={key} menu={menu} />
                        );
                    })}
                    {/* SWITCH CART */}

                    {/* { cart.cart.length > 0 || cart.appeared ? <CartBasket/> : null } */}
                    <CartBasket/>
                    {
                        user.logged() && size.width > 480 &&
                        <Link className="profile-link user-select-none" to="/profile">
                            <img src={images.resolve_img("profileIcon")}/>
                            {size.width > 1199 && <span>Profil</span>}
                        </Link>
                    }
                    {
                        user.logged() && size.width > 480 &&
                        <div className="menu-single menu-text logout user-select-none" title="Déconnexion" onClick={function() {user.logout();}}>
                            {size.width > 1199 && <span>Déconnexion</span>}
                            <img src={images.resolve_img("logoutIcon")}/>
                        </div>
                    }
                    {
                        user.logged() == false && size.width >= 600 &&
                        <div className="menu-single menu-text login user-select-none" title="Connexion" onClick={function() {user.login();}}>Connexion</div>
                    }
                    {/* SWITCH CART END */}
                </div>
            </div>
        </div>
    );
};

export default FixedMenu;