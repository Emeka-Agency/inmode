import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import { Airtable_Clinic_Interface } from '../interfaces';

import './index.css';
import { allByClass, getById, selectOne } from '../../functions/selectors';
import LoadingGIF from '../LoadingGIF';
import { element, instanceOf } from 'prop-types';
import { _error, _log } from '../../functions/logger';
import ClinicsClinicalFinder from './clinics';
import MapClinicalFinder from './map';
import { handlePromise } from '../../functions/tools';

const ClinicalFinder = ({}:ClinicalFinder_Interface) => {

    const _rate = 0.4;

    const _base_url = typeof window == 'undefined' ? '' : window?.location.origin;

    const [tab, setTab]:[string, React.Dispatch<string>] = React.useState("list");
    const [clinics, setClinics]:[Array<Airtable_Clinic_Interface | []>, React.Dispatch<Array<Airtable_Clinic_Interface | []>>] = React.useState(Array());
    const [loading, setLoading]:[boolean, React.Dispatch<boolean>] = React.useState(true);

    // const [rest, setRest]:[number, React.Dispatch<number>] = React.useState(0);

    const addClinics = function(offset:string|null = null, records:Airtable_Clinic_Interface[]|[] = []) {
        fetch(`${process.env.SYMF_BACK}/api/get-datas?type=clinics`)
        .then(p => handlePromise(p, "json"))
        .then((res:{status:number, datas: Airtable_Clinic_Interface[], rows: number}) => {
            if(Array.isArray(res.datas) && res.datas.length > 0) {
                setClinics(res.datas);
            }
            else {
                setClinics([]);
            }
            setLoading(false);
        })
        .catch(err => _error(err));
    }

    React.useEffect(() => {
        // _log(clinics);
    }, [loading]);

    React.useEffect(() => {
        if((clinics == null || clinics == undefined || (clinics instanceof Array && clinics.length == 0)) && typeof window != "undefined") {
            addClinics();
        }
    }, []);

    return (
        <div className="clinic-finder">
            <div className="container">
                <ClinicsClinicalFinder clinics={clinics} loading={loading}/>
            </div>
        </div>
    );
};

interface ClinicalFinder_Interface {

};

export default ClinicalFinder;