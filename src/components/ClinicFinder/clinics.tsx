import React from "react";
import { _error, _log } from "../../functions/logger";
import { oneById, oneBySelector } from "../../functions/selectors";
import { Airtable_Clinic_Interface } from "../interfaces";
import LoadingGIF from "../LoadingGIF";

import "./clinics.css";

const ClinicsClinicalFinder = ({ clinics, regions, loading }:ClinicsClinicalFinder) => {

    const [search, setSearch]:[any, React.Dispatch<any>] = React.useState(undefined);
    const [zipSearch, setZipSearch]:[any, React.Dispatch<any>] = React.useState(undefined);
    
    const updateIndicator = (_part?:number, _tot?:number) => {
        _log(`updateIndicator(${_part}, ${_tot})`);
        if(_part == undefined || _tot == undefined) {return false;}
        
        let temp = oneById("search-clinic-indicator");
        if(temp instanceof Element) {
            temp.innerText = `${_part}/${_tot}`;
        }
        temp = oneBySelector("#search-clinic-indicator-ui .search-clinic-indicator-ui-back");
        if(temp instanceof Element) {
            temp.style.width = `${(_part / _tot) * 100}%`;
        }
    }

    const switchTreatmentsOpened = (e:any) => {
        e.currentTarget.parentElement.parentElement.classList.contains('treatments') ?
        e.currentTarget.parentElement.parentElement.classList.remove('treatments') :
        e.currentTarget.parentElement.parentElement.classList.add('treatments');
    }

    const updateSearch = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        let total = 0;
        clinics.forEach(clinic => {
            if(clinic instanceof Array) {return false;}
            if(displayable(clinic) && clinic.id) {
                document?.getElementById(clinic.id)?.classList.remove('hidden');
                _log(clinic);
                total++;
            }
            else {
                _log("===================");
                _log(clinic);

                let general_search = document?.querySelector('input#clinic-finder-search');
                let general_check = generalCheck(clinic, general_search);

                let zip_search = clinic.zip_code ? document?.querySelector('input#clinic-finder-search-zip') : null;
                let zip_check = zipCheck(clinic, zip_search);

                let region_search = document?.querySelector('#clinic-filter-regions select');
                let region_check = regionCheck(clinic, region_search);

                _log(`general_check : ${general_check ? true : false}`);
                _log(`zip_check : ${zip_check ? true : false}`);
                _log(`region_check : ${region_check ? true : false}`);

                document?.getElementById(clinic.id)?.classList.add('hidden');
            }
        });
        updateIndicator(total, clinics.length);
    }

    const generalCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null) => {
        if(elem == null) {return false;}
        if(clinic == undefined) {return false;}

        let retour = false;
        if(elem instanceof HTMLInputElement && elem.value != "") {
            _log("%elem", "background:black;font-weight:bold;font-size:16px;color:yellow");
            if(
                (clinic.doctor && clinic.doctor.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.name && clinic.name.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.address && clinic.address.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.zip_code && clinic.zip_code.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.city && clinic.city.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.shire && clinic.shire.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.url && clinic.url.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.mail && clinic.mail.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                (clinic.number && clinic.number.toLowerCase().includes(elem.value.toLowerCase()) == true) ||
                clinic.treatments instanceof Array && clinic.treatments.map((treat) => {
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
        if(clinic.zip_code == undefined) {_log("Cas zip_code undefined");return false;}
        if(elem == null) {_log("Cas elem null");return false;}

        let retour = false;
        if(clinic.zip_code && elem instanceof HTMLInputElement && elem.value != "") {
            _log("%czip_search", "background:black;font-weight:bold;font-size:16px;color:yellow");
            if(clinic.zip_code && clinic.zip_code.toLowerCase().replace(/ /gi, '').includes(elem.value.toLowerCase().replace(/ /gi, ''))) {
                _log(`%c${clinic.zip_code.toLowerCase()}.includes(${elem.value.toLowerCase()})`, 'background:red;color:green;');
                retour = true;
            }
        }
        else if(clinic.zip_code == undefined || elem.value == "") {retour = true;}
        return retour;
    }

    const regionCheck = (clinic?:Airtable_Clinic_Interface, elem:any|null = null) => {
        if(clinic == undefined) {_log("Cas clinic undefined");return false;}
        if(clinic.region == undefined) {_log("Cas region undefined");return false;}
        if(elem == null) {_log("Cas elem null");return false;}

        let retour = false;
        _log(clinic);
        if(elem instanceof HTMLSelectElement && elem.value != "") {
            _log("%elem", "background:black;font-weight:bold;font-size:16px;color:yellow");
            if(elem.value == "clear-filter" || (clinic.region && elem.value.toLowerCase() == clinic.region.toLowerCase())) {
                // clinic.region && _log(`%c${clinic.region.toLowerCase()}.includes(${region_search.value.toLowerCase()})`, 'background:red;color:green;');
                retour = true;
            }
        }
        return retour;
    }

    // région

    // code postal

    // clinique
    // ville
    // pracitioner
    const displayable = (clinic?:Airtable_Clinic_Interface):boolean => {
        // _log("critere = ", critere);
        if(!clinic) {return false;}

        let retour = true;

        // GENERAL
        let general_search = document?.querySelector('input#clinic-finder-search');
        let general_check = generalCheck(clinic, general_search);

        // ZIP CODE
        let zip_search = clinic.zip_code ? document?.querySelector('input#clinic-finder-search-zip') : null;
        let zip_check = zipCheck(clinic, zip_search);

        // REGION
        let region_search = document?.querySelector('#clinic-filter-regions select');
        let region_check = regionCheck(clinic, region_search);

        if(general_check == false || zip_check == false || region_check == false) {return false;}

        if(
            region_search instanceof HTMLSelectElement && region_search.value == "clear-filter" &&
            zip_search instanceof HTMLInputElement && zip_search.value == "" &&
            general_search instanceof HTMLInputElement && general_search.value == ""
        ) {
            _log(region_search.value);
            _log(zip_search.value);
            _log(general_search.value);
            retour = true;
        }

        return retour;
    }

    React.useEffect(() => {
        try {
            let _part = typeof document != "undefined" ? document.querySelectorAll('.clinic-item').length : 0;
            let _tot = clinics ? clinics.length : 0;
            updateIndicator(_part, _tot);
        }
        catch(err) {
            _error(err);
        }
    }, [search, zipSearch]);

    return (
        <>
            <h2 className="title">Inmode Clinic Finder</h2>
            <h3 className="subtitle">Authorised practioner list</h3>
            {/* <div id="search-clinic-indicator"><span>{rest}</span>/{clinics ? clinics.length : 0}</div> */}
            {/* <div id="search-clinic-indicator">{allByClass('clinic-item') ? allByClass('clinic-item').length : 0}/{clinics ? clinics.length : 0}</div> */}
            <span id="clinic-filter-regions" className="neumorphic">
                <select className="neumorphic" onChange={(e) => updateSearch(e)}>
                    <option value="clear-filter" className="clinic-filter-region">Choose a region</option>
                    {regions.map((region, index) => <option key={index} value={region} className="clinic-filter-region">{region}</option>)}
                </select>
            </span>
            <span className="clinic-finder-search-zip-span"><input id="clinic-finder-search-zip" type="search" placeholder="Search by postcode" onChange={(e) => updateSearch(e)}/></span>
            <span className="clinic-finder-search-span"><input id="clinic-finder-search" type="search" placeholder="Search by practitioner, city, street, etc" onChange={(e) => updateSearch(e)}/></span>
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
                            data-region={clinic.region}
                        >
                            <div className="left-part">
                                <div className="clinic-name">
                                    {clinic.name && clinic.name}
                                </div>
                                <div className="clinic-address" >
                                    {clinic.address ?? [clinic.zip_code ?? "", clinic.city ?? "", clinic.shire ?? ""].join(', ')}
                                </div>
                                <div className="clinic-doctor">
                                    {clinic.doctor && clinic.doctor}
                                </div>
                            </div>
                            <div className="right-part">
                                <div className={`clinic-url${!clinic.url ? ' no-data' : ''}`}>
                                    {
                                        clinic.url ?
                                        <a target="_blank" href={`http://${(clinic.url || "").replace("https://", "").replace("http://", "")}`} title="Clinic website" style={{color: "#59b7b3", cursor: "pointer"}}>
                                            Our website
                                        </a>
                                        :
                                        <></>
                                    }
                                </div>
                                <div className={`clinic-mail${!clinic.mail ? ' no-data' : ''}`}>
                                    {
                                        clinic.mail != undefined ?
                                        <a href={`mailto:${clinic.mail}`} title="Send a mail">
                                            {clinic.mail}
                                        </a>
                                        :
                                        <a></a>
                                    }
                                </div>
                                <div className={`clinic-phone${!clinic.number ? ' no-data' : ''}`}>
                                    {
                                        clinic.number != undefined ?
                                        <a href={`phone:${clinic.number}`} title="Send a mail">
                                            {clinic.number}
                                        </a>
                                        :
                                        <a></a>
                                    }
                                </div>
                                {clinic.treatments && clinic.treatments.length > 0 ?
                                    <button
                                        className="clinic-switch-treatments"
                                        onClick={switchTreatmentsOpened}
                                    >
                                        Treatments Available
                                    </button>
                                    :
                                    null
                                }
                            </div>
                            {
                                clinic.treatments && clinic.treatments.length > 0
                                &&
                                <div className="clinic-treatments">
                                    {
                                        clinic.treatments.map((treatment, key:number) => {
                                            return (
                                                <span key={key}>
                                                    {treatment}
                                                    {/* <a className="zone-link" href={_base_url + treatment} title={treatment} target="_blank"></a> */}
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
    clinics: Array<Airtable_Clinic_Interface | []>;
    regions: string[]|[];
    loading: boolean;
};

export default ClinicsClinicalFinder;