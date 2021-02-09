import React from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links";

const AddonNavigation = ({ name, exist = {} }) => {

    let temp = [
        {'name': 'what is it', 'url': '#what-is'},
        {'name': 'before and after\'s', 'url': '#before-after'},
        {'name': 'what can you treat', 'url': '#what-treat'},
    ];

    if(exist['studies']) {
        temp.push({'name': 'clinical studies', 'url': '#studies'});
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
}

AddonNavigation.defaultProps = {

}

AddonNavigation.propTypes = {

}

export default AddonNavigation;