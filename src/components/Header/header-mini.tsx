import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context";
import { enableMainScroll } from '../../functions/disable-scroll';
import { useImages } from '../contexts/images-provider';
import { HeaderBottom_Interface, Inmode_MiniMenu_Interface } from '../interfaces';
import { oneById } from '../../functions/selectors';

const HeaderMini = ({}:HeaderMini) => {

    const images = useImages();

    const [menus_top] = React.useState(React.useContext(MenusContext).header_top);
    const [menus_bottom] = React.useState(React.useContext(MenusContext).header_bottom);

    const closeMenu = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        let _temp:any = oneById('header-mini');
        _temp && _temp.classList.remove('opened');
        enableMainScroll();
    }

    React.useEffect(() => {
        const body = document.querySelector('body');
        const headerMini = oneById('header-mini');
        console.log(body);
        console.log(headerMini);
        if(body && headerMini) {
            body.classList.contains('no-scroll') && headerMini.classList.add('opened');
        }
    });

    return (
        <div id="header-mini" className="header-mini custom-scrollbar">
            <div className="menu-close transition" onClick={(e) => {closeMenu(e);}}>
                <span>FERMER</span>
                <img className="close-mini-menu-icon" src={images.getOne('closeWhiteIcon').publicURL} alt="close-white"/>
            </div>
            <div id="header-mini-bottom" className="header-bottom">
                {menus_bottom && menus_bottom.map((menu:HeaderBottom_Interface, key:number) => {
                    let temp:HeaderBottom_Interface = new Object();
                    let keys = Object.keys(menu);
                    for(let i = 0; i < keys.length; i++) {
                        temp[keys[i]] = menu[keys[i]];
                    }
                    {/* TODO ajouter autres subs */}
                    if(menu.mini_treatments && menu.mini_treatments.length > 0) {
                        temp.menus = temp.mini_treatments.map((elem:Inmode_MiniMenu_Interface) => {
                            let retour = {id: elem.id, ...elem.MenuParams};
                            retour.title = retour.url.replace(/treatment/g, '').replace(/-/g, ' ').replace('//', '').toUpperCase();
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
}

interface HeaderMini {

};

export default HeaderMini;
