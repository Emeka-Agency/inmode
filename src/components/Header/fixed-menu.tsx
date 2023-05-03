import React from "react"
import Menu from "../menu";
import { Link } from "gatsby";
import MenusContext from "../contexts/menus-context"
import { useImages } from '../contexts/images-provider';
import MenuSingleText from "../menu/single-text";

import "./fixed-menu.css";
import { getById } from "../../functions/selectors";
import { resolveOnClick } from "../../functions/resolve_mini_menu_opened";
import MenuSingleButton from "../menu/single-button";

const FixedMenu = ({ customClass }:{ customClass?:string }) => {

    const [menus] = React.useState([...React.useContext(MenusContext).header_left, ...React.useContext(MenusContext).header_right]);

    const [ isVisible, setIsVisible ]:[boolean, React.Dispatch<boolean>] = React.useState(Boolean(false));

    React.useEffect(() => {
        const handleScroll = (e:Event) => { 
            if (window?.pageYOffset > 150 && window?.innerWidth > 999) {
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

    const images = useImages();

    return (
        <div id="fixed-menu" className={["transition", customClass ?? ''].join(' ')} style={{top: isVisible ? 0 : -55, boxShadow: isVisible ? 'none' : 'unset'}}>
            <div className="fixed-menu-container">
                <div className="fixed-menu-logo">
                    <img
                        src={images.resolve_img('fixedMenuLogo')}
                        srcSet={images.resolve_img_set('fixedMenuLogo')}
                        alt="header-logo"
                    />
                    <Link to="/" className="zone-link" title="Inmode"></Link>
                </div>
                <div className="fixed-menus">
                    {menus && menus.map((menu:any, key:number) => {
                        return (
                            <Menu key={key} prop_key={key} menu={menu} />
                        );
                    })}
                    <Link id="book-a-demo" to="/contact" title="Book a demo">
                        book a demo
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FixedMenu;