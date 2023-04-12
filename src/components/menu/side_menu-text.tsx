import React from 'react';
import { Link } from "gatsby";
import { resolve_mini_menu_opened } from '../../functions/resolve_mini_menu_opened';
import { format_string } from '../../functions/format_string';
import Menu from '../menu';
import { enableMainScroll } from '../../functions/disable-scroll';
import { InmodePanel_Menu_Interface } from '../interfaces';

const MenuSideMenuText = ({menu, prop_key = undefined, openOnClick = false}:MenuSideMenuText) => {

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

    if(menu.id == 9) {
        menu.menus = [
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 4),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 2),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 6),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 7),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 1),
        ].filter(el => el != undefined);
    }

    if(menu.id == 10) {
        menu.menus = [
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 5),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 3),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 6),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 7),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 1),
        ].filter(el => el != undefined);
    }

    return (
        <ul key={prop_key} className="menu-side-menu menu-text transition">
            {menu.url ?
                menu.internal_link ?
                    <Link
                        className="menu-side-menu menu-text user-select-none"
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
                        className="menu-side-menu menu-text user-select-none"
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
                    className="menu-side-menu menu-text user-select-none"
                    onClick={(e) => {resolveOnClick(e, false);}}
                >
                    {format_string(menu.title || '')}
                </div>
            }
            <ul className="dropside-menu">
                {(menu.menus || []).map((sub, key_sub) => {
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
};

export default MenuSideMenuText;
