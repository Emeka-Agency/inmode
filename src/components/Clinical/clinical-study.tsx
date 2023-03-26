import { Link } from "gatsby";
import React from "react";
import { format_title } from "../../functions/format_title";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { InmodePanel_Generic_ClinicalStudies_Interface } from "../interfaces";

const ClinicalStudy = ({study, prop_key = null}:ClinicalStudy) => {
    
    return (
        <div key={prop_key} className="study-slide">
            <div className="study-img">
                <img
                    src={resolveImg(study.picture)}
                    srcSet={resolveImgSet(study.picture)}
                    alt="clinical-study"
                />
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
                <div className="study-download">
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
};

export default ClinicalStudy;