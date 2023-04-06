import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context";
import { enableMainScroll } from '../../functions/disable-scroll';
import { useImages } from '../contexts/images-provider';
import { HeaderRight_Interface } from '../interfaces';
import { getById } from '../../functions/selectors';
import MenuSingleText from '../menu/single-text';
import MenuSingleImage from '../menu/single-image';
import { _log } from '../../functions/logger';
import { Link } from 'gatsby';

import "./header-mini.css";


const HeaderMini = ({}:HeaderMini) => {

    const images = useImages();

    const [menus_left] = React.useState(React.useContext(MenusContext).header_left);
    const [menus_right] = React.useState(React.useContext(MenusContext).header_right);

    const closeMenu = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        let _temp:any = getById('header-mini');
        _temp && _temp.classList.remove('opened');
        enableMainScroll();
    }

    React.useEffect(() => {
        const body = document.querySelector('body');
        const headerMini = getById('header-mini');
        const cookies_opened = document?.querySelector('.privacy-policy.opened');
        _log(body);
        _log(headerMini);
        if(body && headerMini) {
            body.classList.contains('no-scroll') && cookies_opened == null && headerMini.classList.add('opened');
        }
    });

    return (
        <div id="header-mini" className="header-mini custom-scrollbar moz-scrollbar">
            <div className="menu-close transition" onClick={(e) => {closeMenu(e);}}>
                <span>CLOSE</span>
                <img className="close-mini-menu-icon" src={images.resolve_img('closeWhiteIcon')} alt="close-white"/>
            </div>
            <Link id="book-a-demo" to="/contact"><span className="label">book a demo</span></Link>
            <div className="header-mini-divider"></div>
            <div id="header-mini-bottom" className="header-right">
                {menus_right && menus_right.map((menu:HeaderRight_Interface, key:number) => {
                    let temp:HeaderRight_Interface = new Object();
                    let keys = Object.keys(menu);
                    for(let i = 0; i < keys.length; i++) {
                        temp[keys[i]] = menu[keys[i]];
                    }
                    {/* TODO ajouter autres subs */}
                    if(menu.mini_addons && menu.mini_addons.length > 0) {
                        temp.menus = temp.mini_addons.map((elem) => {
                            let retour = {id: elem.id, ...elem.MenuParams};
                            // retour.title = retour.url.replace(/treatment/g, '').replace(/-/g, ' ').replace('//', '').toUpperCase();
                            retour.title = elem.Name;
                            return retour;
                        });
                    }
                    if(menu.mini_treatments && menu.mini_treatments.length > 0) {
                        temp.menus = [...temp.menus, ...temp.mini_treatments.map((elem) => {
                            let retour = {id: elem.id, ...elem.MenuParams};
                            // retour.title = retour.url.replace(/treatment/g, '').replace(/-/g, ' ').replace('//', '').toUpperCase();
                            retour.title = elem.Name;
                            return retour;
                        })];
                    }
                    return (<Menu key={key} prop_key={key} menu={temp} openOnClick={true}/>);
                })}
            </div>
            <div className="header-mini-divider"></div>
            <div id="header-mini-top" className="header-left">
                {menus_left && menus_left.map((menu, key) => {
                    return (<Menu key={key} prop_key={key} menu={menu} openOnClick={true}/>);
                })}
            </div>
        </div>
    );
}

interface HeaderMini {

};

export default HeaderMini;
