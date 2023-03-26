import { graphql } from "gatsby";
import { node } from "prop-types";
import React from "react";
import { string } from "../../o2switch/unix_modules/strapi/lib/services/entity-validator/validators";
import CartProvider from "../components/contexts/cart-provider";
import { InmodePanel_Shop_Interface, InmodePanel_TagFamily_Interface, Woocommerce_Shop_Interface } from "../components/interfaces";
import Layout from "../components/layout";
import SEO from "../components/seo";
import WPShop from "../components/shop/wp-shop";
import { edges_to_array } from "../functions/edges_to_array";
import { initWakeup } from "../functions/fetch";

const ShopPage = ({ data }:ShopPage) => {

    initWakeup("shop");

    const processWoocommerce = (
        datas:{fieldValue: string; nodes: InmodePanel_Shop_Interface[];}[],
        woo:{fieldValue: string; nodes: Woocommerce_Shop_Interface[];}[]
    ) => {
        return woo.map((w) => {
            return {
                ...w,
                nodes: w.nodes.map(node => {
                    return {
                        id: node.id,
                        wp_id: node.wordpress_id,
                        Name: node.name,
                        // pack: node.
                        price: node.price,
                        ...Object.fromEntries(
                            node.meta_data.map(meta => {
                                return [meta.key, meta.value[0] ?? null];
                            })
                        )
                    };
                })
            }
        });
    }

    return (
        <Layout title="produits">
            <SEO title="Produits"/>
            {/* <CartProvider> */}
                <WPShop
                    products={processWoocommerce(data.allStrapiShop.group, data.allWcProducts.group)}
                    shop_card="shop"
                />
            {/* </CartProvider> */}
        </Layout>
    )
};

interface ShopPage {
    data: {
        allStrapiShop: {
            group: {
                fieldValue: string;
                nodes: InmodePanel_Shop_Interface[];
            }[];
        };
        allWcProducts: {
            group: {
                fieldValue: string;
                nodes: Woocommerce_Shop_Interface[];
            }[];
        };
        allStrapiTagFamily: {
            edges: {
                node: InmodePanel_TagFamily_Interface[];
            }
        };
    }
};

export default ShopPage;

export const query = graphql`
    {
        allStrapiTagFamily {
            edges {
                node {
                    FamilyName
                    tags {
                        tag
                    }
                }
            }
        }
        allStrapiShop {
            group(field: relative) {
                fieldValue
                nodes {
                    relative
                    reference
                    Name
                    pack_size
                    pack_type
                    price
                    discount
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
            }
        }
        allWcProducts {
            group(field: categories___name) {
                fieldValue
                nodes {
                    id
                    wordpress_id
                    name
                    price
                    regular_price
                    sale_price
                    meta_data {
                        key
                        value
                    }
                    categories {
                        name
                        slug
                    }
                    images {
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
            }
        }
    }
`;