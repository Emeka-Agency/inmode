import React from "react";
import Carousel from "../Carousel";
import { InmodePanel_Generic_BeforeAfter_Interface } from "../interfaces";
import NoPicture from "../NoPic/no-picture";
import Sensible from "../NoPic/sensible";
import RequestInformation from "../RequestInformation";
import { resolveImg } from "../../functions/tools";

const TreatmentBeforeAfter = ({ datas, sensible = false}:TreatmentBeforeAfter) => {

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
            <div className="title">
                Before / After
            </div>
            <div className={`container-ba${datas.length < 3 ? ' few' : ''}`}>
                {datas.length == 0 ?
                    sensible ?
                        <Sensible from="treatment-before-after"/>
                        :
                        <NoPicture from ="treatment-before-after"/>
                    :
                    datas.length < 3 ?
                        datas.map((ba, key) => {
                            return (
                                <div key={key} className="few-ba">
                                    <img
                                        src={resolveImg(ba.image)}
                                        alt="treatment-before-after"
                                    />
                                    <div className="ba-doctor">{ba.doctor}</div>
                                    <div className="ba-descr">{ba.text}</div>
                                </div>
                            );
                        })
                        :
                        <Carousel
                            id={'carousel-ba'}
                            options={flickityOptions}
                            classList={'slides-before-after transition'}
                        >
                            {datas.map((ba, key) => {
                                    return (
                                        <div key={key} className="ba-slide">
                                            <img
                                                src={resolveImg(ba.image)}
                                                alt={`treatment-before-after-${key}`}
                                            />
                                            <div className="ba-doctor">{ba.doctor}</div>
                                            <div className="ba-descr">{ba.text}</div>
                                        </div>
                                    );
                                })
                            }
                        </Carousel>
                }
            </div>
            <RequestInformation/>
        </div>
    );
};

interface TreatmentBeforeAfter {
    datas: InmodePanel_Generic_BeforeAfter_Interface[] | undefined;
    sensible: boolean;
}

export default TreatmentBeforeAfter;