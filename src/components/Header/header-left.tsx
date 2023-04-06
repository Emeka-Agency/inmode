import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context"
import MenuSingleText from '../menu/single-text';

import "./header-left.css";

const HeaderLeft = ({}:HeaderLeft) => {

  const [menus] = React.useState(React.useContext(MenusContext).header_left);

    return (
        <div id="header-left" className="header-left">
            {menus && menus.map((menu, key) => {
                return (<Menu key={key} prop_key={key} menu={menu}/>);
            })}
        </div>
    );
};

interface HeaderLeft {

};

export default HeaderLeft;
