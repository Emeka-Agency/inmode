import React from "react";
import Cookies from "js-cookie";
import { Link } from "gatsby";

import { useImages } from '../contexts/images-provider';
import PrivacySettings from "../PrivacySettings";
import { enableMainScroll, disableMainScroll } from '../../functions/modale';

const __cookies = [
    "imdfr-necessary",
    "imdfr-functionnals",
    "imdfr-analytics",
    "imdfr-performance",
    "imdfr-adds"
];

import "./index.css";

const PrivacyPolicy = ({  }:PrivacyPolicy) => {

    const images = useImages();

    const [needsPrivacy, setNeedsPrivacy]:[boolean, React.Dispatch<boolean>] = React.useState(false);
    const [settingsOpened, setSettingsOpened]:[boolean, React.Dispatch<boolean>] = React.useState(false);

    function tout_accepter() {
        __cookies.forEach(_c => Cookies.set(_c, "true"));
        setNeedsPrivacy(false);
        setSettingsOpened(false);
    }

    function tout_refuser() {
        __cookies.slice(0, 2).forEach(_c => Cookies.set(_c, "true"));
        __cookies.slice(2).forEach(_c => Cookies.set(_c, "false"));
        setNeedsPrivacy(false);
        setSettingsOpened(false);
    }

    React.useEffect(() => {
        setNeedsPrivacy(__cookies.map(_c => Cookies.get(_c) ? true : false).findIndex(el => el === false) > -1 ? true : false);
    }, [settingsOpened]);

    React.useEffect(() => {
        settingsOpened || needsPrivacy ? disableMainScroll() : enableMainScroll();
    }, [settingsOpened, needsPrivacy]);

    return (
        <>
            {needsPrivacy && settingsOpened == false ? <section id="privacy-policy" data-privacy={needsPrivacy ? "on" : "off"}>
                <div className="privacy-policy-main">
                    <div id="privacy-policy-mask"></div>
                    <div id="privacy-policy-bandeau">
                        <p id="privacy-bandeau-text" className="custom-scrollbar">Notre site inmodemd.fr et nos partenaires utilisent des cookies pour améliorer votre expérience sur le site. Les cookies catégorisés comme « nécessaires » sont enregistrés sur votre navigateur car ils sont essentiels pour le bon fonctionnement du site (fonctionnalités, sécurité). Nous utilisons également d’autres cookies qui permettent d’analyser et de mieux comprendre l’utilisation du site. Ces derniers sont enregistrés sur votre navigateur avec votre consentement. Vous avez la possibilité de gérer l’activation de certains de ces cookies (cela pouvant affecter votre expérience de navigation). Nous conservons votre choix pendant 6 mois. Vous pouvez changer d’avis à tout moment en cliquant sur l’icône « gestion des cookies » en bas de chaque page de notre site. Consulter notre <Link to="/privacy-policy" target="_blank">politique de confidentialité</Link></p>
                        <div id="privacy-bandeau-boutons">
                            <button id="privacy-accept-all" onClick={tout_accepter}>Tout accepter</button>
                            <button id="privacy-reject-all" onClick={tout_refuser}>Tout refuser</button>
                            <button id="open-privacy-settings" onClick={() => setSettingsOpened(true)}>Personnaliser mon choix</button>
                        </div>
                    </div>
                </div>
            </section> : <></>}
            {settingsOpened ? <PrivacySettings onClose={(e?:any) => setSettingsOpened(false)}/> : <></>}
            {settingsOpened || needsPrivacy ? <></> : <div id="privacy-policy-edit" onClick={(e?:any) => setSettingsOpened(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"/></svg>
                <span>Modifier vos préférences</span>
            </div>}
        </>
    );
};

interface PrivacyPolicy {

};

export default PrivacyPolicy;