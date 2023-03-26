import React from "react";

const GetInTouch = ({ from }:GetInTouch) => {
    // TODO rajouter main-container pour les container 1170px
    return (
        <div className={`get-in-touch main-container ${from}`}>
            <div className="text">
                Get in touch
            </div>
            <hr/>
        </div>
    );
};

interface GetInTouch {
    from: string;
};

export default GetInTouch;