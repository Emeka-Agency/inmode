import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import ProductsContext from "./products-context";
import { InmodePanel_Product_Interface, ProductsContext_Interface } from '../interfaces';

export const useProducts = ():ProductsContext_Interface => {
    return useContext(ProductsContext);
};

const ProductsProvider = ({ requested = "", children }:{ requested?:string, children:any }):React.Provider<ProductsContext_Interface> => {

// SELECT * FROM ((product INNER JOIN short_banner ON product.id = short_banner.product) INNER JOIN key_benefits ON key_benefits.product = short_banner.product) INNER JOIN treats ON treats.product = key_benefits.product;
// graphql-markdown ./path/to/schema.json > schema.md
    const [products]:[InmodePanel_Product_Interface[], React.Dispatch<InmodePanel_Product_Interface[]>] = React.useState(useStaticQuery(graphql`
        {
            allStrapiProduct(sort: {order: ASC, fields: position}) {
                edges {
                    node {
                        Name
                        ShopPicture {
                            childImageSharp {
                                fluid {
                                    srcWebp
                                    srcSetWebp
                                }
                            }
                        }
                        short_descr
                        Icon {
                            childImageSharp {
                                fluid {
                                    srcWebp
                                    srcSetWebp
                                }
                            }
                        }
                        MenuParams {
                            url
                            internal_link
                        }
                        WhatIs {
                            TitleText {
                                text
                            }
                        }
                        Addons {
                            Name
                            Banner {
                                left_img {
                                    childImageSharp {
                                        fluid {
                                            srcWebp
                                            srcSetWebp
                                        }
                                    }
                                }
                                right_img {
                                    childImageSharp {
                                        fluid {
                                            srcWebp
                                            srcSetWebp
                                        }
                                    }
                                }
                                right_text
                            }
                            MenuParams {
                                url
                                internal_link
                            }
                            WhatIs {
                                picture {
                                    childImageSharp {
                                        fluid {
                                            srcWebp
                                            srcSetWebp
                                        }
                                    }
                                }
                                TitleText {
                                    text
                                }
                            }
                        }
                    }
                }
            }
        }
    `).allStrapiProduct.edges.map((elem:{node:InmodePanel_Product_Interface}) => elem.node));

    const product_navigation = [
        {'name': 'what is it', 'url': '#what-is'},
        {'name': 'key benefits', 'url': '#key-benefits'},
        {'name': 'technologies on the workstation', 'url': '#technologies'},
        {'name': 'clinical studies', 'url': '#studies'}
    ];

    const addon_navigation = [
        {'name': 'what is it', 'url': '#what-is'},
        {'name': 'before and after\'s', 'url': '#before-after'},
        {'name': 'what can you treat', 'url': '#what-treat'},
        {'name': 'clinical studies', 'url': '#studies'}
    ];
    
    return (
        <ProductsContext.Provider
            value={{
                'product_navigation': product_navigation,
                'addon_navigation': addon_navigation,
                'products': products
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsProvider;