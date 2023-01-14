import React from 'react';
import { format_string } from '../../functions/format_string';
import PropTypes from 'prop-types';
import { InmodePanel_Menu_Interface } from '../interfaces';

const MenuSingleButton = ({menu, prop_key = 0, openOnClick}:MenuSingleButton) => {

    return (
        <div key={prop_key} className="menu-single menu-button">
            {format_string(menu.title || '')}
        </div>
    );
};

interface MenuSingleButton {
    menu: InmodePanel_Menu_Interface;
    prop_key?: number;
    openOnClick?: boolean;
}

export default MenuSingleButton;
