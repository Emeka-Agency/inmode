import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const ProductNavigation = ({ name, exist }:ProductNavigation_Interface) => {

    let temp = [
        {'name': 'qu\'est-ce que c\'est', 'url': '#what-is'},
        {'name': 'avantages', 'url': '#key-benefits'},
        {'name': 'technologies associées', 'url': '#technologies'},
    ];

    if(exist['studies']) {
        temp.push({'name': 'études cliniques', 'url': '#studies'});
    }

    if(exist['before-after']) {
        temp.splice(3, 0, {'name': 'avant / après', 'url': '#before-after'}).join();
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
};

interface ProductNavigation_Interface {
    name: string;
    exist: {
        'before-after': boolean;
        'studies': boolean;
    };
};

export default ProductNavigation;