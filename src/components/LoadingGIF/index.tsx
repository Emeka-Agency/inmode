import React from 'react';

import './index.css';

const LoadingGIF = ({ customId = undefined, customClass = undefined, customStyle = undefined }:LoadingGIF) => {
    return (
        <div id={customId != undefined ? customId : ''} className={`loading-gif${customClass != undefined ? ' ' + customClass : ''}`} style={customStyle != undefined ? customStyle : {}}>
            <div className="loader-circle"></div>
            <div className="loader-bar"></div>
        </div>
    );
};

interface LoadingGIF {
    customId?: string;
    customClass?: string;
    customStyle?: React.CSSProperties;
};

export default LoadingGIF;