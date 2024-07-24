import React from 'react';
import { Link } from "gatsby";
import { format_string } from '../../functions/format_string';
import Menu from '../menu';
import { enableMainScroll } from '../../functions/disable-scroll';
import { InmodePanel_Menu_Interface } from '../interfaces';
import { useWindowSize } from '../../functions/window-size';

const MenuContentText = ({menu, prop_key}:MenuContentText) => {

    const size = useWindowSize();

    const content = (_menu:InmodePanel_Menu_Interface) => {
        if(!_menu.menus) {
            return (
                <>
                    {_menu.title}
                    {_menu.from && <span className="header-mini-treatment-from">{'('}{format_string(_menu.from)}{')'}</span>}
                </>
            );
        }
        return (
            <>
                {format_string(_menu.title || '')}
                {_menu.menus && _menu.menus.length > 0 && _menu.menus.map((sub, key_sub) => {
                        return (<Menu key={key_sub} prop_key={key_sub} menu={sub}/>);
                    })
                }
            </>
        );
    }

    return (
        <>
            {menu.url ?
                menu.internal_link ?
                    <Link onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-text user-select-none" to={menu.url || "#"} title={format_string(menu.title || '')}>
                        {content(menu)}
                    </Link>
                    :
                    <a onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-text user-select-none" href={menu.url || "#"} target="_blank" rel="noreferrer" title={format_string(menu.title || '')}>
                        {content(menu)}
                    </a>
                :
                <div key={prop_key} className="menu-content menu-text user-select-none">
                    {content(menu)}
                </div>
            }
        </>
    );
};

interface MenuContentText {
    menu: InmodePanel_Menu_Interface;
    prop_key: number | undefined;
    openOnClick?: boolean;
};

export default MenuContentText;
