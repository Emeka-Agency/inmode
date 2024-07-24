import React from "react";
import Carousel from "../Carousel";
import { InmodePanel_Generic_ClinicalStudies_Interface } from "../interfaces";
import ClinicalStudy from "./clinical-study";

const ClinicalStudies = ({ datas, variant = "teal" }:ClinicalStudies_Interface) => {

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
        // autoPlay: 5000,
        // wrapAround: true
    });
    
    if(!datas || datas.length === 0) {
        return <></>;
    }

    return (
        <div id="studies" className="clinical-studies" data-variant={variant}>
            <div className="title user-select-none">
                études cliniques
            </div>
            <div className={`clinical-studies-slider${datas.length === 1 ? ' few' : ''}`}>
                {datas.length === 1 ?
                    <ClinicalStudy study={datas[0]} variant={variant}/>
                    :
                    <Carousel
                        id={'carousel-clinical-studies'}
                        options={flickityOptions}
                        classList={'slide-studies transition'}
                    >
                        {/* {[...datas, ...datas].map((study, key) => { */}
                        {datas.map((study, key) => {
                            return (<ClinicalStudy key={key} prop_key={key} study={study} variant={variant}/>);
                        })}
                    </Carousel>
                }
            </div>
        </div>
    );
};

interface ClinicalStudies_Interface {
    datas?: InmodePanel_Generic_ClinicalStudies_Interface[];
    variant?: string;
};

export default ClinicalStudies;