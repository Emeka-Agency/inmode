import React from "react";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import Carousel from "../Carousel";
import { InmodePanel_Generic_BeforeAfter_Interface } from "../interfaces";
import RequestInformation from "../RequestInformation";

const ProductBeforeAfter = ({ datas }:ProductBeforeAfter_Interface) => {

    const [flickityOptions] = React.useState({
        initialIndex: 0,
        cellAlign: 'left',
        pageDots: true,
        accessibility: true,
        selectedAttraction: 0.01,
        friction: 0.15,
        percentPosition: false,
    });

    if(datas.length === 0) {
        return <></>;
    }

    return (
        <div id="before-after" className="before-after">
            <div className="title">
                avant / après
            </div>
            <div className={`container-ba${datas.length < 3 ? ' few' : ''}`}>
                {datas.length < 3 ?
                    datas.map((ba, key) => {
                        return (
                            <div key={key} className="few-ba">
                                <img
                                    src={resolveImg(ba.image)}
                                    srcSet={resolveImgSet(ba.image)}
                                    alt="product-before-after"
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
                        {/* {[...datas, ...datas].map((ba, key) => { */}
                        {datas.map((ba, key) => {
                                return (
                                    <div key={key} className="ba-slide">
                                        <img
                                            src={resolveImg(ba.image)}
                                            srcSet={resolveImgSet(ba.image)}
                                            alt={`product-before-after-${key}`}
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

interface ProductBeforeAfter_Interface {
    datas: InmodePanel_Generic_BeforeAfter_Interface[];
};

export default ProductBeforeAfter;