import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context";
import { enableMainScroll } from '../../functions/disable-scroll';
import { useImages } from '../contexts/images-provider';
import { InmodePanel_Generic_SubLinked_MiniTreatments_Interface, InmodePanel_Menu_Interface } from '../interfaces';
import { getById, selectOne } from '../../functions/selectors';
import { Link } from 'gatsby';
import { useWindowSize } from '../../functions/window-size';

import "./header-mini.css";

const HeaderMini = ({}:HeaderMini) => {

    const images = useImages();
    const size = useWindowSize();

    const [menus_top] = React.useState(React.useContext(MenusContext).header_top);
    const [menus_bottom] = React.useState(React.useContext(MenusContext).header_bottom);

    const closeMenu = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        getById('header-mini')?.classList.remove('opened');
        selectOne('.header-parts')?.classList.remove('mini-opened');
        enableMainScroll();
    }

    React.useEffect(() => {
        const body = document.querySelector('body');
        const headerParts = selectOne('.header-parts');
        const headerMini = getById('header-mini');
        if(body instanceof HTMLBodyElement && headerMini instanceof HTMLElement && false) {
            body?.classList.contains('no-scroll') && headerMini?.classList.add('opened');
            body?.classList.contains('no-scroll') && headerParts?.classList.add('mini-opened');
        }
    });

    return (
        <div id="header-mini" className="header-mini custom-scrollbar moz-scrollbar">
            <div
                style={{
                    backgroundImage: "url(" + images.resolve_img('bgPattern') +")",
                    backgroundRepeat: 'repeat',
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0.02,
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            ></div>
            <div className="menu-close transition" onClick={(e) => {closeMenu(e);}}>
                <span>FERMER</span>
                <img className="close-mini-menu-icon" src={images.resolve_img('closeWhiteIcon')} alt="close-white"/>
            </div>
            <div className="header-mini-divider" style={{marginTop: '64px'}}></div>
            <div id="header-mini-bottom" className="header-bottom">
                {menus_bottom && menus_bottom.map((menu:InmodePanel_Menu_Interface, key:number) => {
                    let temp:InmodePanel_Menu_Interface|any = new Object();
                    let keys:Array<string> = Object.keys(menu);
                    for(let i = 0; i < keys.length; i++) {
                        temp[keys[i]] = menu[keys[i]];
                    }
                    {/* DONE ajouter autres subs */}
                    if((menu.mini_treatments || []).length > 0) {
                        temp.menus = temp.mini_treatments.map((elem:InmodePanel_Generic_SubLinked_MiniTreatments_Interface) => {
                            let retour = {id: elem.id, ...elem.MenuParams};
                            return retour;
                        });
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
};

interface HeaderMini {

};

export default HeaderMini;
