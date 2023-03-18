import React from "react";

import "./professional-contact.css";

const ProfessionalContact = ({ from }:ProfessionalContact) => {
    return (
        <div className={`professional-contact main-container ${from}`}>
            <div className="opportunities">
                <div className="title">
                    Professional opportunities
                </div>
                <hr/>
                <div className="descr">
                    InMode is a fast paced innovative company with continuous growth opportunities. We are always looking for good candidates to join our team. If you are interested in working for InMode please submit a cover letter and resume to <a href="mailto:neil.wolfenden@inmodemd.com" target="_blank">neil.wolfenden@inmodemd.com</a>
                </div>
            </div>
            <div className="around-the-world">
                <div className="title">
                    contact us by mail
                </div>
                <hr/>
                <div className="distributors">
                    {
                        [
                            // {
                            //     'place': 'Amérique latine',
                            //     'mail': 'latam@inmodemd.com'
                            // },
                            // {
                            //     'place': 'Europe, Moyen-Orient, Afrique du Sud',
                            //     'mail': 'emea@inmodemd.com'
                            // },
                            // {
                            //     'place': 'Asie et Pacifique (APAC)',
                            //     'mail': 'apac@inmodemd.com'
                            // }
                            {
                                'place': 'Inmode UK',
                                'mail': 'neil.wolfenden@inmodemd.com'
                            }
                        ].map((distributor, key) => {
                            return (
                                <div className="distributor" key={key}>
                                    <div className="place">{distributor.place}</div>
                                    <a className="mail" href={`mailto:${distributor.mail}`}>{distributor.mail}</a>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};

interface ProfessionalContact {
    from: string;
}

export default ProfessionalContact;