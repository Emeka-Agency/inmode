import React from "react";
import { _error, _log, _slog } from "../../functions/logger";
import { Airtable_Clinic_Interface, Geo_Position } from "../interfaces";
import LoadingGIF from "../LoadingGIF";

import "./clinics.css";
import { address_to_coordinates, is_in_radius } from "./functions";
import { handlePromise } from "../../functions/tools";

const ClinicsClinicalFinder = ({ clinics, loading }:ClinicsClinicalFinder) => {

    const [treatments, setTreatments]:[any, React.Dispatch<any>] = React.useState([]);

    const updateSearch = async (e:React.ChangeEvent | React.MouseEvent, prevent = false) => {
        if(typeof document == "undefined") {return false;}
        prevent && e.preventDefault();
        let total = 0;
        let geo_pos = await address_to_coordinates(document?.querySelector('input#clinic-finder-search-zip')?.value);
        clinics.forEach(clinic => {
            if(clinic instanceof Array) {return false;}
            if(geo_pos != null && displayable(clinic, geo_pos) && clinic.id) {
                document?.getElementById(clinic.id)?.classList.remove('hidden');
                total++;
            }
            else {
                const { zip_check, distance_check, treatments_check } = allCheck(clinic, geo_pos);

                zip_check == false && _log(`zip_check : ${zip_check ? true : false}`);
                distance_check == false && _log(`distance_check : ${distance_check ? true : false}`);
                treatments_check == false && _log(`treatments_check : ${distance_check ? true : false}`);

                document?.getElementById(clinic.id)?.classList.add('hidden');
            }
        });
    }

    const allCheck = (clinic:Airtable_Clinic_Interface, geo_pos:Geo_Position|null) => {
        // ZIP CODE
        let zip_search = document?.querySelector('input#clinic-finder-search-zip');
        let zip_check = zip_search instanceof HTMLInputElement && zip_search.value == "" ? false : zipCheck(clinic, zip_search);
        
        // DISTANCE
        let distance_search = document?.querySelector('#clinic-filter-distance-select');
        let distance_check = distance_search instanceof HTMLInputElement && distance_search.value == "" ? false : distanceCheck(clinic, distance_search, zip_search);
        
        // TREATMENTS
        let treatments_search = Array.from(document?.querySelectorAll('.clinic-finder-treatment-list li input[type="checkbox"]'));
        let treatments_check = treatments_search.length == 0 || [0, treatments_search.length].indexOf(treatments_search.map((el:any) => el.checked).filter(t => t).length) > -1 ? true : treatmentsCheck(clinic, treatments_search);

        let distance = distance_search instanceof HTMLSelectElement ? parseInt(distance_search.value) : 10;
        let geocode_check = is_in_radius(clinic, geo_pos, distance);

        return {
            zip_search: zip_search,
            zip_check: zip_check,
            distance_search: distance_search,
            distance_check: distance_check,
            treatments_check: treatments_check,
            geocode_check: geocode_check
        };
    }

    const displayable = (clinic:Airtable_Clinic_Interface, geo_pos:Geo_Position):boolean => {
        if(!clinic) {return false;}

        let retour = true;

        const {zip_check, distance_check, treatments_check, geocode_check} = allCheck(clinic, geo_pos);

        if(geocode_check == false) {return false;}
        if(geocode_check == false && (zip_check == false || distance_check == false)) {return false;}
        if(zip_check == true && distance_check == true && treatments_check == false) {return false;}
        if(zip_check == true && distance_check == true && treatments_check == true) {return true;}
        if(treatments_check == false) {return false;}

        return retour;
    }

    const zipCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.CodePostal == undefined && clinic.Ville == undefined) {_log("Cas zip_code et ville undefined");return false;}
        if(elem == null) {_log("Cas elem null");return false;}

        let retour = false;
        let zip_code = parseInt(elem.value) ? parseInt(elem.value) : null;
        let city = elem.value.replace(/[0-9]/gi, '').trim();
        if(((clinic.CodePostal != null && zip_code != null) || (clinic.Ville != null && city != null)) && elem instanceof HTMLInputElement && elem.value != "") {
            if(zip_code != null) {
                if(zip_code.toString().length == 4 && clinic.Pays?.toLowerCase() == "belgique") {
                    retour = true;
                }
                else if(zip_code.toString().length == 5 && clinic.Pays?.toLowerCase() == "france") {
                    return true;
                }
                else if((elem.value[0] == "0" && elem.value.length == 5) && clinic.Pays?.toLowerCase() == "france") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if(city != null) {
                return clinic.Ville.toLowerCase().includes(city.toLowerCase());
            }
        }
        else if(clinic.CodePostal == undefined || elem.value == "") {return false;}
        return retour;
    }

    const distanceCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null, zip:any|null = null) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.CodePostal == undefined) {_log("Cas zip_code undefined");return false;}
        if(elem == null) {_log("Cas elem null");return false;}
        if(zip == null) {_log("Cas zip null");return false;}
        
        let retour = false;
        if(
            clinic.Ville?.toLowerCase() == zip.value.trim().toLowerCase() ||
            (clinic.CodePostal.length == 5 && clinic.Pays?.toLowerCase() == "france" && elem.value == 10 && clinic.CodePostal.slice(0, 3) == zip.value.slice(0, 3)) ||
            (clinic.CodePostal.length == 5 && clinic.Pays?.toLowerCase() == "france" && elem.value == 50 && clinic.CodePostal.slice(0, 2) == zip.value.slice(0, 2)) ||
            (clinic.CodePostal.length == 4 && clinic.Pays?.toLowerCase() == "belgique" && elem.value == 10 && clinic.CodePostal.slice(0, 2) == zip.value.slice(0, 2)) ||
            (clinic.CodePostal.length == 4 && clinic.Pays?.toLowerCase() == "belgique" && elem.value == 50 && clinic.CodePostal.slice(0, 1) == zip.value.slice(0, 1)) ||
            (clinic.CodePostal.length == 4 && clinic.Pays?.toLowerCase() == "belgique" && elem.value == 100)
        ) {
            retour = true;
        }

        return retour;
    }

    const treatmentsCheck = (clinic?:Airtable_Clinic_Interface, elems:any[] = []) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.Machines == undefined) {_log("Cas Machines undefined");return false;}
        if(!Array.isArray(elems)) {_log("Cas elems null");return true;}
        if(elems.length == 0) {_log("Cas elems vide");return true;}

        for(let i = 0; i < elems.length; i++) {
            if(elems[i] instanceof HTMLInputElement && elems[i].checked == true && !clean_machines(clinic.Machines).includes(elems[i].value)) {
                return false;
            }
        }
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
        fetch(`${process.env.SYMF_BACK}/api/get-datas?type=machines`)
        .then(p => handlePromise(p, "json"))
        .then((res:{status:string|null, machines: [string[]]}) => {
            res.machines != null && Array.isArray(res.machines) && setTreatments(res.machines.join('#').split('#'));
        })
        .catch(err => _error(err));
    }, []);

    return (
        <>
            <h2 className="title">Nos Centres Partenaires</h2>
            <h3 className="subtitle">Liste des praticiens partenaires</h3>
            <div id="clinic-finder-filters">

                <span className="clinic-finder-search-zip-span"><input id="clinic-finder-search-zip" type="search" placeholder="Chercher par ville ou par CP"/></span>
                
                <span className="clinic-filter-distance neumorphic">
                    <select id="clinic-filter-distance-select" className="neumorphic">
                        <option value="10" className="clinic-filter-distance">10 km</option>
                        <option value="50" className="clinic-filter-distance">50 km</option>
                    </select>
                </span>

                <span id="clinic-finder-treatment-span" className="clinic-finder-treatment-span">
                    <div className="clinic-finder-treatment-title">Technologies</div>
                    <ul className="clinic-finder-treatment-list custom-scrollbar">
                        {(clean_machines(treatments) ?? []).map((treatment:string, index:number) => {
                            return (
                                <li key={index} className="clinic-finder-treatment-elem">
                                    <input type="checkbox" id={`treatment-${treatment.toLowerCase()}`} name={`treatment-${treatment.toLowerCase()}`} value={treatment}/>
                                    <label htmlFor={`treatment-${treatment.toLowerCase()}`}>{treatment}</label>
                                </li>
                            );
                        })}
                    </ul>
                </span>

                <button id="clinic-finder-search-button" onClick={(e) => updateSearch(e)}>Rechercher</button>
            </div>
            <div className="bottom-border"></div>
            {
                loading && <LoadingGIF customClass="clinic-finder-loader"/>
            }
            {!loading && clinics && clinics.map((clinic:Airtable_Clinic_Interface | [], key:number) => {
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
            })}
        </>
    );
};

interface ClinicsClinicalFinder {
    clinics: Array<Airtable_Clinic_Interface>;
    loading: boolean;
};

export default ClinicsClinicalFinder;