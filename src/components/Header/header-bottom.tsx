import React from 'react';
import { Link } from 'gatsby';
import Menu from '../menu';
import MenusContext from "../contexts/menus-context";

import "./header-bottom.css";
import { useImages } from '../contexts/images-provider';

const HeaderBottom = ({}:HeaderBottom) => {

    const [menus] = React.useState(React.useContext(MenusContext).header_bottom);

    const images = useImages();

    return (
        <div id="header-bottom" className="header-bottom">
            <div className="header-logo background-image" style={{backgroundImage: 'url('+ images.resolve_img('footerLogo3') +')'}}>
                <Link to="/" className="absolute-link" title="Inmode"></Link>
            </div>
            <div className="header-bottom-menus">
                {menus && menus.map((menu, key) => {
                    return (<Menu key={key} prop_key={key} menu={menu}/>);
                })}
            </div>
        </div>
    );
};

interface HeaderBottom {

};

export default HeaderBottom;