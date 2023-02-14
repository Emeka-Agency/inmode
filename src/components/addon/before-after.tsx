import React from "react";
import Carousel from "../Carousel";
import { InmodePanel_Addon_Interface } from "../interfaces";
import NoPicture from "../NoPic/no-picture";
import Sensible from "../NoPic/sensible";
import RequestInformation from "../RequestInformation";

const AddonBeforeAfter = ({ datas, sensible = false }:AddonBeforeAfter) => {

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
                before and after
            </div>
            <div className={`container-ba${datas && datas.length < 3 ? ' few' : ''}`}>
                {datas && datas.length == 0 ?
                    sensible ?
                        <Sensible from="addon-before-after"/>
                        :
                        <NoPicture from ="addon-before-after"/>
                    :
                    datas && datas.length < 3 ?
                        datas && datas.map((ba, key) => {
                            return (
                                <div key={key} className="few-ba">
                                    <img
                                        src={ba.image && ba.image.localFile.childImageSharp?.fluid.srcWebp}
                                        alt="addon-before-after"
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
                            {datas && datas.map((ba, key) => {
                                    return (
                                        <div key={key} className="ba-slide">
                                            <img
                                                src={ba.image && ba.image.localFile.childImageSharp?.fluid.srcWebp}
                                                alt={`addon-before-after-${key}`}
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

interface AddonBeforeAfter {
    datas: InmodePanel_Addon_Interface["BeforesAfters"];
    sensible: boolean;
};

export default AddonBeforeAfter;