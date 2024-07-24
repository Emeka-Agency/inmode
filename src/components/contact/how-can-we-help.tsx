import { Link } from "gatsby";
import React from "react";

const HowCanWeHelp = ({ from }:HowCanWeHelp) => {
    return (
        <div className={`how-can-we-help main-container ${from}`}>
            <div className="title">Comment pouvons-nous vous aider ?</div>
            <div className="rule">Sélectionnez votre sujet ci-dessous</div>
            <hr/>
            <div className="topic">
                Trouver une <Link to="#" title="Clinique">clinique</Link>
            </div>
            <div className="topic">
                Questions à propos des <Link to="#" title="Traitements">traitements</Link>
            </div>
            <div className="topic">
                Questions sur <Link to="#" title="Technologies et machines">technologies et machines</Link>
            </div>
            <div className="topic">
                Demandes générales par <Link to="#" title="Mail">mail</Link> ou au <Link to="tel:+18559829199" title="Nous appeler">1.855.982.9199</Link>
            </div>
        </div>
    );
};

interface HowCanWeHelp {
    from: string;
};

export default HowCanWeHelp;