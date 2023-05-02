import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import TreatmentBanner from '../components/treatment/treatment-banner';
import Divider from '../components/divider';
import ClinicalStudies from '../components/Clinical/clinical-studies';
import GenericDetails from '../components/details';
import TreatmentProducts from '../components/treatment/products';
import TreatmentBeforeAfter from '../components/treatment/before-after';
import { graphql } from 'gatsby';
import { InmodePanel_Treatment_Interface } from '../components/interfaces';
import OurBlogBejma from '../components/treatment/our-blog-bejma';

const TreatmentTemplates = ({ data: {strapiTreatment} }:TreatmentTemplates) => {

    const [datas]:[InmodePanel_Treatment_Interface, React.Dispatch<InmodePanel_Treatment_Interface>] = React.useState(strapiTreatment);

    return (
            <Layout title="treatment">
                <SEO title="Treatment"/>
                <TreatmentBanner datas={datas.Banner}/>
                <GenericDetails datas={{'what_is': datas.WhatIsTreat, 'list_title': datas.IncludeTitle, 'list': datas.IncludeList, 'list_icon': null}}/>
                {datas.Name == "womens wellbeing" && <OurBlogBejma/>}
                <Divider position="top"/>
                <TreatmentProducts datas={{'products': datas.products, 'treatment': datas.Name}}/>
                <TreatmentBeforeAfter datas={datas.BeforesAfters} sensible={datas.sensitivity}/>
                {!datas.ClinicalStudies || datas.ClinicalStudies.length === 0 ? null : <Divider position="bottom"/>}
                <ClinicalStudies datas={datas.ClinicalStudies}/>
            </Layout>
    );
};

interface TreatmentTemplates {
    data: {
        strapiTreatment: InmodePanel_Treatment_Interface;
    };
}

export default TreatmentTemplates;

export const query = graphql`
    query Treatment($id: String!) {
        strapiTreatment(id: {eq: $id}) {
            Name
            Banner {
              picture {
                localFile {
                  childImageSharp {
                    fluid {
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
              text
            }
            WhatIsTreat {
              picture {
                localFile {
                  childImageSharp {
                    fluid {
                      srcWebp
                    }
                  }
                }
              }
              TitleText {
                title
                text
              }
            }
            IncludeTitle
            IncludeList {
              texte
            }
            products {
              WhatIsProduct {
                image {
                  localFile {
                    childImageSharp {
                      fluid {
                        srcWebp
                      }
                    }
                  }
                }
                title
                text
                treatment {
                  Name
                }
              }
              RelatedAddonTreatment {
                short {
                  texte
                }
                addon {
                  Name
                }
                treatment {
                  Name
                }
              }
            }
            BeforesAfters {
              image {
                localFile {
                  childImageSharp {
                    fluid {
                      srcWebp
                    }
                  }
                }
              }
              doctor
              text
            }
            ClinicalStudies {
              picture {
                localFile {
                  childImageSharp {
                    fluid {
                      srcWebp
                    }
                  }
                }
              }
              title
              author
              addons {
                Name
              }
              published_date
              publication
            }
            sensitivity
          }
        }
`;