import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { _log } from "../../functions/logger";
import { InmodePanel_OurSpecialists_Interface, OurSpecialist_Interface } from "../interfaces";

import './index.css';

const OurSpecialist = ({}:OurSpecialistParams) => {

    const [specialists] = React.useState(useStaticQuery(graphql`
    {
        allStrapiOurSpecialist {
          nodes {
            strapiId
            Picture {
              localFile {
                publicURL
                childImageSharp {
                  fluid {
                    srcWebp
                    srcSetWebp
                  }
                }
              }
            }
            Name
            Description
          }
        }
      }
      
    `).allStrapiOurSpecialist.nodes);

    _log(specialists);

    return (
        <div className="our-specialist">
            <div className="title">Our specialists</div>
            <div className="specialists main-container">
                {specialists && specialists.map((specialist:InmodePanel_OurSpecialists_Interface, key:number) => {
                    return (
                        <div className="specialist" key={key}>
                            <div className="specialist-picture">
                              <img
                                  src={specialist.Picture.localFile.childImageSharp.fluid.srcWebp}
                                  srcSet={specialist.Picture.localFile.childImageSharp.fluid.srcSetWebp}
                              />
                            </div>
                            <div className="name">{specialist.Name}</div>
                            <div className="descr">{specialist.Description}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

interface OurSpecialistParams {

};

export default OurSpecialist;