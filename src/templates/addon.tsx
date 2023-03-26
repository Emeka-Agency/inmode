import React from 'react';
import { graphql } from 'gatsby';
import Divider from '../components/divider';
import AddonBanner from '../components/addon/banner';
import AddonBeforeAfter from '../components/addon/before-after';
import AddonNavigation from '../components/addon/navigation';
import AddonVideos from '../components/addon/videos';
import AddonWhatTreat from '../components/addon/what-treat';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import SellingArgs from '../components/selling-args';
import SellingNew from '../components/selling-new';
import ClinicalStudies from '../components/Clinical/clinical-studies';
import GenericDetails from '../components/details';
import { InmodePanel_Addon_Interface } from '../components/interfaces';
import rand_token from '../functions/rand_token';

const AddonTemplates = ({ data }:AddonTemplates) => {

    const [datas]:[InmodePanel_Addon_Interface, React.Dispatch<InmodePanel_Addon_Interface>] = React.useState(data.strapiAddon);

    return (
            <Layout title="addon">
                <SEO title="Addon"/>
                <AddonBanner datas={datas.Banner}/>
                <AddonNavigation
                    name={datas.Name}
                    exist={{
                        'before-after': datas.BeforesAfters && datas.BeforesAfters.length > 0 ? true : false,
                        'studies': datas.ClinicalStudies && datas.ClinicalStudies.length > 0 ? true : false,
                    }}
                />
                <GenericDetails datas={{'list': datas.KeyBenefits, 'what_is': datas.WhatIs, 'list_title': 'key benefits', 'list_icon' : 'key_benefit'}}/>
                <Divider position="top"/>
                {/* Prendre la fonction rand string du cart pour en faire une fonction globale pour name */}
                {/* voir comment mettre une fonction en global sans contexte et redux */}
                <AddonVideos videos={datas.Videos} title={`${datas.Name} videos`} name={datas.Name || rand_token(4)} sensible={datas.sensitivity}/>
                <AddonBeforeAfter datas={datas.BeforesAfters} sensible={datas.sensitivity}/>
                <Divider position="bottom"/>
                <AddonWhatTreat title="What can you treat ?" WhatTreats={datas.WhatTreats}/>
                <ClinicalStudies datas={datas.ClinicalStudies}/>
                <SellingArgs datas={datas.SellingArgs != undefined ? datas.SellingArgs[0] : undefined}/>
                <SellingNew datas={datas.SellingNewGeneration}/>
            </Layout>
    );
};

interface AddonTemplates {
    data: {
        strapiAddon: InmodePanel_Addon_Interface;
    };
};

export default AddonTemplates;

export const query = graphql`
    query Addon($id: String!) {
        strapiAddon(id: { eq: $id }) {
            Name
            Page_addon
            Banner {
                left_img {
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
                mini {
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
                right_img {
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
                right_text
            }
            WhatIs {
                TitleText {
                    title
                    text
                }
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
                }
            }
            KeyBenefits {
                texte
            }
            AfterKeyBenefits
            Videos {
                url
                poster {
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
            }
            BeforesAfters {
                doctor
                text
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
            }
            WhatTreats {
                title
                text
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
                }
            }
            ClinicalStudies {
                addons {
                    Name
                }
                author
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
                }
                publication
                published_date
                title
                url
            }
            SellingArgs {
                SectionTitle
                Arg {
                    texte
                }
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
                }
            }
            SellingNewGeneration {
                title
                text
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
                }
            }
            sensitivity
        }
    }
`;