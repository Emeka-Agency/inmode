import React from "react";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Generic_Demo_Interface } from "../interfaces";

const ProductDemo = ({ datas }:ProductDemo_Interface) => {

    if(!datas) {
        return <></>;
    }

    if(datas.text == null && datas.picture == null) {
        return <></>;
    }

    if(typeof datas.text == "string" && datas.text.length > 0 && datas.picture == null) {
        return (
            <div id="demo" className="product-demo">
                <div className="text">
                    {datas.text}
                </div>
            </div>
        );
    }

    if(datas.text == null && datas.picture != null) {
        return (
            <div id="demo" className="product-demo">
                <div className="picture">
                    <img
                        src={resolveImg(datas.picture)}
                        srcSet={resolveImgSet(datas.picture)}
                            alt="product-demo"
                    />
                </div>
            </div>
        );
    }

    return (
        <div id="demo" className="product-demo">
            <div className="picture">
                <img
                    src={resolveImg(datas.picture)}
                    srcSet={resolveImgSet(datas.picture)}
                        alt="product-demo"
                />
            </div>
            <div className="text">
                {datas.text}
            </div>
        </div>
    );
};

interface ProductDemo_Interface {
    datas: InmodePanel_Generic_Demo_Interface;
};

export default ProductDemo;