import React from "react";
import Carousel from "../Carousel";
import ClinicalStudy from "../Clinical/clinical-study";
import { InmodePanel_Addon_Interface } from "../interfaces";

const AddonClinicalStudies = ({ datas }:AddonClinicalStudies) => {

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: false,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
    });
    
    if(!datas || datas.length === 0) {
        return false;
    }

    return (
        <div id="studies" className="product-clinical-studies">
            <div className="title">
                études cliniques
            </div>
            <div className="clinical-studies-slider">
                {datas.length === 1 ?
                    <ClinicalStudy study={datas[0]}/>
                    :
                    <Carousel
                        id={'carousel-clinical-studies'}
                        options={flickityOptions}
                        classList={'slide-studies transition'}
                    >
                        {/* {[...datas, ...datas].map((study, key) => { */}
                        {datas.map((study, key) => {
                            return (<ClinicalStudy key={key} prop_key={key} study={study}/>);
                        })}
                    </Carousel>
                }
            </div>
        </div>
    );
};

interface AddonClinicalStudies {
    datas: InmodePanel_Addon_Interface["ClinicalStudies"];
};

export default AddonClinicalStudies;