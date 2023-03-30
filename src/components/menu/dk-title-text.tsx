import React from 'react';
import { Link } from "gatsby";
import { resolve_mini_menu_opened } from '../../functions/resolve_mini_menu_opened';
import { format_string } from '../../functions/format_string';
import Menu from '../menu';
import { enableMainScroll } from '../../functions/disable-scroll';
import { InmodePanel_Menu_Interface } from '../interfaces';
import { useImages } from '../contexts/images-provider';
import { useWindowSize } from '../../functions/window-size';

const MenuDKTitleText = ({menu, prop_key, openOnClick}:MenuDKTitleText) => {

    const resolveOnClick = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent> | any, is_link:boolean) => {
        if(openOnClick === true) {
            !is_link && e.preventDefault();
            if(e.target.parentNode.classList.contains('opened')) {
                e.target.parentNode.classList.remove('opened');
            }
            else {
                e.preventDefault();
                resolve_mini_menu_opened();
                e.target.parentNode.classList.add('opened')
            }
        }
    }

    const images = useImages();
    const size = useWindowSize();

    return (
        <ul key={prop_key} className="menu-dk-title menu-text">
            {menu.url ?
                menu.internal_link ?
                    <Link
                        className="menu-dk-title menu-text"
                        to={menu.url || "#"}
                        onClick={(e) => {
                            resolveOnClick(e, true);
                            enableMainScroll();
                        }}
                        title={format_string(menu.title || '')}
                    >
                        {format_string(menu.title || '')}
                    </Link>
                    :
                    <a
                        className="menu-dk-title menu-text"
                        href={menu.url || "#"}
                        onClick={(e) => {
                            resolveOnClick(e, true);
                            enableMainScroll();
                        }}
                        target="_blank"
                        rel="noreferrer"
                        title={format_string(menu.title || '')}
                    >
                        {format_string(menu.title || '')}
                    </a>
                :
                <div
                    className="menu-dk-title menu-text"
                    onClick={(e) => {resolveOnClick(e, false);}}
                >
                    {format_string(menu.title || '')}
                </div>
            }
            <ul className="dk-dropdown-menu">
                <div className="dk-sub-container">
                    {
                        size.width > 1200 &&
                        <> 
                            <div className="back-hex left">
                                <img
                                    src={images.resolve_img('wideBackAlveole')}
                                    srcSet={images.resolve_img('wideBackAlveole')}
                                    alt="back-left"
                                />
                            </div>
                            <div className="back-hex right">
                                <img
                                    src={images.resolve_img('wideBackAlveole')}
                                    srcSet={images.resolve_img('wideBackAlveole')}
                                    alt="back-right"
                                />
                            </div>
                        </>
                    }
                    {menu.menus && menu.menus.length > 0 && menu.menus.map((sub, key_sub) => {
                        return (
                            <Menu key={key_sub} prop_key={key_sub} menu={sub}/>
                        );
                    })}
                    {/* TODO dk-item is a {'type': 'content', 'variant': 'card'} */}
                    {/* {menu.menus && menu.menus.length > 0 && menu.menus.map((sub, key_sub) => {
                        return <></>;
                    })} */}
                </div>
            </ul>
        </ul>
    );
};

interface MenuDKTitleText {
    menu: InmodePanel_Menu_Interface;
    prop_key: number | undefined;
    openOnClick?: boolean;
};

export default MenuDKTitleText;
