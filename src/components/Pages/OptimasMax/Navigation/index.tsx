import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const OptimasMaxNavigation = () => {

    let temp = [
        {'name': 'qu\'est-ce que c\'est', 'url': '#page-optimas_max-whatis'},
        {'name': 'avantages', 'url': '#page-optimas_max-whatis-section'},
        {'name': 'technologies associées', 'url': '#technologies'},
        {'name': 'avant / après', 'url': '#page-optimas_max-ba'},
        {'name': 'études cliniques', 'url': '#studies'},
    ];
    
    const [menus] = React.useState(temp);

    return (
        <div className="product-navigation">
            {menus.map((menu, key) => {
                return (
                    <div key={key} className={["product-nav", "teal"].join(' ')}>
                        <AnchorLink to={menu.url} className={["product-nav"].join(' ')} title={menu.name}>
                            {menu.name}
                        </AnchorLink>
                    </div>
                );
            })}
        </div>
    );
};

export default OptimasMaxNavigation;