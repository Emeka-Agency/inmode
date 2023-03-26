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

    return (
            <Layout title="products">
                <SEO title="Product"/>
                <ProductBanner datas={datas.Banner}/>
                <ProductNavigation
                    name={datas.Name}
                    exist={{
                        'before-after': datas.BeforesAfters.length > 0,
                        'studies': datas.ClinicalStudies.length > 0
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
                <Addons datas={{'addons': datas.Addons, id: datas.strapiId}} sensible={datas.sensitivity}/>
                {datas.Demo && (datas.Demo.text || datas.Demo.picture) && <Divider position="bottom" specialBackground={datas.Demo ? 'darkcyan' : undefined}/>}
                <ProductDemo datas={datas.Demo}/>
                {datas.Demo && (datas.Demo.text || datas.Demo.picture) && <Divider position="top" specialBackground={'darkcyan'} specialFill={"var(--dusk)"}/>}
                <ProductBeforeAfter datas={datas.BeforesAfters}/>
                <SellingArgs datas={datas.SellingArgs[0]}/>
                <ClinicalStudies datas={datas.ClinicalStudies}/>
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
                    childrenImageSharp {
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
                    childrenImageSharp {
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
                    childrenImageSharp {
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
                    childrenImageSharp {
                        fluid {
                        srcWebp
                        srcSetWebp
                        }
                    }
                    publicURL
                    url
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
                    childrenImageSharp {
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
                    childrenImageSharp {
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
                        childrenImageSharp {
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
                    childrenImageSharp {
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
                    childrenImageSharp {
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
                    childrenImageSharp {
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
          }
          Name
          sensitivity
        }
    }
`;