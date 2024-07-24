import React from "react";

const AddonDivider = ({ position }:AddonDivider) => {

    return (
        <div className={`addon-divider-${position}`}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
            </svg>
        </div>
    );
};

interface AddonDivider {
    position: string | number;
};

export default AddonDivider;