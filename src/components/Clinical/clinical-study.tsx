import { Link } from "gatsby";
import React, { useEffect } from "react";
import { format_title } from "../../functions/format_title";
import { InmodePanel_Generic_ClinicalStudies_Interface } from "../interfaces";

import { oneById, oneByClass } from "../../functions/selectors";
import { openModale, clinicalStudyPassword, closeModale } from '../../functions/modale';

import './index.css';
import { _log } from "../../functions/logger";

const ClinicalStudy = ({study, prop_key = null, able = false, _setAllowed}:ClinicalStudy) => {

    const [href, setHref] = React.useState(study.url);

    const modalePassword = (e:React.MouseEvent<HTMLDivElement, MouseEvent>):void => {
        e.preventDefault();
        openModale(clinicalStudyPassword({
            onOpen: () => {
                // MODALE CONTENT
                let input:HTMLInputElement|null = oneById('clinical-study-download-password');
                let inputStatus:HTMLSpanElement|null = oneById('clinical-study-download-password-status');
                let button:HTMLButtonElement|null = oneById('clinical-study-download-submit');

                if(input == null || inputStatus == null || button == null) {
                    return false;
                }

                input.focus();
                
                // MODALE INPUT
                input && input.addEventListener('keyup', (e) => {
                    _log(e);
                    if(e.key == "Enter") {
                        _log(1);
                        if(input && input.value != "" && inputStatus) {
                            _log(2);
                            if(!verifyPassword(input.value)) {
                                _log(3);
                                inputStatus.innerHTML = "Wrong password";
                                inputStatus.style.removeProperty('display');
                            }
                        }
                        else if(inputStatus != null) {
                            _log(4);
                            inputStatus.innerHTML = "Must enter a value";
                            inputStatus.style.removeProperty('display');
                        }
                    }
                    else {
                        if(input && input.value != "") {
                            button && button.classList.add('able');
                        }
                        else {
                            button && button.classList.remove('able');
                        }
                    }
                });
                // MODALE BUTTON
                button && button.addEventListener('click', (e) => {
                    _log(e);
                    _log(5);
                    if(input && input.value != "" && inputStatus) {
                        _log(6);
                        if(!verifyPassword(input.value)) {
                            _log(7);
                            inputStatus.innerHTML = "Wrong password";
                            inputStatus.style.removeProperty('display');
                        }
                    }
                    else if(inputStatus != null) {
                        _log(8);
                        inputStatus.innerHTML = "Must enter a value";
                        inputStatus.style.removeProperty('display');
                    }
                });
            }
        }));
    };

    function canDownload():boolean {
        if(typeof window != "undefined") {
            return window?.localStorage.getItem("inuk_studies_pass") == "true";
        }
        return false;
    }

    const verifyPassword = (pass:string):boolean => {
        _log("verifyPassword");
        if(pass == "InModeUK") {
            _log("Good password");
            let studyZone = document.querySelector('.study-download');
            _setAllowed(true);
            // OPEN THR LINK IN ANOTHER TAB
            if(typeof window != "undefined") {
                _log('Méthode window');
                window?.open(href, '_blank');
                window?.localStorage.setItem("inuk_studies_pass", 'true');
            }
            else {
                _log('Méthode a virtuel');
                let a:HTMLLinkElement = Object.assign(document.createElement('a'), {
                    id: 'study-download',
                    target: '_blank',
                    href: href,
                }).click();
                a.click();
                a.remove();
            }
            closeModale();
            scrollTo(0, studyZone ? studyZone.getBoundingClientRect().y : 0);
            return true;
        }
        _log("Bad password");
        return false;
    }
    
    return (
        <div key={prop_key} className="study-slide">
            <div className="study-img">
                <img
                    src={study.picture.localFile.childImageSharp.fluid.srcWebp}
                    srcSet={study.picture.localFile.childImageSharp.fluid.srcSetWebp}
                    alt="clinical-study"
                />
            </div>
            <div className="study-text">
                <div className="study-name">{study.title}</div>
                <div className="study-author">Authors : {study.author}</div>
                <div className="study-technologies">Technologies : 
                    {study.addons.map((addon, key2) => {
                        return (
                            <>
                                &nbsp;
                                <Link key={`${prop_key}-${key2}` || null} to={`/technology/${format_title(addon.Name)}`} /*title={format_title(addon.Name)}*/>
                                    {format_title(addon.Name)}
                                </Link>
                                &nbsp;
                            </>
                        );
                    })}
                </div>
                <div className="study-published">Publication date : {study.published_date}</div>
                <div className="study-publication">Publication : {study.publication}</div>
                <div className={`study-download ${able || canDownload() ? 'allowed' : 'blocked'}`}>
                    {/* TODO Ajouter mot de passe */}
                    Download
                    {
                        able || canDownload() ? 
                        <a 
                            className="zone-link"
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            title="Download the study"
                        ></a>
                        :
                        <div
                            className="zone-link"
                            onClick={(e) => {modalePassword(e);}}
                        ></div>
                    }
                </div>
            </div>
        </div>
    );
}

interface ClinicalStudy {
    study: InmodePanel_Generic_ClinicalStudies_Interface;
    prop_key?: number | null;
    able: boolean;
    _setAllowed: Function;
}

export default ClinicalStudy;