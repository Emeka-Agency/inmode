import React from 'react';

import FuzzySet from 'FuzzySet';
import { graphql, useStaticQuery } from 'gatsby';
import { InmodePanel_Clinic_Interface } from '../interfaces';

import './index.css';
import { allByClass, oneById, oneBySelector } from '../../functions/selectors';

const ClinicalFinder = ({}:ClinicalFinder_Interface) => {

    const _rate = 0.4;

    const _base_url = typeof window == 'undefined' ? '' : window.location.origin;

    const [clinics]:[any, React.Dispatch<any>] = React.useState(Array.from(useStaticQuery(graphql`
        {
            allStrapiClinicFinder {
                nodes {
                    city
                    doctor
                    mail
                    number
                    street
                    url
                    url_label
                    zip_code
                    treatments {
                        MenuParams {
                            title
                            url
                        }
                    }
                }
            }
        }
    `).allStrapiClinicFinder.nodes));

    const [search, setSearch]:[any, React.Dispatch<any>] = React.useState(undefined);
    const [zipSearch, setZipSearch]:[any, React.Dispatch<any>] = React.useState(undefined);
    // const [rest, setRest]:[number, React.Dispatch<number>] = React.useState(0);

    const switchTreatmentsOpened = (e:any) => {
        e.currentTarget.parentElement.parentElement.classList.contains('treatments') ?
        e.currentTarget.parentElement.parentElement.classList.remove('treatments') :
        e.currentTarget.parentElement.parentElement.classList.add('treatments');
    }

    const updateSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.currentTarget.value.toLowerCase());
    }

    const updateZipSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setZipSearch(e.currentTarget.value.toLowerCase());
    }

    const displayable = (clinic:InmodePanel_Clinic_Interface, critere:string):boolean => {
        // console.log("critere = ", critere);
        let _retour = false;
        if(!clinic) {
            return false;
        }
        if(critere == undefined) {
            return true;
        }
        if(typeof critere == "string" && critere.length == 0) {
            return true;
        }
        let _test = FuzzySet();
        if(_retour == false && clinic.street) {
            _test.add(clinic.street.toLowerCase());
        }
        if(_retour == false && clinic.doctor) {
            _test.add(clinic.doctor.toLowerCase());
        }
        if(_retour == false && clinic.city) {
            _test.add(clinic.city.toLowerCase());
        }
        if(_retour == false && clinic.zip_code) {
            _test.add(clinic.zip_code.toLowerCase());
        }
        if(_retour == false && clinic.treatments && clinic.treatments.length > 0) {
            _test.add(clinic.treatments.map(treatment => treatment.MenuParams.title).join('').toLowerCase());
        }
        _test = _test.length() > 0 ? _test.get(critere, null, _rate) : null;
        if(_test != _rate && _test != null) {
            // console.log(_test);
            _retour = true;
        }
        if(_retour == false && clinic.street) {
            _retour = clinic.street.toLowerCase().includes(critere) ? true : false;
        }
        if(_retour == false && clinic.doctor) {
            _retour = clinic.doctor.toLowerCase().includes(critere) ? true : false;
        }
        if(_retour == false && clinic.city) {
            _retour = clinic.city.toLowerCase().includes(critere) ? true : false;
        }
        if(_retour == false && clinic.zip_code) {
            _retour = clinic.zip_code.toLowerCase().includes(critere) ? true : false;
        }
        if(_retour == false && clinic.treatments && clinic.treatments.length > 0) {
            _retour = clinic.treatments.map(treatment => treatment.MenuParams.title).join('').toLowerCase().includes(critere) ? true : false;
        }
        if(_retour == false && clinic.street && clinic.city && clinic.zip_code) {
            _retour = `${clinic.street}, ${clinic.city}, .${clinic.zip_code}`.includes(critere) ? true : false;
        }
        if(_retour == false && clinic.street && clinic.city) {
            _retour = `${clinic.street}, ${clinic.city}`.includes(critere) ? true : false;
        }
        if(_retour == false && clinic.street && clinic.zip_code) {
            _retour = `${clinic.street}, ${clinic.zip_code}`.includes(critere) ? true : false;
        }
        if(_retour == false && clinic.city && clinic.zip_code) {
            _retour = `${clinic.city}, ${clinic.zip_code}`.includes(critere) ? true : false;
        }
        return _retour;
    }

    React.useEffect(() => {
        try {
            let _part = typeof document != "undefined" ? document.querySelectorAll('.clinic-item').length : 0;
            let _tot = clinics ? clinics.length : 0;
            let temp = oneById("search-clinic-indicator");
            if(temp) {
                temp.innerText = `${_part}/${_tot}`;
            }
            temp = oneBySelector("#search-clinic-indicator-ui .search-clinic-indicator-ui-back");
            if(temp) {
                temp.style.width = `${(_part / _tot) * 100}%`;
            }
        }
        catch(err) {

        }
    }, [search, zipSearch]);

    return (
        <div className="clinic-finder">
            <div className="container">
                <h2 className="title">Inmode Clinic Finder</h2>
                <h3 className="subtitle">Authorised practioner list</h3>
                {/* <div id="search-clinic-indicator"><span>{rest}</span>/{clinics ? clinics.length : 0}</div> */}
                {/* <div id="search-clinic-indicator">{allByClass('clinic-item') ? allByClass('clinic-item').length : 0}/{clinics ? clinics.length : 0}</div> */}
                <span className="clinic-finder-search-zip-span"><input id="clinic-finder-search-zip" type="search" placeholder="Search by postcode" onChange={(e) => updateZipSearch(e)}/></span>
                <span className="clinic-finder-search-span"><input id="clinic-finder-search" type="search" placeholder="Search by practitioner, city, street, etc" onChange={(e) => updateSearch(e)}/></span>
                <div id="search-clinic-indicator">{clinics && clinics.length}/{clinics && clinics.length}</div>
                <div id="search-clinic-indicator-ui">
                    <div className="search-clinic-indicator-ui-back"></div>
                </div>
                <div className="bottom-border"></div>
                {clinics && clinics.map((clinic:InmodePanel_Clinic_Interface) => {
                    if(clinic && displayable(clinic, search) && displayable(clinic, zipSearch)) {
                        Object.keys(clinic).forEach((elem) => elem ? elem.length < 2 ? undefined : elem : undefined);
                        return (
                            <div className="clinic-item">
                                <div className="left-part">
                                    <div className="clinic-street">
                                        {clinic.street && clinic.street}
                                    </div>
                                    <div className="clinic-address">
                                        {clinic.street && clinic.city && clinic.zip_code && `${clinic.street}, ${clinic.city}, .${clinic.zip_code}`}
                                        {clinic.street && clinic.city && !clinic.zip_code && `${clinic.street}, ${clinic.city}`}
                                        {clinic.street && !clinic.city && clinic.zip_code && `${clinic.street}, ${clinic.zip_code}`}
                                        {clinic.street && !clinic.city && !clinic.zip_code && `${clinic.street}`}
                                        {!clinic.street && clinic.city && clinic.zip_code && `${clinic.city}, ${clinic.zip_code}`}
                                        {!clinic.street && clinic.city && !clinic.zip_code && `${clinic.city}`}
                                        {!clinic.street && !clinic.city && clinic.zip_code && `${clinic.zip_code}`}
                                        {!clinic.street && !clinic.city && !clinic.zip_code && ``}
                                    </div>
                                    <div className="clinic-doctor">
                                        {clinic.doctor && clinic.doctor}
                                    </div>
                                </div>
                                <div className="right-part">
                                    <div className={`clinic-url${!clinic.url && !clinic.url_label ? ' no-data' : ''}`}>
                                        {
                                            clinic.url || clinic.url_label ?
                                            <a target="_blank" href={clinic.url || clinic.url_label} title="Clinic website">
                                                {clinic.url_label || clinic.url && clinic.url.replace('https://', '').replace('http://', '')}
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
                                    <button
                                        className="clinic-switch-treatments"
                                        onClick={switchTreatmentsOpened}
                                    >
                                        Treatments Available
                                    </button>
                                </div>
                                {
                                    clinic.treatments && clinic.treatments.length > 0
                                    &&
                                    <div className="clinic-treatments">
                                        {
                                            clinic.treatments.map((treatment) => {
                                                return (
                                                    <span>
                                                        {treatment.MenuParams.title}
                                                        <a className="zone-link" href={_base_url + treatment.MenuParams.url} title={treatment.MenuParams.title} target="_blank"></a>
                                                    </span>
                                                );
                                            })
                                        }
                                    </div>
                                }
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    );
};

interface ClinicalFinder_Interface {

};

export default ClinicalFinder;