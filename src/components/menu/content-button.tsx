import React from 'react';
import { Link } from "gatsby";
import { format_string } from '../../functions/format_string';
import PropTypes from 'prop-types';
import Menu from '../menu';
import { enableMainScroll } from '../../functions/disable-scroll';
import { InmodePanel_Menu_Interface } from '../interfaces';

const MenuContentButton = ({menu, prop_key = 0}:MenuContentButton) => {

    const content = (_menu:InmodePanel_Menu_Interface) => {
        return (
            <>
                {format_string(_menu.title || '')}
                {_menu.menus && _menu.menus.length > 0 && _menu.menus.map((sub, key_sub) => {
                        return (<Menu key={key_sub} prop_key={key_sub} menu={sub}/>);
                    })
                }
            </>
        )
    }

    // TODO faire une fonction qui renvoie Link pour les internal sinon a avec les props
    return (
        <>
            {menu.url ?
                menu.internal_link ?
                    <Link onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-button" to={menu.url || "#"} title={format_string(menu.title || '')}>
                        {content(menu)}
                    </Link>
                    :
                    <a onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-button" href={menu.url || "#"} target="_blank" rel="noreferrer" title={format_string(menu.title || '')}>
                        {content(menu)}
                    </a>
                :
                <div key={prop_key} className="menu-content menu-button">
                    {content(menu)}
                </div>
            }
        </>
    );
};

interface MenuContentButton {
    menu: InmodePanel_Menu_Interface;
    prop_key: number;
};

export default MenuContentButton;
