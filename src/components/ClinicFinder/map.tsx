import React from 'react';

import './map.css';
import { _log } from '../../functions/logger';
import { Airtable_Clinic_Interface } from '../interfaces';

const MapClinicalFinder = ({ clinics, regions, loading }:MapClinicalFinder) => {
    
    React.useEffect(() => {
        
    }, []);

    return (
        <div className="map-clinic-finder">
            <div className="container">
                <h2 className="title">Inmode Clinic Finder</h2>
                <h3 className="subtitle">Map of clinics</h3>
            </div>
            <div style={{height: "480px",width: "640px", display: "inline-block", overflow: "hidden", marginLeft: "calc(50% - 320px)"}}>
                <iframe
                    src="https://www.google.com/maps/d/u/0/embed?mid=1vPtYavFVmFmqOw95fBzcGR7xnQ2sjT8&usp=sharing"
                    width="640"
                    height="480"
                    style={{height: "100%", width: "100%", border: "none", marginTop: "-58px", userSelect: "none"}}
                ></iframe>
            </div>
        </div>
    );
};

interface MapClinicalFinder {
    clinics: Array<Airtable_Clinic_Interface | []>;
    regions: string[]|[];
    loading: boolean;
};

export default MapClinicalFinder;