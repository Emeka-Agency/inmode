import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import { Link } from 'gatsby';

// TODO Create inmode-panel object

const PrivacyPolicies = (  ) => {
    return (
        <Layout title="legals">
            <SEO lang="fr" title="Mentions légales"/>
            <div id="page-legals">
                <div className="container">
                    <div className="main-title">Mentions légales</div>
                    <div className="title">Identification :</div>
                    <div className="content">
                        INMODE FRANCE
                    </div>
                    <div className="content">
                        Société :  IMD FRANCE
                    </div>
                    <div className="content">
                        Siège social : 12 place Dauphine, 75001 PARIS
                    </div>
                    <div className="content">
                        SARL au capital de 5000€
                    </div >
                    <div className="content">
                        SIRET : 884 502 980 000 11
                    </div>
                    <div className="content">
                        RCS B 884 502 980 Paris
                    </div>


                    <div className="title">Directeur(s) de la publication : </div>
                    <div className="content">
                        Julie PETIGAS
                    </div>
                    <div className="content">
                        Directrice des Opérations Commerciales et Marketing InMode France
                    </div>
                    <div className="content">
                        Adresse mail : <a href="mailto:marketing.fr@inmodemd.com">marketing.fr@inmodemd.com</a>
                    </div>
                    <div className="content">
                        Téléphone : <a href="tel:+33146805551">+33 (0)1 46 80 55 51</a>
                    </div>
                    
                    
                    <div className="title">Développement</div>
                    <div className="content">
                        <span style={{fontWeight: 'bold'}}>Agence Emeka</span> - Kévin Lesieutre
                    </div>
                    <div className="content">
                        124, rue de Crimée, 13003 Marseille
                    </div>
                    <div className="content">
                        Adresse mail : <a href="mailto:contact@emeka.fr">contact@emeka.fr</a>
                    </div>
                    <div className="content">
                        Site : <a href="https://emeka.fr">emeka.fr</a>
                    </div>


                    <div className="title">Hébergement :</div>
                    <div className="content">
                        <span style={{fontWeight: "bold"}}>O2switch</span>
                    </div>
                    <div className="content">
                        Siège social : 224, Boulevard Gustave Flaubert, 63000 Cerlmont-Ferrand
                    </div>
                    <div className="content">
                        SARL au capital de 100 000€
                    </div>
                    <div className="content">
                        SIRET : 510 909 807 00024
                    </div>
                    <div className="content">
                        RCS Clermont Ferrand
                    </div>
                    <div className="content">
                        Téléphone: <a href="tel:+33444446040">+33 (0)4 44 44 60 40</a>
                    </div>

                    <div className="title">PROPRIÉTÉ INTELLECTUELLE</div>
                    <div className="content">Les données, textes, identités visuelles, logo, images et informations sont la propriété de la société IMD FRANCE et sont protégés à ce titre par les dispositions du code de la propriété intellectuelle. Toutes les personnnes utilisant le site s'engagent à n'en faire usage que dans le cadre offert par le site.</div>
                    <div className="content">Consulter notre <Link to="/privacy-policy">Politique de Confidentialité</Link> et nos <Link to="/cgu">Conditions Générales d'Utilisation</Link></div>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicies;