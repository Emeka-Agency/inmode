import React from "react";
import { AnchorLink } from "gatsby-plugin-anchor-links";

const AddonNavigation = ({ name, exist = {} }:AddonNavigation) => {

    let temp = [
        {'name': 'qu\'est-ce que c\'est', 'url': '#what-is'},
        {'name': 'before and after\'s', 'url': '#before-after'},
        {'name': 'what can you treat', 'url': '#what-treat'},
    ];

    if(exist['studies']) {
        temp.push({'name': 'études cliniques', 'url': '#studies'});
    }

    const [menus] = React.useState(temp);

    return (
        <div className="addon-navigation">
            {menus.map((menu, key) => {
                return (
                    <div key={key} className="addon-nav">
                        <AnchorLink to={menu.url} className="addon-nav" title={menu.name}>
                            {menu.name}
                        </AnchorLink>
                    </div>
                );
            })}
        </div>
    );
};

interface AddonNavigation {
    name?: string;
    exist?: {
        'before-after'?: boolean;
        'studies'?: boolean;
    };
};

export default AddonNavigation;