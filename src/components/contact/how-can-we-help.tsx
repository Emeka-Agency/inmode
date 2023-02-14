import { Link } from "gatsby";
import React from "react";

const HowCanWeHelp = ({ from }:HowCanWeHelp) => {
    return (
        <div className={`how-can-we-help main-container ${from}`}>
            <div className="title">How can we help ?</div>
            <div className="rule">Select your subject beneath</div>
            <hr/>
            <div className="topic">
                Find a <Link to="#" title="Clinic">clinic</Link>
            </div>
            <div className="topic">
                Question about the <Link to="#" title="Treatments">treatments</Link>
            </div>
            <div className="topic">
                Question about <Link to="#" title="Technologies and workstations">technologies and workstations</Link>
            </div>
            <div className="topic">
                General askings by <a to="mailto:neil.wolfenden@inmodemd.com" target="_blank" title="Mail">mail</a> or at <Link to="tel:+18559829199" title="Call us">1.855.982.9199</Link>
            </div>
        </div>
    );
};

interface HowCanWeHelp {
    from: string;
}

export default HowCanWeHelp;