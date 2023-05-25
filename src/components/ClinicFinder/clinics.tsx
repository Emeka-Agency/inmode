import React from "react";
import { _error, _log, _slog } from "../../functions/logger";
import { getById, selectAll, selectOne } from "../../functions/selectors";
import { Airtable_Clinic_Interface } from "../interfaces";
import LoadingGIF from "../LoadingGIF";

import "./clinics.css";

const ClinicsClinicalFinder = ({ clinics, loading }:ClinicsClinicalFinder) => {

    const [zipSearch, setZipSearch]:[any, React.Dispatch<any>] = React.useState(undefined);
    const [treatments, setTreatments]:[any, React.Dispatch<any>] = React.useState([]);

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

                const { zip_check, distance_check, treatments_check } = allCheck(clinic);

                zip_check == false && _log(`zip_check : ${zip_check ? true : false}`);
                distance_check == false && _log(`distance_check : ${distance_check ? true : false}`);
                treatments_check == false && _log(`treatments_check : ${distance_check ? true : false}`);

                document?.getElementById(clinic.id)?.classList.add('hidden');
            }
        });
    }

    const allCheck = (clinic:Airtable_Clinic_Interface) => {
        // ZIP CODE
        let zip_search = document?.querySelector('input#clinic-finder-search-zip');
        let zip_check = zip_search instanceof HTMLInputElement && zip_search.value == "" ? false : zipCheck(clinic, zip_search);
        
        // ZIP CODE
        let distance_search = document?.querySelector('#clinic-filter-distance-select');
        let distance_check = distance_search instanceof HTMLInputElement && distance_search.value == "" ? false : distanceCheck(clinic, distance_search, zip_search);
        
        // TREATMENTS
        let treatments_search = document?.querySelector('.clinic-finder-treatment-list');
        let treatments_check = treatments_search instanceof HTMLSelectElement ? treatmentsCheck(clinic, treatments_search) : true;
        console.log(treatments_check);
        treatments_search instanceof HTMLSelectElement && console.log(treatments_search.value);

        return {
            zip_search: zip_search,
            zip_check: zip_check,
            distance_search: distance_search,
            distance_check: distance_check,
            treatments_check: treatments_check,
        };
    }

    const displayable = (clinic?:Airtable_Clinic_Interface):boolean => {
        // _log("critere = ", critere);
        if(!clinic) {return false;}

        let retour = true;

        const {zip_check, distance_check, treatments_check} = allCheck(clinic);

        if(zip_check == false || distance_check == false) {return false;}
        if(zip_check == true && distance_check == true && treatments_check == false) {return false;}
        if(zip_check == true && distance_check == true && treatments_check == true) {return true;}

        return retour;
    }

    const zipCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.CodePostal == undefined) {_log("Cas zip_code undefined");return false;}
        if(elem == null) {_log("Cas elem null");return false;}

        let retour = false;
        if(clinic.CodePostal && elem instanceof HTMLInputElement && elem.value != "" && elem.value.length > 3) {
            _log("%czip_search", "background:black;font-weight:bold;font-size:16px;color:yellow");
            _log(`%c${clinic.CodePostal.toLowerCase()}.includes(${elem.value.toLowerCase()})`, 'background:red;color:green;');
            if(elem.value.length == 4 && clinic.Pays?.toLowerCase() == "belgique") {
                retour = true;
            }
            else if(elem.value.length == 5 && clinic.Pays?.toLowerCase() == "france") {
                retour = true;
            }
            else {
                retour = false;
            }
        }
        else if(clinic.CodePostal == undefined || elem.value == "") {retour = false;}
        return retour;
    }

    const distanceCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null, zip:any|null = null) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.CodePostal == undefined) {_log("Cas zip_code undefined");return false;}
        if(elem == null) {_log("Cas elem null");return false;}
        if(zip == null) {_log("Cas zip null");return false;}
        
        let retour = false;
        if(
            // (clinic.CodePostal.length == 5 && clinic.Pays?.toLowerCase() == "france" && elem.value == 0 && clinic.CodePostal == zip.value) ||
            (clinic.CodePostal.length == 5 && clinic.Pays?.toLowerCase() == "france" && elem.value == 10 && clinic.CodePostal.slice(0, 3) == zip.value.slice(0, 3)) ||
            (clinic.CodePostal.length == 5 && clinic.Pays?.toLowerCase() == "france" && elem.value == 50 && clinic.CodePostal.slice(0, 2) == zip.value.slice(0, 2)) ||
            // (clinic.CodePostal.length == 5 && clinic.Pays?.toLowerCase() == "france" && elem.value == 100) ||
            // (clinic.CodePostal.length == 4 && clinic.Pays?.toLowerCase() == "belgique" && elem.value == 0 && clinic.CodePostal == zip.value) ||
            (clinic.CodePostal.length == 4 && clinic.Pays?.toLowerCase() == "belgique" && elem.value == 10 && clinic.CodePostal.slice(0, 2) == zip.value.slice(0, 2)) ||
            (clinic.CodePostal.length == 4 && clinic.Pays?.toLowerCase() == "belgique" && elem.value == 50 && clinic.CodePostal.slice(0, 1) == zip.value.slice(0, 1)) ||
            (clinic.CodePostal.length == 4 && clinic.Pays?.toLowerCase() == "belgique" && elem.value == 100)
        ) {
            retour = true;
        }

        return retour;
    }

    const treatmentsCheck = (clinic?:Airtable_Clinic_Interface, elem:HTMLSelectElement|null = null) => {
        return true;
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.Machines == undefined) {_log("Cas Machines undefined");return false;}
        if(!(elem instanceof HTMLSelectElement)) {_log("Cas elems vide");return true;}

        console.log(elem);
        console.log(elem.value);
        return true;
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
            case "EvolveX": return "/workstation/evolve";
            case "Evoke": return "/workstation/evoke";
            case "Morpheus8 V": return "/technology/morpheus8v";
            case "DiolazeXL": return "/technology/diolazexl";
            case "MiniFX": return "/technology/minifx";
            case "Vasculaze": return "/technology/vasculaze";
            default: return null;
        }
    }

    const clean_machines = (machines?: string[]) => {
        return (machines ?? []).map(machine => {
            if(machine == "Tite" || machine == "Tone" || machine == "Trim" || machine == "Transform") {
                return "EvolveX";
            }
            else if(machine == "Evoke Thin" || machine == "Evoke Thick" || machine == "Evoke Chin" || machine == "Evoke Cheek") {
                return "Evoke";
            }
            return machine;
        }).filter((value, index, self) => self.indexOf(value) === index);
    }

    React.useEffect(() => {
        setTreatments(
            clinics.map(clinic => clinic.Machines?.join(',')).join(',').split(',')
            .filter((value, index, self) => self.indexOf(value) === index)
            .filter(el => el != undefined && el != null && el != "")
        );
    }, [zipSearch, clinics]);

    return (
        <>
            <h2 className="title">Cliniques Inmode</h2>
            <h3 className="subtitle">Liste des praticiens partenaires</h3>
            {/* <div id="search-clinic-indicator"><span>{rest}</span>/{clinics ? clinics.length : 0}</div> */}
            {/* <div id="search-clinic-indicator">{allByClass('clinic-item') ? allByClass('clinic-item').length : 0}/{clinics ? clinics.length : 0}</div> */}
            <div id="clinic-finder-filters">

                <span className="clinic-finder-search-zip-span"><input id="clinic-finder-search-zip" type="search" placeholder="Chercher par code postal"/></span>
                
                <span className="clinic-filter-distance neumorphic">
                    <select id="clinic-filter-distance-select" className="neumorphic">
                        {/* <option value="0" className="clinic-filter-distance">0 km</option> */}
                        <option value="10" className="clinic-filter-distance">10 km</option>
                        <option value="50" className="clinic-filter-distance">50 km</option>
                        {/* <option value="50" className="clinic-filter-distance">50 km</option> */}
                    </select>
                </span>

                <span id="clinic-finder-treatment-span" className="clinic-finder-treatment-span">
                    <span className="clinic-finder-treatment-title">Machines</span>
                    <select className="clinic-finder-treatment-list custom-scrollbar" multiple>
                        {(treatments ?? []).map((treatment:string, index:number) => {
                            return (
                                <option key={index} className="clinic-finder-treatment-elem" value={treatment}>{treatment}</option>
                            );
                        })}
                    </select>
                </span>

                <button id="clinic-finder-search-button" onClick={(e) => updateSearch(e)}>Rechercher</button>
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
                            className="clinic-item treatments hidden"
                        >
                            <div className="left-part">
                                <div className="clinic-name">
                                    {clinic.Client && clinic.Client}
                                </div>
                                <div className="clinic-address" >
                                    {[clinic.Adresse, [clinic.CodePostal ?? "", clinic.Ville ?? ""].join(', ')].join('\n')}
                                </div>
                                <div className="clinic-doctor">
                                    {/* {clinic.Nom && clinic.Nom} */}
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
                            </div>
                            {
                                clinic.Machines && clinic.Machines.length > 0
                                &&
                                <div className="clinic-treatments">
                                    {
                                        clean_machines(clinic.Machines).map((treatment:string, key:number) => {
                                            return (
                                                <span key={key}>
                                                    {treatment}
                                                    {treatmentURL(treatment) && <a className="absolute-link" href={treatmentURL(treatment) ?? "#"} title={treatment} target="_blank"></a>}
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