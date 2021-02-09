import { Link } from "gatsby";
import React from "react";
import { enableMainScroll } from "../../functions/disable-scroll";
import { format_string } from "../../functions/format_string";
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

const MenuTitleCard = ({ menu, prop_key }) => {
    
    return (
        <div key={prop_key} className="menu-title menu-card">
            {
                menu.url ?
                    menu.internal_link ?
                    <Link onClick={(e) => {enableMainScroll();}} to={menu.url} title={format_string(menu.title)}>
                        <img
                            className="menu-title menu-card picture transition"
                            src={menu.icon.srcWebp}
                            srcSet={menu.icon.srcSetWebp}
                            alt={format_string(menu.title)}
                        />
                        <span className="menu-title menu-card title">{format_string(menu.title)}</span>
                    </Link>
                    :
                    <a onClick={(e) => {enableMainScroll();}} href={menu.url} title={format_string(menu.title)}>
                        <img
                            className="menu-title menu-card picture transition"
                            src={menu.icon.srcWebp}
                            srcSet={menu.icon.srcSetWebp}
                            alt={format_string(menu.title)}
                            target="_blank"
                            rel="noreferrer"
                        />
                        <span className="menu-title menu-card title">{format_string(menu.title)}</span>
                    </a>
                :
                <div>
                    <img
                        className="menu-title menu-card picture transition"
                        src={menu.icon.srcWebp}
                        srcSet={menu.icon.srcSetWebp}
                        alt={format_string(menu.title)}
                    />
                    <span className="menu-title menu-card title">{format_string(menu.title)}</span>
                </div>
            }
            {menu.menus.length > 0 ?
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

MenuTitleCard.propTypes = {

};

MenuTitleCard.defaultProps = {

};

export default MenuTitleCard;