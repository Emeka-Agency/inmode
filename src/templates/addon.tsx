import React from 'react';
import { graphql } from 'gatsby';
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
import { color_variant } from '../functions/tools';

const AddonTemplates = ({ data }:AddonTemplates) => {

    const [datas]:[InmodePanel_Addon_Interface, React.Dispatch<InmodePanel_Addon_Interface>] = React.useState(data.strapiAddon);

    const __special__ = (name?:string) => {
        if(typeof name != "string") {return <></>;}

        if(name == "Morpheus8") {
            return <h2 style={{textAlign: "center", marginTop: "32px", fontWeight: "bold", color: "var(--teal)", fontSize: "32px"}}>Pour un remodelage en profondeur du derme et de l’hypoderme</h2>
        }
    }

    return (
            <Layout title="addon" variant={color_variant(datas.Name)} rest={{"data-addon": datas.Name}}>
                <SEO lang="fr" title="Addon"/>
                <AddonBanner datas={datas.Banner}/>
                <AddonNavigation
                    name={datas.Name}
                    exist={{
                        'before-after': datas.BeforesAfters && datas.BeforesAfters.length > 0 ? true : false,
                        'studies': datas.ClinicalStudies && datas.ClinicalStudies.length > 0 ? true : false,
                    }}
                    variant={color_variant(datas.Name)}
                />
                {__special__(datas.Name)}
                <GenericDetails datas={{
                    'name': datas.Name,
                    'list': datas.KeyBenefits,
                    'what_is': datas.WhatIs,
                    'list_title': 'avantages',
                    'list_icon' : 'key_benefit',
                    'variant': color_variant(datas.Name)
                }}/>
                {/* Prendre la fonction rand string du cart pour en faire une fonction globale pour name */}
                {/* voir comment mettre une fonction en global sans contexte et redux */}
                {(datas.Videos ?? []).length && ['FormaV', 'Aviva'].indexOf(datas.Name ?? "") < 0 ? <AddonVideos videos={datas.Videos} title={`${datas.Name} videos`} name={datas.Name || rand_token(4)} sensible={datas.sensitivity}/> : null}
                {(datas.BeforesAfters ?? []).length && ['FormaV', 'Aviva'].indexOf(datas.Name ?? "") < 0 ? <AddonBeforeAfter datas={datas.BeforesAfters} sensible={datas.sensitivity} variant={color_variant(datas.Name)}/> : null}
                <AddonWhatTreat title="Quelles zones peuvent être traitées ?" WhatTreats={datas.WhatTreats} variant={color_variant(datas.Name)}/>
                <ClinicalStudies variant={color_variant(datas.Name)} datas={datas.ClinicalStudies}/>
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
                    width
                    height
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
                    width
                    height
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
                    width
                    height
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
                    width
                    height
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
                    width
                    height
                }
            }
            sensitivity
        }
    }
`;