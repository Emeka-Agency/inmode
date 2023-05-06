import { Link } from "gatsby";
import React from "react";
import { useImages } from "../contexts/images-provider";

import "./index.css";
import { getById } from "../../functions/selectors";

const TopBar = (__datas:TopBar) => {

    if(typeof window != "undefined" && window.sessionStorage.getItem('topbar') == 'closed') {
        return <></>;
    }

    const images = useImages();
    const [opened, setOpened]:[boolean, React.Dispatch<boolean>] = React.useState(true);

    const removeTopBar = (e:Event) => {
        e.preventDefault();
        if(typeof window != "undefined") {
            window.sessionStorage.setItem('topbar', 'closed');
        }
        getById('top-bar')?.classList.add('closed');
        setOpened(false);
    }

    React.useEffect(() => {

    }, [opened]);

    if(!opened) {
        return <></>;
    }

    return (
        <div id="top-bar">
            <span>Discover our new <Link to="/workstation/empower-rf">Empower RF</Link> and <Link to="/workstation/evolve-x">EvolveX</Link> devices</span>
            <img className="close-topbar" src={images.resolve_img('closeWhiteIcon')} alt="close-white" onClick={(e) => removeTopBar(e)}/>
        </div>
    );
};

interface TopBar {

};

export default TopBar;