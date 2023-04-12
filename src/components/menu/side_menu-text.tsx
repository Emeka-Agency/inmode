import React from 'react';
import { Link } from "gatsby";
import { resolveOnClick, resolve_mini_menu_opened } from '../../functions/resolve_mini_menu_opened';
import { format_string } from '../../functions/format_string';
import Menu from '../menu';
import { enableMainScroll } from '../../functions/disable-scroll';
import { InmodePanel_Menu_Interface } from '../interfaces';

const MenuSideMenuText = ({menu, prop_key = undefined, openOnClick = false}:MenuSideMenuText) => {

    return (
        <ul key={prop_key} className="menu-side-menu menu-text transition">
            {menu.url ?
                menu.internal_link == true ?
                    <Link
                        className="menu-side-menu menu-text"
                        to={menu.url || "#"}
                        onClick={(e) => {
                            resolveOnClick(e, true, openOnClick);
                            enableMainScroll();
                        }}
                        target="_self"
                        title={format_string(menu.title || '')}
                    >
                        {format_string(menu.title || '')}
                    </Link>
                    :
                    <a
                        className="menu-side-menu menu-text"
                        href={menu.url || "#"}
                        onClick={(e) => {
                            resolveOnClick(e, true, openOnClick);
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
                    className="menu-side-menu menu-text"
                    onClick={(e) => {resolveOnClick(e, false, openOnClick);}}
                >
                    {format_string(menu.title || '')}
                </div>
            }
            <ul className="dropside-menu">
                {menu.menus && menu.menus.length > 0 && menu.menus.map((sub, key_sub) => {
                    return (
                        <Menu key={key_sub} prop_key={key_sub} menu={sub}/>
                    );
                })}
                {menu.mini_addons && menu.mini_addons.length > 0 && menu.mini_addons.map((sub, key_sub) => {
                    return (
                        <Menu key={key_sub} prop_key={key_sub} menu={sub}/>
                    );
                })}
            </ul>
        </ul>
    );
};

interface MenuSideMenuText {
    menu: InmodePanel_Menu_Interface;
    prop_key: number | undefined;
    openOnClick?: boolean;
}

export default MenuSideMenuText;
