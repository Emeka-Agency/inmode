import React from "react";

const ProfessionalContact = ({ from }:ProfessionalContact) => {
    return (
        <div className={`professional-contact main-container ${from}`}>
            <div className="opportunities">
                <div className="title user-select-none">
                    Opportunités professionnelles
                </div>
                <hr/>
                <div className="descr user-select-none">
                InMode est une entreprise innovante qui ne cesse d’évoluer, avec des possibilités de croissance continue. Nous sommes toujours à la recherche de bons candidats pour rejoindre notre équipe. Si vous souhaitez rejoindre l’équipe InMode, veuillez envoyer une lettre de motivation ainsi que votre CV à <a href="mailto:hr@inmodemd.com">hr@inmodemd.com</a>.
                </div>
            </div>
            <div className="around-the-world">
                <div className="title user-select-none">
                    nous contacter par mail
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
                                'place': 'Inmode France',
                                'mail': 'contact.fr@inmodemd.com'
                            }
                        ].map((distributor, key) => {
                            return (
                                <div className="distributor" key={key}>
                                    <div className="place user-select-none">{distributor.place}</div>
                                    <a className="mail user-select-none" href={`mailto:${distributor.mail}`}>{distributor.mail}</a>
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
};

export default ProfessionalContact;