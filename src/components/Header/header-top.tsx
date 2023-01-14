import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context"
import MenuSingleText from '../menu/single-text';

const HeaderTop = ({}:HeaderTop) => {

  const [menus] = React.useState(React.useContext(MenusContext).header_top);

    return (
        <div id="header-top" className="header-top">
            <MenuSingleText
                menu={{
                    title: "Home",
                    url: "/",
                    type: "text",
                    variant: "single",
                    parent_menu: true,
                    internal_link: true,
                }}
                prop_key={0}
            />
            {menus && menus.map((menu, key) => {
                return (<Menu key={key} prop_key={key} menu={menu}/>);
            })}
        </div>
    );
};

interface HeaderTop {

};

export default HeaderTop;
