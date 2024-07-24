import React from 'react';
import Layout from '../components/Layout';
import Addons from '../components/product/addons';
import ProductBanner from '../components/product/banner';
import ProductNavigation from '../components/product/navigation';
import SEO from '../components/seo';
import ProductBeforeAfter from '../components/product/before-after';
import ProductDemo from '../components/product/demo';
import SellingArgs from '../components/selling-args';
import ClinicalStudies from '../components/Clinical/clinical-studies';
import GenericDetails from '../components/details';
import { graphql } from 'gatsby';
import { InmodePanel_Product_Interface } from '../components/interfaces';
import { color_variant } from '../functions/tools';
import AddonVideos from '../components/addon/videos';

const VIDS = {
  "EmpowerRF": [
    {url: "https://www.youtube.com/watch?v=FkUrCF7uAzE", poster: "empowerRFPromoPoster"},
    {url: "https://back.inmode.emeka.fr/vids/inmode-empowerrf-promo.mp4", poster: "empowerRFMachinePoster"}
  ],
};

const ProductTemplates = ({ data }:ProductTemplates) => {

    const [datas]:[InmodePanel_Product_Interface, React.Dispatch<InmodePanel_Product_Interface>] = React.useState(data.strapiProduct);

    const special_videos = (__name?:string) => {
      if(typeof __name != "string") {return <></>;}

      if(__name in VIDS) {
        return <AddonVideos
          videos={VIDS[__name].map(vid => 
            ({
              'url': vid.url,
              'poster': vid.poster
            })
          )}
          title={__name + " videos"}
          name={__name}
          sensible={false}
        />
      }

      return <></>;
    }

    return (
            <Layout title="products" variant={datas.Name == "EmpowerRF" ? "dusty-rose" : "teal"} rest={{"data-addon": datas.Name}}>
                <SEO lang="fr" title="Product"/>
                <ProductBanner datas={datas.Banner}/>
                <ProductNavigation
                    name={datas.Name}
                    exist={{
                        'before-after': datas.BeforesAfters.length > 0,
                        'studies': datas.ClinicalStudies.length > 0
                    }}
                    variant={datas.Name == "EmpowerRF" ? "dusty-rose" : "teal"}
                />
                <GenericDetails
                    datas={{
                        'name': datas.Name,
                        'what_is': datas.WhatIs,
                        'before_keys': datas.BeforeKeyBenefits,
                        'list': datas.KeyBenefits,
                        'list_title': 'avantages',
                        'list_icon': 'key_benefit',
                        'anchor_key': 'key-benefits',
                        'variant': color_variant(datas.Name)
                    }}
                />
                {special_videos(datas.Name)}
                <Addons
                    datas={{
                        'addons': ["empowerrf"].indexOf((datas.Name ?? "").toLowerCase()) < 0 ? datas.Addons : [
                            datas.Addons.filter(el => el.Name == "Morpheus8V")[0] ?? null,
                            datas.Addons.filter(el => el.Name == "FormaV")[0] ?? null,
                            datas.Addons.filter(el => el.Name == "ToneV")[0] ?? null,
                            datas.Addons.filter(el => el.Name == "Aviva")[0] ?? null,
                            datas.Addons.filter(el => el.Name == "Morpheus8")[0] ?? null,
                            datas.Addons.filter(el => el.Name == "EvolveX Tone")[0] ?? null
                        ].filter(el => el),
                        id: datas.strapiId
                    }}
                    variant={color_variant(datas.Name)}
                    product_name={datas.Name}
                />
                <ProductDemo datas={datas.Demo}/>
                <ProductBeforeAfter datas={datas.BeforesAfters}/>
                <SellingArgs datas={datas.SellingArgs[0]}/>
                <ClinicalStudies datas={datas.ClinicalStudies} variant={datas.Name == "EmpowerRF" ? "dusty-rose" : "teal"}/>
            </Layout>
    );
};

interface ProductTemplates {
  data: {
    strapiProduct: InmodePanel_Product_Interface;
  };
};

export default ProductTemplates;

export const query = graphql`
    query Product($id: String!) {
        strapiProduct(id: {eq: $id}) {
          strapiId
          Name
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
            left_video
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
            right_text
          }
          WhatIs {
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
            TitleText {
              text
              title
            }
          }
          BeforeKeyBenefits
          KeyBenefits {
            texte
          }
          Addons {
            Name
            MenuParams {
              url
              internal_link
            }
            ProductPresentation {
              left_image {
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
              title_image {
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
              title_text
              Images {
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
                product {
                  id
                }
              }
              AddonProductsDescr {
                descr
                product {
                  id
                }
              }
              ProductPresentationTreats {
                treat_short
                product {
                  id
                }
              }
              appears_everywhere
              products {
                id
              }
            }
          }
          Demo {
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
          BeforesAfters {
            doctor
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
            text
          }
          SellingArgs {
            SectionTitle
            Arg {
              texte
            }
          }
          ClinicalStudies {
            addons {
              Name
            }
            author
            published_date
            title
            url
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
          }
          Name
          sensitivity
        }
    }
`;