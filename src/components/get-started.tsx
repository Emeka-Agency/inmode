import { Link } from "gatsby";
import React from "react";

const GetStarted = ({ from = null }:GetStarted) => {
    return (
        <div className="get-started">
            <div className="container">
                <p>Lancez-vous</p>
                <h2>Laquelle de nos technologies pourrait vous être utile ?</h2>
                <Link to="/contact" title="Contactez-nous">Contactez-nous</Link>
            </div>
        </div>
    );
};

interface GetStarted {
    from?: string | null;
};

export default GetStarted;