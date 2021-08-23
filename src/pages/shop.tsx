import { graphql } from "gatsby";
import React from "react"
import CartProvider from "../components/contexts/cart-provider";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Shop from "../components/shop/shop";
import { edges_to_array } from "../functions/edges_to_array";

const ShopPage = ({ data }) => {
    
  return (
    <Layout>
      <SEO title="Produits"/>
        {/* <CartProvider> */}
          <Shop
            products={data.allStrapiShop.group}
            tag_families={edges_to_array(data.allStrapiTagFamily.edges)}
            shop_card="shop"
          />
      {/* </CartProvider> */}
    </Layout>
  )
}

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
            childImageSharp {
              fluid {
                srcWebp
                srcSetWebp
              }
            }
          }
        }
      }
    }
  }
`;