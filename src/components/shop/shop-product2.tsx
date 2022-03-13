import { Link } from "gatsby";
import React from "react";
import { InmodePanel_Product_Interface } from "../interfaces";

const ShopProduct = ({ product, special }:ShopProduct) => {

    return (
        <div className={`workstation-product transition${special ? " special" : ""}`}>
            <div className={`workstation-front transition${special ? " special" : ""}`}>
                <div className={`workstation-picture${special ? " special" : ""}`}>
                    <img src={product.ShopPicture.localFile.childImageSharp.fluid.srcWebp} alt={`${product.Name}-pic`} className="transition"/>
                </div>
                <div className={`workstation-name transition${special ? " special" : ""}`}>
                    {product.Name}
                </div>
            </div>
            <div className={`workstation-more-infos transition${special ? " special" : ""}`}>
                <div className={`workstation-description custom-scrollbar moz-scrollbar${special ? " special" : ""}`}>{product.ShopDescription}</div>
                <div className={`workstation-more-details transition${special ? " special" : ""}`}>
                    En savoir plus
                    <Link className={`zone-link${special ? " special" : ""}`} to={`/workstation/${product.MenuParams.url}`} title={product.Name}></Link>
                </div>
            </div>
        </div>
    );
};

interface ShopProduct {
    product: InmodePanel_Product_Interface;
    special: string;
}

export default ShopProduct;