import React from "react";
import { resolveImg } from "../../functions/tools";
import Carousel from "../Carousel";
import { InmodePanel_Generic_BeforeAfter_Interface } from "../interfaces";
import NoPicture from "../NoPic/no-picture";
import Sensible from "../NoPic/sensible";
import RequestInformation from "../RequestInformation";

const TreatmentBeforeAfter = ({ datas, sensible = false, variant = "teal"}:TreatmentBeforeAfter) => {

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: true,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
    });

    return (
        <div id="before-after" className="before-after">
            <div className="title user-select-none">
                Avant / Après
            </div>
            <div className={`container-ba${(datas || []).length < 3 ? ' few' : ''}`}>
                {(datas || []).length == 0 ?
                    sensible ?
                        <Sensible from="treatment-before-after"/>
                        :
                        <NoPicture from ="treatment-before-after"/>
                    :
                    (datas || []).length < 3 ?
                        (datas ||[]).map((ba, key) => {
                            return (
                                <div key={key} className="few-ba">
                                    <img
                                        className="user-select-none"
                                        src={resolveImg(ba.image)}
                                        alt="treatment-before-after"
                                    />
                                    <div className="ba-doctor user-select-none">{ba.doctor}</div>
                                    <div className="ba-descr user-select-none">{ba.text}</div>
                                </div>
                            );
                        })
                        :
                        <Carousel
                            id={'carousel-ba'}
                            options={flickityOptions}
                            classList={'slides-before-after transition'}
                        >
                            {(datas || []).map((ba, key) => {
                                    return (
                                        <div key={key} className="ba-slide">
                                            <img
                                                className="user-select-none"
                                                src={resolveImg(ba.image)}
                                                alt={`treatment-before-after-${key}`}
                                            />
                                            <div className="ba-doctor user-select-none">{ba.doctor}</div>
                                            <div className="ba-descr user-select-none">{ba.text}</div>
                                        </div>
                                    );
                                })
                            }
                        </Carousel>
                }
            </div>
            <RequestInformation variant={variant}/>
        </div>
    );
};

interface TreatmentBeforeAfter {
    datas: InmodePanel_Generic_BeforeAfter_Interface[] | undefined;
    sensible: boolean;
    variant: string;
};

export default TreatmentBeforeAfter;