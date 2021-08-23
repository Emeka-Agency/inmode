import { graphql } from "gatsby";
import React from "react"
import { InmodePanel_Shop_Interface, InmodePanel_TagFamily_Interface } from "../components/interfaces";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Shop from "../components/shop/shop";
import ShopLogin from "../components/shop/shop-login";
import { edges_to_array } from "../functions/edges_to_array";

const ShopPage = ({ data = undefined }:ShopPage_Interface) => {
    
    const [logged, setLogged]:[boolean, React.Dispatch<boolean>] = React.useState(Boolean(false));

    const isLogged = (_logged:boolean) => {
        setLogged(_logged);
    }

    return (
        <Layout title="shop">
            <SEO title="Shop"/>
            {
                data ? 
                    logged ? 
                        <Shop
                            products={data.allStrapiShop.group}
                            tag_families={edges_to_array(data.allStrapiTagFamily.edges)}
                            shop_card="shop"
                        />
                        :
                        <ShopLogin updateLogged={isLogged}/>
                    :
                    <></>
            }
        </Layout>
    )
};

interface ShopPage_Interface {
    data: {
        allStrapiTagFamily :{
            edges: InmodePanel_TagFamily_Interface[];
        };
        allStrapiShop :{
            group: InmodePanel_Shop_Interface[];
        };
    } | undefined;
};

export default ShopPage;

// export const query = graphql`
//     {
//         allStrapiTagFamily {
//             edges {
//                 node {
//                     FamilyName
//                     tags {
//                         tag
//                     }
//                 }
//             }
//         }
//         allStrapiShop {
//             group(field: relative) {
//                 fieldValue
//                     nodes {
//                         relative
//                         reference
//                         Name
//                         pack_size
//                         pack_type
//                         price
//                         discount
//                         description
//                         pictures {
//                             formats {
//                                 thumbnail {
//                                     childImageSharp {
//                                         fluid {
//                                             srcWebp
//                                             srcSetWebp
//                                         }
//                                     }
//                                     publicURL
//                                 }
//                             }
//                             url
//                         }
//                     }
//                 }
//             }
//     }
// `;