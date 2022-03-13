import React from "react";
import { InmodePanel_Generic_Demo_Interface } from "../interfaces";

const ProductDemo = ({ datas }:ProductDemo_Interface) => {

    if(!datas) {
        return <></>;
    }

    return (
        <div id="demo" className="product-demo">
            <div className="picture">
                <img
                    src={datas.picture && datas.picture.localFile.childImageSharp.fluid.srcWebp}
                    srcSet={datas.picture && datas.picture.localFile.childImageSharp.fluid.srcSetWebp}
                        alt="product-demo"
                />
            </div>
            <div className="text">
                {datas.text}
            </div>
        </div>
    );
}

interface ProductDemo_Interface {
    datas: InmodePanel_Generic_Demo_Interface;
}

export default ProductDemo;