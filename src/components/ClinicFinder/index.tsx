import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Airtable_Clinic_Interface } from '../interfaces';

import './index.css';
import { allByClass, oneById, oneBySelector } from '../../functions/selectors';
import LoadingGIF from '../LoadingGIF';
import { element, instanceOf } from 'prop-types';
import { _error, _log } from '../../functions/logger';
import ClinicsClinicalFinder from './clinics';
import MapClinicalFinder from './map';

const ClinicalFinder = ({}:ClinicalFinder_Interface) => {

    const _rate = 0.4;

    const _base_url = typeof window == 'undefined' ? '' : window?.location.origin;

    const [tab, setTab]:[string, React.Dispatch<string>] = React.useState("list");
    const [clinics, setClinics]:[Array<Airtable_Clinic_Interface | []>, React.Dispatch<Array<Airtable_Clinic_Interface | []>>] = React.useState(Array());
    const [regions, setRegions]:[string[]|[], React.Dispatch<string[]|[]>] = React.useState(Array());
    const [loading, setLoading]:[boolean, React.Dispatch<boolean>] = React.useState(true);

    // const [rest, setRest]:[number, React.Dispatch<number>] = React.useState(0);

    const addClinics = function(offset:string|null = null, records:Airtable_Clinic_Interface[]|[] = []) {

        const fields = ["name", "address", "shire", "city", "zip_code", "doctor", "mail", "url", "number", "treatments", "region"];
        const sortCriteres = ['name'];
        const sortDirections = ['desc'];
        const sortBy = Array(sortCriteres).map((el, index) => 
            `sort%5B0%5D%5Bfield%5D=${sortCriteres[index]}&sort%5B0%5D%5Bdirection%5D=${sortDirections[index] ?? 'desc'}`
        ).join('&');

        _log(fields);
        _log(sortBy);
        _log(`${process.env.AIRTABLE_CLINICS}?${sortBy}&${fields.map(el => "fields%5B%5D="+el).join("&")}&maxRecords${offset == null ? '' : `&offset=${offset}`}`);
        
        fetch(
            `${process.env.AIRTABLE_CLINICS}?${sortBy}&${fields.map(el => "fields%5B%5D="+el).join("&")}&maxRecords${offset == null ? '' : `&offset=${offset}`}`,
            {headers: new Headers({"Authorization" : `Bearer ${process.env.AIRTABLE_KEY}`})}
        )
        .then(res => res.json())
        .then((res:{offset:string|null, records:{fields: Airtable_Clinic_Interface}[]}) => {
            let reg = regions;
            res.records && res.records.map((rec: {fields:Airtable_Clinic_Interface}) => {
                if(rec.fields && rec.fields.region && reg.indexOf(rec.fields.region || "") == -1) {
                    reg = [...reg, rec.fields.region];
                }
            });
            setRegions(reg);
            if(res.offset) {
                addClinics(res.offset, records.concat(res.records.map(rec => rec.fields && rec.id ? {id: rec.id, ...rec.fields} : rec)));
            }
            else {
                setClinics(records.concat(res.records.map(rec => rec.fields && rec.id ? {id: rec.id, ...rec.fields} : rec)));
                setLoading(false);
            }
        })
        .catch(err => _error(err));
    }

    React.useEffect(() => {
        _log(clinics);
    }, [loading]);

    React.useEffect(() => {
        if(clinics == null || clinics == undefined || (clinics instanceof Array && clinics.length == 0) && typeof window != "undefined") {
            addClinics();
        }
    }, []);

    return (
        <div className="clinic-finder">
            <div className="container">
                <div className="container">
                    <div id="clinic-finder-tabs">
                        <div id="tab-clinics" className={tab == "list" ? "current" : ""} onClick={e => setTab("list")}>List</div>
                        <div id="tab-map" className={tab == "map" ? "current" : ""} onClick={e => setTab("map")}>Map</div>
                    </div>
                </div>
                {tab == "list" && <ClinicsClinicalFinder clinics={clinics} regions={regions} loading={loading}/>}
                {tab == "map" && <MapClinicalFinder clinics={clinics} regions={regions} loading={loading}/>}
            </div>
        </div>
    );
};

interface ClinicalFinder_Interface {

};

export default ClinicalFinder;