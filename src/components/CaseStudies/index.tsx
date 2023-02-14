import React from "react";
import { _log } from "../../functions/logger";
import { closeModale, openModale, routeCaseStudy } from "../../functions/modale";
import { getById } from "../../functions/selectors";
import { useImages } from "../contexts/images-provider";
import LoadingGIF from "../LoadingGIF";

import "./index.css";

const CaseStudies = ({ studies }:CaseStudies) => {

    if(!(studies instanceof Array) || (studies instanceof Array && studies.length == 0)) {
        return <></>;
    }

    const [auth, setAuth] = React.useState(null);

    const accessAuthorization = () => {
        if(typeof document != "undefined") {
            _log("Cas 1");
            openModale(routeCaseStudy({
                exit: true,
                onOpen: () => {
                    // MODALE CONTENT
                    let input:any = getById('route-case-study-password');
                    let inputStatus:any = getById('route-case-study-password-status');
                    let button:any = getById('route-case-study-submit');

                    if(input == null || inputStatus == null || button == null) {
                        return false;
                    }

                    input.focus();
                    
                    // MODALE INPUT
                    input && input.addEventListener('keyup', (e:KeyboardEvent) => {
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
                                else {
                                    setAuth(true);
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
                    button && button.addEventListener('click', (e:MouseEvent) => {
                        _log(e);
                        _log(5);
                        if(input && input.value != "" && inputStatus) {
                            _log(6);
                            if(!verifyPassword(input.value)) {
                                _log(7);
                                inputStatus.innerHTML = "Wrong password";
                                inputStatus.style.removeProperty('display');
                            }
                            else {
                                setAuth(true);
                            }
                        }
                        else if(inputStatus != null) {
                            _log(8);
                            inputStatus.innerHTML = "Must enter a value";
                            inputStatus.style.removeProperty('display');
                        }
                    });
                },
                onClose: () => {
                    if(
                        typeof window != "undefined" && window?.localStorage.getItem("case_studies_pass") != "true"
                    ) {
                        setAuth(false);
                    }
                }
            }));
        }
    }

    const verifyPassword = (pass:string):boolean => {
        _log("verifyPassword");
        if(pass == "InModeUK") {
            _log("Good password");
            // OPEN THR LINK IN ANOTHER TAB
            closeModale();
            if(typeof window != "undefined") {
                _log('Méthode window');
                window?.localStorage.setItem("case_studies_pass", 'true');
            }
            return true;
        }
        _log("Bad password");
        return false;
    }

    React.useEffect(() => {
        if(typeof window != "undefined" && window?.localStorage.getItem("case_studies_pass") != "true") {
            accessAuthorization();
        }
        else {
            setAuth(true);
        }
    }, []);

    const images = useImages();

    return (
        <div id="case-studies">
            <h2 className="page-title">Case studies</h2>
            {auth == null && <LoadingGIF/>}
            {auth == true ?
                studies.length > 0 ?
                    studies.map((study, index) => {
                        _log(study.icon);
                        _log(images.getOne(study.icon ?? "eventsNoImg").publicURL);
                        return (
                            <div className="case-study" key={index}>
                                <div className="img-case">
                                    <img
                                        src={study.icon ? images.getOne(study.icon).publicURL : images.getOne("eventsNoImg").publicURL}
                                        alt={study.alt ?? `Study ${index + 1}`}
                                    />
                                </div>
                                <div className="descr-case custom-scrollbar moz-scrollbar">
                                    {study.text && study.text.length && study.text.map((t, t_index) => {
                                        return (
                                            <div className="case-study-txt" key={t_index}>
                                                {t.length == 2 && <div className="case-study-txt-title">{t[0]}</div>}
                                                {t.length == 2 && <div className="case-study-txt-detail">{t[1]}</div>}
                                                {t.length == 1 && <><div className="case-study-txt-alone">{t[0]}</div><br/></>}
                                                {t.length == 0 && <br/>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                    :
                    <div className="case-study-no-study">There are currently no case studies</div>
                :
                auth == false && <div className="case-study-no-access">You got no right to access that area</div>
            }
        </div>
    );
};

interface CaseStudies {
    studies: {
        text?: string[][];
        icon?: string;
        alt?: string;
    }[];
};

export default CaseStudies;