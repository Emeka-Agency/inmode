import React from "react";
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Treatment_Interface } from "../interfaces";

const TreatmentProducts = ({ datas, variant = "teal" }:TreatmentProducts) => {


    return (
        <div className="treatment-products">
            {(datas?.products || []).map((bloc, key) => {
                return (
                    <div key={key} className="workstation-container">
                        {bloc.WhatIsProduct.map((product, key_product) => {
                            if(product.treatment?.Name === datas?.treatment) {
                                return (
                                    <div key={key_product} className="workstation-details">
                                        <div className="workstation-img">
                                            <img
                                                src={resolveImg(product.image)}
                                                alt={product.title}
                                            />
                                        </div>
                                        <div className="workstation-description">
                                            <div className="workstation-title">
                                                {product.title}
                                            </div>
                                            <div className="workstation-descr">
                                                {product.text}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                        <div className="workstation-addons">
                            <div className="treatment-addon">
                                <div className="treatment-title" data-variant={variant}>
                                    <div>Technologies</div>
                                    <div>Traitement</div>
                                </div>
                                <div className="treatment-list" data-variant={variant}>
                                    {bloc.RelatedAddonTreatment.map((treat, key_treat) => {
                                        if(treat.treatment?.Name === datas?.treatment) {
                                            return (
                                                <div className="treat-elem" key={key_treat}>
                                                    <div className="addon text">{treat.addon?.Name}</div>
                                                    <div className="treat text">
                                                        {(treat?.short || []).map((treat_elem, key_treat_elem) => {
                                                            return (
                                                                <span key={key_treat_elem}>{treat_elem.texte}</span>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

interface TreatmentProducts {
    datas?: InmodePanel_Treatment_Interface;
    variant?: string;
};

export default TreatmentProducts;