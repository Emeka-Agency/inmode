import { Link } from "gatsby";
import React from "react";
import { enableMainScroll } from "../../functions/disable-scroll";
import { format_string } from "../../functions/format_string";
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Menu_Interface } from "../interfaces";
import Menu from "../menu";

const MenuContentCard = ({ menu, prop_key = 0 }:MenuContentCard) => {
    
    const content = (_menu:InmodePanel_Menu_Interface) => {
        return (
            <>
                <img
                    src={resolveImg(menu.icon)}
                    alt="content-card-img"
                />
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
                    <Link onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-card" to={menu.url || "#"} title={format_string(menu.title || '')}>
                        {content(menu)}
                    </Link>
                    :
                    <a onClick={(e) => {enableMainScroll();}} key={prop_key} className="menu-content menu-card" href={menu.url || "#"} target="_blank" rel="noreferrer" title={format_string(menu.title || '')}>
                        {content(menu)}
                    </a>
                :
                <div key={prop_key} className="menu-content menu-card">
                    {content(menu)}
                </div>
            }
        </>
    );
};

interface MenuContentCard {
    menu: InmodePanel_Menu_Interface;
    prop_key: number;
    openOnClick?: boolean;
};

export default MenuContentCard;