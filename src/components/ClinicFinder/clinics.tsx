import React from "react";
import { _error, _log, _slog } from "../../functions/logger";
import { getById, selectAll, selectOne } from "../../functions/selectors";
import { Airtable_Clinic_Interface } from "../interfaces";
import LoadingGIF from "../LoadingGIF";

import "./clinics.css";

const ClinicsClinicalFinder = ({ clinics, loading }:ClinicsClinicalFinder) => {

    const [search, setSearch]:[any, React.Dispatch<any>] = React.useState(undefined);
    const [zipSearch, setZipSearch]:[any, React.Dispatch<any>] = React.useState(undefined);
    const [treatments, setTreatments]:[any, React.Dispatch<any>] = React.useState([]);
    
    const updateIndicator = (_part?:number, _tot?:number) => {
        _log(`updateIndicator(${_part}, ${_tot})`);
        if(_part == undefined || _tot == undefined) {return false;}
        
        let temp = getById("search-clinic-indicator");
        if(temp instanceof Element) {
            temp.innerText = `${_part}/${_tot}`;
        }
        temp = selectOne("#search-clinic-indicator-ui .search-clinic-indicator-ui-back");
        if(temp instanceof Element) {
            temp.style.width = `${(_part / _tot) * 100}%`;
        }
    }

    const switchTreatmentsOpened = (e:any) => {
        e.currentTarget.parentElement.parentElement.classList.contains('treatments') ?
        e.currentTarget.parentElement.parentElement.classList.remove('treatments') :
        e.currentTarget.parentElement.parentElement.classList.add('treatments');
    }

    const updateSearch = (e:React.ChangeEvent | React.MouseEvent, prevent = false) => {
        prevent && e.preventDefault();
        let total = 0;
        clinics.forEach(clinic => {
            if(clinic instanceof Array) {return false;}
            if(displayable(clinic) && clinic.id) {
                document?.getElementById(clinic.id)?.classList.remove('hidden');
                // _slog(clinic?.name + " is displayable", "background: green; color: white");
                total++;
            }
            else {
                // _slog(clinic?.name + " is NOT displayable", "background: red; color: white");

                const {general_check, zip_check, treatment_check} = allCheck(clinic);

                general_check == false && _log(`general_check : ${general_check ? true : false}`);
                zip_check == false && _log(`zip_check : ${zip_check ? true : false}`);
                treatment_check == false && _log(`treatment_check : ${treatment_check ? true : false}`);

                document?.getElementById(clinic.id)?.classList.add('hidden');
            }
        });
        updateIndicator(total, clinics.length);
    }

    const allCheck = (clinic:Airtable_Clinic_Interface) => {
        // GENERAL
        let general_search = document?.querySelector('input#clinic-finder-search');
        let general_check = general_search instanceof HTMLInputElement && general_search.value == "" ? true : generalCheck(clinic, general_search);

        // ZIP CODE
        let zip_search = document?.querySelector('input#clinic-finder-search-zip');
        let zip_check = zip_search instanceof HTMLInputElement && zip_search.value == "" ? true : zipCheck(clinic, zip_search);

        // TREATMENT
        let treatment_check = Array.from(document.querySelectorAll(`.clinic-finder-treatment-span .clinic-finder-treatment-list .clinic-finder-treatment-elem input[id^="treatment-"]:checked`) ?? []).length == 0 ? true : treatmentCheck(clinic);

        return {
            general_search: general_search,
            general_check: general_check,
            zip_search: zip_search,
            zip_check: zip_check,
            treatment_check: treatment_check
        };
    }

    const displayable = (clinic?:Airtable_Clinic_Interface):boolean => {
        // _log("critere = ", critere);
        if(!clinic) {return false;}

        let retour = true;

        const {general_search, general_check, zip_search, zip_check, treatment_check} = allCheck(clinic);

        if(general_check == false || zip_check == false || treatment_check == false) {return false;}

        if(
            zip_search instanceof HTMLInputElement && zip_search.value == "" &&
            general_search instanceof HTMLInputElement && general_search.value == ""
        ) {
            // _log(zip_search.value);
            // _log(general_search.value);
            retour = true;
        }

        return retour;
    }

    const generalCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null) => {
        if(elem == null) {return false;}
        if(clinic == undefined) {return false;}

        let retour = false;
        if(elem instanceof HTMLInputElement && elem.value != "") {
            // _slog("elem", "background:black;font-weight:bold;font-size:16px;color:yellow");
            if(
                (clinic.Client && clinic.Client.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.Nom && clinic.Nom.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.Adresse && clinic.Adresse.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.CodePostal && clinic.CodePostal.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.Ville && clinic.Ville.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.Pays && clinic.Pays.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.Telephone && clinic.Telephone.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.Email && clinic.Email.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.Site && clinic.Site.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                clinic.Machines instanceof Array && clinic.Machines.map((treat) => {
                    let elem = document?.querySelector('input#clinic-finder-search');
                    if(elem instanceof HTMLInputElement) {
                        if(treat.toLowerCase().includes(elem.value.replace(/ /gi, '').toLowerCase())) {
                            _log(`${treat.toLowerCase()}.includes(${elem.value.toLowerCase()})`);
                            return true;
                        }
                    }
                    return null;
                }, )
                .filter(e => e).length > 0
            ) {
                retour = true;
            }
        }
        else if(elem instanceof HTMLInputElement && elem.value == "") {retour = true;}
        return retour;
    }

    const zipCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.CodePostal == undefined) {_log("Cas zip_code undefined");return false;}
        if(elem == null) {_log("Cas elem null");return false;}

        let retour = false;
        if(clinic.CodePostal && elem instanceof HTMLInputElement && elem.value != "") {
            _log("%czip_search", "background:black;font-weight:bold;font-size:16px;color:yellow");
            if(clinic.CodePostal && clinic.CodePostal.toLowerCase().replace(/ /gi, '').includes(elem.value.toLowerCase().replace(/ /gi, ''))) {
                _log(`%c${clinic.CodePostal.toLowerCase()}.includes(${elem.value.toLowerCase()})`, 'background:red;color:green;');
                retour = true;
            }
        }
        else if(clinic.CodePostal == undefined || elem.value == "") {retour = true;}
        return retour;
    }

    const treatmentCheck = (clinic?:Airtable_Clinic_Interface) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.Machines == undefined) {_log("Cas treatments undefined");return false;}
        if(clinic.Machines.length == 0) {_log("Cas treatments.length == 0");return false;}

        return clinic.Machines instanceof Array && clinic.Machines.map((treat) => {
            return (():HTMLInputElement|any => getById(`treatment-${treat.toLowerCase()}`))()?.checked;
        }).filter(e => e).length > 0;
    }

    const treatmentURL = (treatment:string) => {
        if(treatment == undefined) {return null;}
        switch(treatment) {
            case "Diolaze": return "/technology/diolazexl";
            case "Fractora": return "/technology/fractora";
            case "Lumecca": return "/technology/lumecca";
            case "BodyFX": return "/technology/bodyfx";
            case "Forma": return "/technology/forma";
            case "Plus": return "/technology/plus";
            case "Morpheus8": return "/technology/morpheus8";
            case "FormaV": return "/technology/formav";
            case "Tite": return "/technology/tite";
            case "Trim": return "/technology/trim";
            case "Tone": return "/technology/tone";
            case "Evoke Chin": return "/workstation/evoke";
            case "Evoke Cheek": return "/workstation/evoke";
            case "Morpheus8 V": return "/technology/morpheus8v";
            case "DiolazeXL": return "/technology/diolazexl";
            case "MiniFX": return "/technology/minifx";
            case "Transform": return "/technology/trim";
            case "Vasculaze": return "/technology/vasculaze";
            default: return null;
        }
    }

    React.useEffect(() => {
        setTreatments(
            clinics.map(clinic => clinic.Machines?.join(',')).join(',').split(',')
            .filter((value, index, self) => self.indexOf(value) === index)
            .filter(el => el != undefined && el != null && el != "")
        );
        try {
            let _part = typeof document != "undefined" ? document.querySelectorAll('.clinic-item').length : 0;
            let _tot = clinics ? clinics.length : 0;
            updateIndicator(_part, _tot);
        }
        catch(err) {
            _error(err);
        }
    }, [search, zipSearch, clinics]);

    return (
        <>
            <h2 className="title">Cliniques Inmode</h2>
            <h3 className="subtitle">Liste des praticiens partenaires</h3>
            {/* <div id="search-clinic-indicator"><span>{rest}</span>/{clinics ? clinics.length : 0}</div> */}
            {/* <div id="search-clinic-indicator">{allByClass('clinic-item') ? allByClass('clinic-item').length : 0}/{clinics ? clinics.length : 0}</div> */}
            <div id="clinic-finder-filters">
                <span className="clinic-finder-search-zip-span"><input id="clinic-finder-search-zip" type="search" placeholder="Chercher par code postal" onChange={(e) => updateSearch(e)}/></span>
                <span className="clinic-finder-search-span"><input id="clinic-finder-search" type="search" placeholder="Chercher par praticien, ville, rue, etc" onChange={(e) => updateSearch(e)}/></span>
                <span className="clinic-finder-treatment-span">
                    <span className="clinic-finder-treatment-title">Traitements</span>
                    <ul className="clinic-finder-treatment-list custom-scrollbar">
                        {(treatments ?? []).map((treatment:string, index:number) => {
                            return (
                                <li key={index} className="clinic-finder-treatment-elem">
                                    <input type="checkbox" id={`treatment-${treatment.toLowerCase()}`} name={`treatment-${treatment.toLowerCase()}`} value={treatment} onClick={(e) => updateSearch(e, false)}/>
                                    <label htmlFor={`treatment-${treatment.toLowerCase()}`}>{treatment}</label>
                                </li>
                            );
                        })}
                    </ul>
                </span>
            </div>
            {!loading && <div id="search-clinic-indicator">{clinics instanceof Array && `${clinics.length}/${clinics.length}`}</div>}
            <div id="search-clinic-indicator-ui">
                <div className="search-clinic-indicator-ui-back"></div>
            </div>
            <div className="bottom-border"></div>
            {
                loading && <LoadingGIF customClass="clinic-finder-loader"/>
            }
            {!loading && clinics && clinics.map((clinic:Airtable_Clinic_Interface | [], key:number) => {
                // if(clinic && displayable(clinic, search) && displayable(clinic, zipSearch)) {
                    // Object.keys(clinic).forEach((elem) => elem ? elem.length < 2 ? undefined : elem : undefined);
                    if(clinic instanceof Array) {return null;}
                    return (
                        <div
                            key={key}
                            id={clinic.id}
                            className="clinic-item"
                        >
                            <div className="left-part">
                                <div className="clinic-name">
                                    {clinic.Client && clinic.Client}
                                </div>
                                <div className="clinic-address" >
                                    {[clinic.Adresse, [clinic.CodePostal ?? "", clinic.Ville ?? ""].join(', ')].join('\n')}
                                </div>
                                <div className="clinic-doctor">
                                    {/* {clinic.Nom && clinic.Nom} */}{""}
                                </div>
                            </div>
                            <div className="right-part">
                                <div className={`clinic-url${!clinic.Site ? ' no-data' : ''}`}>
                                    {
                                        clinic.Site ?
                                        <a target="_blank" href={`http://${(clinic.Site || "").replace("https://", "").replace("http://", "")}`} title="Site de la clinique" style={{color: "var(--teal)", cursor: "pointer"}}>
                                            Notre site
                                        </a>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className={`clinic-mail${!clinic.Email ? ' no-data' : ''}`}>
                                    {
                                        clinic.Email != undefined ?
                                        <a href={`mailto:${clinic.Email}`} title="Envoyer un mail">
                                            {clinic.Email}
                                        </a>
                                        :
                                        <a></a>
                                    }
                                </div>
                                <div className={`clinic-phone${!clinic.Telephone ? ' no-data' : ''}`}>
                                    {
                                        clinic.Telephone != undefined ?
                                        <a href={`phone:${clinic.Telephone}`} title="Appeler">
                                            {clinic.Telephone}
                                        </a>
                                        :
                                        <a></a>
                                    }
                                </div>
                                {clinic.Machines && clinic.Machines.length > 0 ?
                                    <button
                                        className="clinic-switch-treatments"
                                        onClick={switchTreatmentsOpened}
                                    >
                                        Traitements disponibles
                                    </button>
                                    :
                                    null
                                }
                            </div>
                            {
                                clinic.Machines && clinic.Machines.length > 0
                                &&
                                <div className="clinic-treatments">
                                    {
                                        clinic.Machines.map((treatment, key:number) => {
                                            return (
                                                <span key={key}>
                                                    {treatment}
                                                    {treatmentURL(treatment) && <a className="absolute-link" href={treatmentURL(treatment)} title={treatment} target="_blank"></a>}
                                                </span>
                                            );
                                        })
                                    }
                                </div>
                            }
                        </div>
                    )
                // }
            })}
        </>
    );
};

interface ClinicsClinicalFinder {
    clinics: Array<Airtable_Clinic_Interface>;
    loading: boolean;
};

export default ClinicsClinicalFinder;