import { Link } from "gatsby";
import React from "react";
import { format_title } from "../functions/format_title";

const ClinicalStudy = ({study, prop_key = null}) => {
    
    return (
        <div key={prop_key} className="study-slide">
            <div className="study-img">
                <img
                    src={study.picture.childImageSharp.fluid.srcWebp}
                    srcSet={study.picture.childImageSharp.fluid.srcSetWebp}
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
                                <Link key={`${prop_key}-${key2}` || null} to={`/technology/${format_title(addon.Name)}`}>
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
                    ></a>
                </div>
            </div>
        </div>
    );
}

ClinicalStudy.defaultProperties = {

};

ClinicalStudy.propTypes = {

};

export default ClinicalStudy;