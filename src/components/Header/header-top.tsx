import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context";


const HeaderTop = ({}:HeaderTop) => {

  const [menus] = React.useState(React.useContext(MenusContext).header_top);

    return (
        <div id="header-top" className="header-top">
            {menus && menus.map((menu, key) => {
                return (<Menu key={key} prop_key={key} menu={menu}/>);
            })}
        </div>
    );
};

interface HeaderTop {

};

export default HeaderTop;
