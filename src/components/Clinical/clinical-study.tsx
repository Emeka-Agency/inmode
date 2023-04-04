import { Link } from "gatsby";
import React from "react";
import { format_title } from "../../functions/format_title";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Generic_ClinicalStudies_Interface } from "../interfaces";

const ClinicalStudy = ({study, prop_key = null, variant = "teal"}:ClinicalStudy) => {
    
    return (
        <div key={prop_key} className="study-slide" data-variant={variant}>
            <div className="study-img">
                {resolveImg(study.picture) ? <img
                    src={resolveImg(study.picture)}
                    srcSet={resolveImgSet(study.picture)}
                    alt="clinical-study"
                /> : <div></div>}
            </div>
            <div className="study-text">
                <div className="study-name">{study.title}</div>
                <div className="study-author">Auteurs : {study.author}</div>
                <div className="study-technologies">Technologies : 
                    {study.addons.map((addon, key2) => {
                        return (
                            <>
                                &nbsp;
                                <Link key={`${prop_key}-${key2}` || null} to={`/technology/${format_title(addon.Name)}`} /*title={format_title(addon.Name)}*/>
                                    {format_title(addon.Name)}
                                </Link>
                                &nbsp;
                            </>
                        );
                    })}
                </div>
                <div className="study-published">Date de publication : {study.published_date}</div>
                <div className="study-publication">Publication : {study.publication}</div>
                <div className="study-download" data-variant={variant}>
                    Télécharger
                    <a 
                        className="zone-link"
                        href={study.url}
                        target="_blank"
                        rel="noreferrer"
                        title="Télécharger l'étude"
                    ></a>
                </div>
            </div>
        </div>
    );
};

interface ClinicalStudy {
    study: InmodePanel_Generic_ClinicalStudies_Interface;
    prop_key?: number | null;
    variant?: string;
};

export default ClinicalStudy;