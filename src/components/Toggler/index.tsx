import React from 'react';

import './index.css';

const Toggle = ({ label, title, on_toggle, label_on, label_off, param, base_toggled = false, base_indeterminate = false, togglable = true }:Toggle) => {

    const [toggled, setToggled]:[boolean, React.Dispatch<boolean>] = React.useState(base_toggled);
    const [indeterminate, setIndeterminate]:[boolean, React.Dispatch<boolean>] = React.useState(base_toggled === false && base_indeterminate === true);

    const toggle = () => {
        if(togglable === false) {return false;}
        setToggled(toggled === true ? false : true);
    }

    React.useEffect(() => {
        on_toggle instanceof Function && on_toggle(param, toggled);
    }, on_toggle instanceof Function ? [toggled] : []);

    return (
        <button
            onClick={toggle}
            type="button"
            className="toggle-button"
            data-param={param}
            data-toggled={toggled ? "on" : "off"}
            disabled={togglable === true ? false : true}
            data-indeterminate={indeterminate ? "on" : "off"}
            data-togglable={togglable ?  "on" : "off"}
            role="switch"
            aria-checked="false"
            aria-labelledby="density-result-complement-toggle-cluster-label"
        >
            <span aria-hidden="true" className="toggle-cursor"></span>
        </button>
    );
};

interface Toggle {
    label?: string;
    label_position?: "left" | "right" | "top" | "bottom";
    title?: string;
    on_toggle?: Function;
    label_on?: string;
    label_off?: string;
    param: string;
    base_toggled?: boolean;
    base_indeterminate?: boolean;
    togglable?: boolean;
};

export default Toggle;