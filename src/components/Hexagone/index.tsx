import React from "react";

import "./index.css";

const InmodeHex = ({classes = [], outer = "platinum", inner = "pearl"}:InmodeHex) => {

    return (
        <div className={`inmode-hex ${classes.join(' ')}`}>
            <div className={`inner ${inner}`}></div>
            <div className={`outer ${outer}`}>
                {/* <div className="outer-border outer-border-1"></div> */}
                {/* <div className="outer-border outer-border-2"></div> */}
                {/* <div className="outer-border outer-border-3"></div> */}
                {/* <div className="outer-border outer-border-4"></div> */}
                {/* <div className="outer-border outer-border-5"></div> */}
                {/* <div className="outer-border outer-border-6"></div> */}
            </div>
        </div>
    );
};

interface InmodeHex {
    classes?: string[];
    outer?: string;
    inner?: string;
};

export default InmodeHex;