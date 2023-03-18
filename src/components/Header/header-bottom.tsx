import React from 'react';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context"

const HeaderBottom = ({}:HeaderBottom) => {

    const [menus] = React.useState(React.useContext(MenusContext).header_bottom);

    return (
        <div id="header-bottom" className="header-bottom">
            {menus && menus.map((menu, key) => {
                return (<Menu key={key} prop_key={key} menu={menu}/>);
            })}
            <Link id="book-a-demo" to="/contact"><span className="label">book a demo</span></Link>
        </div>
    );
};

interface HeaderBottom {

};

export default HeaderBottom;