import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const ProductNavigation = ({ name, exist }:ProductNavigation_Interface) => {

    let temp = [
        {'name': 'what is it', 'url': '#what-is'},
        {'name': 'key benefits', 'url': '#key-benefits'},
        {'name': 'technologies on the workstation', 'url': '#technologies'},
    ];

    if(exist['studies']) {
        temp.push({'name': 'clinical studies', 'url': '#studies'});
    }

    if(exist['before-after']) {
        temp.splice(3, 0, {'name': 'before and after\'s', 'url': '#before-after'}).join();
    }
    
    const [menus] = React.useState(temp);

    return (
        <div className="product-navigation">
            {menus.map((menu, key) => {
                return (
                    <div key={key} className="product-nav">
                        <AnchorLink to={menu.url} className="product-nav" title={menu.name}>
                            {menu.name}
                        </AnchorLink>
                    </div>
                );
            })}
        </div>
    );
}

interface ProductNavigation_Interface {
    name: string;
    exist: {
        'before-after': boolean;
        'studies': boolean;
    };
}

export default ProductNavigation;