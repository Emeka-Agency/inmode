import React from 'react';
import MenuSingleText from './menu/single-text';
import MenuSingleImage from './menu/single-image';
import MenuSingleButton from './menu/single-button';
import MenuTitleText from './menu/title-text';
import MenuTitleCard from './menu/title-card';
import MenuDKTitleText from './menu/dk-title-text';
import MenuTitleImage from './menu/title-image';
import MenuTitleButton from './menu/title-button';
import MenuContentText from './menu/content-text';
import MenuContentImage from './menu/content-image';
import MenuContentButton from './menu/content-button';
import MenuContentCard from './menu/content-card';
import MenuSideMenuText from './menu/side_menu-text';
import PropTypes from 'prop-types';
import { InmodePanel_Menu_Interface } from './interfaces';

// VARIANT
const SINGLE = 'single';
const TITLE = 'title';
const CONTENT = 'content';
const DK_TITLE = 'dk_title';
const SIDE_MENU = 'side_menu';

// TYPE
const TEXT = 'text';
const IMAGE = 'image';
const BUTTON = 'button';
const CARD = 'card';

const Menu = ({menu, prop_key, openOnClick}:Menu) => {

    if(menu.url == "/testimonials") {return null;}

    if(menu.variant === SINGLE && menu.type === TEXT) {
        return (<MenuSingleText key={prop_key} prop_key={prop_key} menu={menu}/>);
    }
    else if(menu.variant === SINGLE && menu.type === IMAGE) {
        return (<MenuSingleImage key={prop_key} prop_key={prop_key} menu={menu}/>);
    }
    else if(menu.variant === SINGLE && menu.type === BUTTON) {
        return (<MenuSingleButton key={prop_key} prop_key={prop_key} menu={menu}/>);
    }
    // else if(menu.variant === SINGLE && menu.type === CARD) {
    //     return (<MenuSingleCard key={prop_key} prop_key={prop_key} menu={menu}/>);
    // }
    else if(menu.variant === TITLE && menu.type === TEXT) {
        return (<MenuTitleText key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    }
    else if(menu.variant === TITLE && menu.type === IMAGE) {
        return (<MenuTitleImage key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    }
    else if(menu.variant === TITLE && menu.type === BUTTON) {
        return (<MenuTitleButton key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    }
    else if(menu.variant === TITLE && menu.type === CARD) {
        return (<MenuTitleCard key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    }
    else if(menu.variant === CONTENT && menu.type === TEXT) {
        return (
            <li key={prop_key}>
                <MenuContentText key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>
            </li>
        );
    }
    else if(menu.variant === CONTENT && menu.type === IMAGE) {
        return (
            <li key={prop_key}>
                <MenuContentImage key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>
            </li>
        );
    }
    else if(menu.variant === CONTENT && menu.type === BUTTON) {
        return (
            <li key={prop_key}>
                <MenuContentButton key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>
            </li>
        );
    }
    else if(menu.variant === CONTENT && menu.type === CARD) {
        return (
            <li key={prop_key}>
                <MenuContentCard key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>
            </li>
       );
    }
    else if(menu.variant === DK_TITLE && menu.type === TEXT) {
        return (<MenuDKTitleText key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    }
    // else if(menu.variant === DK_TITLE && menu.type === IMAGE) {
    //     return (<MenuDKTitleImage key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    // }
    // else if(menu.variant === DK_TITLE && menu.type === BUTTON) {
    //     return (<MenuDKTitleButton key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    // }
    // else if(menu.variant === DK_TITLE && menu.type === CARD) {
    //     return (<MenuDKTitleCard key={prop_key} prop_key={prop_key} menu={menu} openOnClick={openOnClick}/>);
    // }
    else if(menu.variant === SIDE_MENU && menu.type === TEXT) {
        return (<MenuSideMenuText key={prop_key} prop_key={prop_key} menu={menu}/>);
    }
    // else if(menu.variant === SIDE_MENU && menu.type === IMAGE) {
    //     return (<MenuSideMenuImage key={prop_key} prop_key={prop_key} menu={menu}/>);
    // }
    // else if(menu.variant === SIDE_MENU && menu.type === BUTTON) {
    //     return (<MenuSideMenuButton key={prop_key} prop_key={prop_key} menu={menu}/>);
    // }
    // else if(menu.variant === SIDE_MENU && menu.type === CARD) {
    //     return (<MenuSideMenuCard key={prop_key} prop_key={prop_key} menu={menu}/>);
    // }
    else {
        return null;
    }
};

interface Menu {
    menu: InmodePanel_Menu_Interface;
    prop_key: number | undefined;
    openOnClick?: boolean;
};

export default Menu;
