import React from 'react';
import { Link } from "gatsby";
import { format_string } from '../../functions/format_string';
import { enableMainScroll } from '../../functions/disable-scroll';
import { InmodePanel_Menu_Interface } from '../interfaces';

const MenuSingleText = ({menu, prop_key = undefined, openOnClick}:MenuSingleText) => {

    return (
        menu.url ?
            menu.internal_link ?
            <Link onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-single menu-text" to={menu.url || "#"} title={format_string(menu.title || "")}>
                {format_string(menu.title || "")}
            </Link>
            :
            <a onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-single menu-text" href={menu.url || "#"} target="_blank" rel="noreferrer" title={format_string(menu.title || "")}>
                {format_string(menu.title || "")}
            </a>
        :
        <div key={prop_key} className="menu-single menu-text">
            {format_string(menu.title || "")}
        </div>
    );
}

interface MenuSingleText {
    menu: InmodePanel_Menu_Interface;
    prop_key: number | undefined;
    openOnClick?: boolean;
}

export default MenuSingleText;
