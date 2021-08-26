import React from 'react';
import Layout from '../components/Layout';
import Addons from '../components/product/addons';
import Divider from '../components/divider';
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

const ProductTemplates = ({ data }:ProductTemplates) => {

    const [datas]:[InmodePanel_Product_Interface, React.Dispatch<InmodePanel_Product_Interface>] = React.useState(data.strapiProduct);

    console.log(datas);

    return (
            <Layout title="products">
                <SEO title="Products"/>
                <ProductBanner datas={datas.Banner}/>
                <ProductNavigation
                    name={datas.Name}
                    exist={{
                        'before-after': datas.BeforesAfters && datas.BeforesAfters !== [] && datas.BeforesAfters.length > 0,
                        'studies': datas.ClinicalStudies !== [] && datas.ClinicalStudies.length > 0
                    }}
                />
                <GenericDetails
                    datas={{
                        'what_is': datas.WhatIs,
                        'before_keys': datas.BeforeKeyBenefits,
                        'list': datas.KeyBenefits,
                        'list_title': 'key benefits',
                        'list_icon': 'key_benefit',
                        'anchor_key': 'key-benefits'
                    }}
                />
                <Divider position="top"/>
                <Addons datas={{'addons': datas.Addons, id: datas.strapiId}} sensible={datas.sensitivity} name={datas.Name}/>
                <Divider position="bottom" specialBackground={datas.Demo ? 'darkcyan' : undefined}/>
                <ProductDemo datas={datas.Demo}/>
                {datas.Demo && <Divider position="top" specialBackground={'darkcyan'} specialFill={"#0b1a25"}/>}
                <ProductBeforeAfter datas={datas.BeforesAfters}/>
                <SellingArgs datas={datas.SellingArgs ? datas.SellingArgs[0] : null}/>
                <ClinicalStudies datas={datas.ClinicalStudies}/>
            </Layout>
    );
};

interface ProductTemplates {
  data: {
    strapiProduct: InmodePanel_Product_Interface;
  };
}

export default ProductTemplates;

export const query = graphql`
    query Product($id: String!) {
        strapiProduct(id: {eq: $id}) {
            strapiId
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
              left_video
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
              right_text
            }
            WhatIs {
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
              MenuParams {
                url
                internal_link
              }
              ProductPresentation {
                left_image {
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
                title_image {
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
                title_text
                Images {
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
              }
            }
            Demo {
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
            BeforesAfters {
              doctor
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
            }
            Name
            sensitivity
          }
        }
`;