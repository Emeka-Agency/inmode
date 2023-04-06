import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context";

import "./header-right.css";

const HeaderRight = ({}:HeaderRight) => {

    const [menus] = React.useState(React.useContext(MenusContext).header_right);

    return (
        <div id="header-right" className="header-right">
            {menus && menus.map((menu, key) => {
                return (<Menu key={key} prop_key={key} menu={menu}/>);
            })}
        </div>
    );
};

interface HeaderRight {

};

export default HeaderRight;