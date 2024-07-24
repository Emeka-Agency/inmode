import React from 'react';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import TreatmentBanner from '../components/treatment/treatment-banner';
import ClinicalStudies from '../components/Clinical/clinical-studies';
import GenericDetails from '../components/details';
import TreatmentProducts from '../components/treatment/products';
import TreatmentBeforeAfter from '../components/treatment/before-after';
import { graphql } from 'gatsby';
import { InmodePanel_Treatment_Interface } from '../components/interfaces';

const TreatmentTemplates = ({ data }:TreatmentTemplates) => {

    const [datas]:[InmodePanel_Treatment_Interface, React.Dispatch<InmodePanel_Treatment_Interface>] = React.useState(data.strapiTreatment);

    return (
            <Layout title="treatment" variant={datas.Name == "women s health" ? "teal" : "teal"}>
                <SEO lang="fr" title="Treatment"/>
                <TreatmentBanner datas={datas.Banner} variant={datas.Name == "women s health" ? "dusty-rose" : "teal"}/>
                <GenericDetails datas={{'name': datas.Name, 'what_is': datas.WhatIsTreat, 'list_title': datas.IncludeTitle, 'list': datas.IncludeList, 'list_icon': 'key_benefit', variant: datas.Name == "women s health" ? "dusty-rose" : "teal"}}/>
                <TreatmentProducts datas={{'products': datas.products, 'treatment': datas.Name}} variant={datas.Name == "women s health" ? "dusty-rose" : "teal"}/>
                {data.strapiTreatment.MenuParams?.url != "/treatment/women-s-health" && <TreatmentBeforeAfter variant={datas.Name == "women s health" ? "dusty-rose" : "teal"} datas={datas.BeforesAfters} sensible={datas?.sensitivity || false}/>}
                <ClinicalStudies datas={datas.ClinicalStudies} variant={datas.Name == "women s health" ? "dusty-rose" : "teal"}/>
            </Layout>
    );
};

interface TreatmentTemplates {
    data: {
        strapiTreatment: InmodePanel_Treatment_Interface;
    };
};

export default TreatmentTemplates;

export const query = graphql`
    query Treatment($id: String!) {
        strapiTreatment(id: {eq: $id}) {
            Name
            MenuParams {
                url
                title
                internal_link
                variant
                type
            }
            Banner {
                picture {
                    caption
                    url
                    localFile {
                        absolutePath
                        childImageSharp {
                            fluid {
                            srcWebp
                            srcSetWebp
                            }
                        }
                        publicURL
                        url
                    }
                    width
                    height
                }
                text
            }
            WhatIsTreat {
                picture {
                    width
                    height
                    caption
                    url
                    localFile {
                        absolutePath
                        childImageSharp {
                            fluid {
                            srcWebp
                            srcSetWebp
                            }
                        }
                        publicURL
                        url
                    }
                    width
                    height
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
                        caption
                        url
                        localFile {
                            absolutePath
                            childImageSharp {
                                fluid {
                                srcWebp
                                srcSetWebp
                                }
                            }
                            publicURL
                            url
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
                        id
                        Name
                    }
                    treatment {
                        Name
                    }
                }
            }
            BeforesAfters {
                image {
                    caption
                    url
                    localFile {
                        absolutePath
                        childImageSharp {
                            fluid {
                            srcWebp
                            srcSetWebp
                            }
                        }
                        publicURL
                        url
                    }
                }
                doctor
                text
            }
            ClinicalStudies {
                picture {
                    caption
                    url
                    localFile {
                        absolutePath
                        childImageSharp {
                            fluid {
                            srcWebp
                            srcSetWebp
                            }
                        }
                        publicURL
                        url
                    }
                    width
                    height
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