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
import ContactForm from '../components/contact/contact-form';

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
                {datas.Videos && datas.Videos.length > 0 ? <AddonVideos videos={datas.Videos} title={`${datas.Name} videos`} name={datas.Name || rand_token(4)} sensible={datas.sensitivity}/> : <></>}
                <AddonBeforeAfter datas={datas.BeforesAfters} sensible={datas.sensitivity}/>
                <Divider position="bottom"/>
                <AddonWhatTreat title="What can you treat ?" WhatTreats={datas.WhatTreats}/>
                <ClinicalStudies datas={datas.ClinicalStudies}/>
                {datas.SellingArgs && <SellingArgs datas={datas?.SellingArgs}/>}
                <SellingNew datas={datas.SellingNewGeneration}/>
                <ContactForm from={`addon-${datas.Name?.toLowerCase()}`}/>
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
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
              mini {
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
              right_img {
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
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
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
            KeyBenefits {
              texte
            }
            Videos {
              url
              poster {
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
            BeforesAfters {
              doctor
              text
              image {
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
            WhatTreats {
              title
              text
              picture {
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
            ClinicalStudies {
              addons {
                Name
              }
              author
              picture {
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
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
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
            SellingNewGeneration {
              title
              text
              picture {
                localFile {
                  childImageSharp {
                    fluid {
                      base64
                      srcWebp
                      srcSetWebp
                    }
                  }
                }
              }
            }
            sensitivity
          }
    }
`;