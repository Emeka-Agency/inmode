import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context";
import { enableMainScroll } from '../../functions/disable-scroll';
import { useImages } from '../contexts/images-provider';
import { HeaderBottom_Interface } from '../interfaces';
import { getById } from '../../functions/selectors';
import MenuSingleText from '../menu/single-text';
import MenuSingleImage from '../menu/single-image';
import { _log } from '../../functions/logger';

import "./header-mini.css";
import { Link } from 'gatsby';

const HeaderMini = ({}:HeaderMini) => {

    const images = useImages();

    const [menus_top] = React.useState(React.useContext(MenusContext).header_top);
    const [menus_bottom] = React.useState(React.useContext(MenusContext).header_bottom);

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
            <div id="header-mini-bottom" className="header-bottom">
                {menus_bottom && menus_bottom.map((menu:HeaderBottom_Interface, key:number) => {
                    let temp:HeaderBottom_Interface = new Object();
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
            <div id="header-mini-top" className="header-top">
                {menus_top && menus_top.map((menu, key) => {
                    return (<Menu key={key} prop_key={key} menu={menu} openOnClick={true}/>);
                })}
            </div>
        </div>
    );
}

interface HeaderMini {

};

export default HeaderMini;
