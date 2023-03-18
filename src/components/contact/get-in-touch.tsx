import React from "react";

const GetInTouch = ({ from }:GetInTouch) => {
    return (
        // TODO rajouter main-container pour les container 1170px
        <section className="get-in-touch-container">
            <div className={`get-in-touch main-container ${from}`}>
                <div className="text">Get in touch</div>
                <hr/>
            </div>
        </section>
    );
};

interface GetInTouch {
    from: string;
}

export default GetInTouch;