import React from 'react';
import { format_string } from '../../functions/format_string';
import PropTypes from 'prop-types';
import { InmodePanel_Menu_Interface } from '../interfaces';
import { resolveOnClick } from '../../functions/resolve_mini_menu_opened';
import { Link } from 'gatsby';

const MenuSingleButton = ({menu, prop_key = 0, openOnClick, id, classes = []}:MenuSingleButton) => {

    if(menu.url && menu.internal_link) {
        return (
            <Link
                to={menu.url}
                title={menu.title}
                className={["menu-single menu-button user-select-none", classes].join(' ')}
                id={id}
                key={prop_key}
                onClick={(e) => resolveOnClick(e, menu.url ? true : false, openOnClick)}
            >{format_string(menu.title || '')}</Link>
        );
    }

    if(menu.url && !menu.internal_link) {
        return (
            <a
                href={menu.url}
                key={prop_key}
                id={id}
                onClick={(e) => resolveOnClick(e, menu.url ? true : false, openOnClick)}
                className={["menu-single menu-button user-select-none", classes].join(' ')}
            >
                <span className="label">{format_string(menu.title || '')}</span>
            </a>
        );
    }

    if(!menu.url) {
        return (
            <div
                key={prop_key}
                id={id}
                onClick={(e) => resolveOnClick(e, menu.url ? true : false, openOnClick)}
                className={["menu-single menu-button user-select-none", classes].join(' ')}
            >
                <span className="label">{format_string(menu.title || '')}</span>
            </div>
        );
    }

    return <></>;
};

interface MenuSingleButton {
    menu: InmodePanel_Menu_Interface;
    prop_key?: number;
    openOnClick?: boolean;
    id?: string;
    classes?: string[]
}

export default MenuSingleButton;
