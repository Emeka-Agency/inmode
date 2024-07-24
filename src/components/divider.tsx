import React from "react";

const Divider = ({position, specialBackground = undefined, specialFill = undefined}:Divider) => {

    return (
        <div className={`divider-${position}`} style={{backgroundColor: specialBackground || undefined}}>
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill" style={{fill: specialFill || undefined}}></path>
            </svg>
        </div>
    );
};

interface Divider {
    position: string;
    specialBackground?: string;
    specialFill?: string;
};

export default Divider;