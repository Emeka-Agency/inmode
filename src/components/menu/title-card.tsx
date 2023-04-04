import { Link } from "gatsby";
import React from "react";
import { enableMainScroll } from "../../functions/disable-scroll";
import { format_string } from "../../functions/format_string";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Addon_Interface, InmodePanel_Menu_Interface } from "../interfaces";
import Menu from "../menu";

// VARIANT
// const SINGLE = 'single';
const TITLE = 'title';
// const CONTENT = 'content';
// const DK_TITLE = 'dk_title';
// const SIDE_MENU = 'side_menu';

// TYPE
// const TEXT = 'text';
// const IMAGE = 'image';
// const BUTTON = 'button';
// const CARD = 'card';

const MenuTitleCard = ({ menu, prop_key }:MenuTitleCard) => {

    if(menu.url == "/workstation/empowerrf") {
        menu.menus = [
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 23),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 12),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 22),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 3),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 1),
            menu.menus?.find((el:InmodePanel_Menu_Interface):boolean => el.id == 8),
        ].filter(el => el != undefined);
    }

    return (
        <div key={prop_key} className="menu-title menu-card">
            {
                menu.url ?
                    menu.internal_link ?
                    <Link onClick={(e) => {enableMainScroll();}} to={menu.url} title={format_string(menu.title || "")}>
                        <img
                            className="menu-title menu-card picture transition"
                            src={resolveImg(menu.icon)}
                            srcSet={resolveImgSet(menu.icon)}
                            alt={format_string(menu.title || "")}
                        />
                        <span className="menu-title menu-card title">{format_string(menu.title || "")}</span>
                    </Link>
                    :
                    <a onClick={(e) => {enableMainScroll();}} href={menu.url} title={format_string(menu.title || "")} target="_blank" rel="noreferrer">
                        <img
                            className="menu-title menu-card picture transition"
                            src={resolveImg(menu.icon)}
                            srcSet={resolveImgSet(menu.icon)}
                            alt={format_string(menu.title || "")}
                        />
                        <span className="menu-title menu-card title">{format_string(menu.title || "")}</span>
                    </a>
                :
                <div>
                    <img
                        className="menu-title menu-card picture transition"
                        src={resolveImg(menu.icon)}
                        srcSet={resolveImgSet(menu.icon)}
                        alt={format_string(menu.title || "")}
                    />
                    <span className="menu-title menu-card title">{format_string(menu.title || "")}</span>
                </div>
            }
            {menu.menus && menu.menus.length > 0 ?
                <div className={`menu-title menu-card sub ${menu.variant === TITLE ? 'dropdown-menu' : 'menu-title menu-card dropdown-menu'}`}>
                    {
                        menu.menus.map((sub, key_sub) => {
                            return (
                                <Menu key={key_sub} prop_key={key_sub} menu={sub} />
                            );
                        })
                    }
                </div>: null
            }
        </div>
    );
};

interface MenuTitleCard {
    menu:InmodePanel_Menu_Interface;
    prop_key: number | undefined;
    openOnClick?: boolean;
};

export default MenuTitleCard;