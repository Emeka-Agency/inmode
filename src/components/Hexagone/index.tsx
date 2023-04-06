import React from "react";

import "./index.css";

const InmodeHex = ({classes = [], outer = "platinum", inner = "pearl"}:InmodeHex) => {

    return (
        <div className={`inmode-hex ${classes.join(' ')}`}>
            <div className={`outer ${outer}`}></div>
            <div className={`inner ${inner}`}></div>
        </div>
    );
};

interface InmodeHex {
    classes?: string[];
    outer?: string;
    inner?: string;
};

export default InmodeHex;