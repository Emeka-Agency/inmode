import { Link } from "gatsby";
import React from "react";
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Product_Interface } from "../interfaces";

const WorkstationProduct = ({ product, special }:WorkstationProduct) => {

    return (
        <div className={`workstation-product transition${special ? " special" : ""}`}>
            <div className={`workstation-front transition${special ? " special" : ""}`}>
                <div className={`workstation-picture${special ? " special" : ""}`}>
                    <img src={resolveImg(product.ShopPicture)} alt={`${product.Name}-pic`} className="transition"/>
                </div>
                <div className={`workstation-name transition${special ? " special" : ""}`}>
                    {product.Name}
                </div>
            </div>
            <div className={`workstation-more-infos transition${special ? " special" : ""}`}>
                <div className={`workstation-description custom-scrollbar moz-scrollbar${special ? " special" : ""}`}>{product.ShopDescription}</div>
                <div className={`workstation-more-details transition${special ? " special" : ""}`}>
                    En savoir plus
                    <Link className={`zone-link${special ? " special" : ""}`} to={`${product.MenuParams.url}`} title={product.Name}></Link>
                </div>
            </div>
        </div>
    );
};

interface WorkstationProduct {
    product: InmodePanel_Product_Interface;
    special: string;
};

export default WorkstationProduct;