import { Link } from "gatsby";
import React from "react";
import { useImages } from "../contexts/images-provider";

import "./index.css";
import { getById, selectOne } from "../../functions/selectors";

const TopBar = (__datas:TopBar) => {

    if(typeof window != "undefined" && window.sessionStorage.getItem('topbar') == 'closed') {
        selectOne('main')?.classList.add('top-bar-closed');
        selectOne('footer')?.classList.add('top-bar-closed');
        return <></>;
    }

    const images = useImages();
    const [opened, setOpened]:[boolean, React.Dispatch<boolean>] = React.useState(false);

    const removeTopBar = (e:Event) => {
        e.preventDefault();
        if(typeof window != "undefined") {
            window.sessionStorage.setItem('topbar', 'closed');
        }
        getById('top-bar')?.classList.add('closed');
        selectOne('main')?.classList.add('top-bar-closed');
        selectOne('footer')?.classList.add('top-bar-closed');
        setOpened(false);
    }

    React.useEffect(() => {
        selectOne('main')?.classList[opened ? 'remove' : 'add']('top-bar-closed');
        selectOne('footer')?.classList[opened ? 'remove' : 'add']('top-bar-closed');
    }, [opened]);

    React.useEffect(() => {
        setOpened(typeof window != "undefined" && window.sessionStorage.getItem('topbar') == 'closed' ? false : true);
    }, []);

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