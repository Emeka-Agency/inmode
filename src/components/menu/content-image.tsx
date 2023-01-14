import React from 'react';
import { Link } from "gatsby";
import { format_string } from '../../functions/format_string';
import PropTypes from 'prop-types';
import Menu from '../menu';
import { enableMainScroll } from '../../functions/disable-scroll';
import { InmodePanel_Menu_Interface } from '../interfaces';

const MenuContentImage = ({menu, prop_key, openOnClick}:MenuContentImage) => {

    const content = (_menu:InmodePanel_Menu_Interface) => {
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
                    <Link onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-image" to={menu.url || "#"} title={format_string(menu.title || '')}>
                        {content(menu)}
                    </Link>
                    :
                    <a onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-image" href={menu.url || "#"} target="_blank" rel="noreferrer" title={format_string(menu.title || '')}>
                        {content(menu)}
                    </a>
                :
                <div key={prop_key} className="menu-content menu-image">
                    {content(menu)}
                </div>
            }
        </>
    );
};

interface MenuContentImage {
    menu: InmodePanel_Menu_Interface;
    prop_key: number | undefined;
    openOnClick?: boolean;
}

export default MenuContentImage;
