import { graphql } from "gatsby";
import React from "react"
import Layout from "../components/Layout";
import SEO from "../components/seo";
import Shop from "../components/shop/shop";
import { edges_to_array } from "../functions/edges_to_array";

const WorkstationPage = ({ data }) => {
    
    return (
        <Layout>
          <SEO title="Gamme"/>
          <Shop
            products={edges_to_array(data.allStrapiProduct.edges)}
            tag_families={edges_to_array(data.allStrapiTagFamily.edges)}
            technologies={edges_to_array(data.allStrapiAddon.edges)}
            shop_card="workstation"
          />
        </Layout>
    )
}

export default WorkstationPage;

export const query = graphql`
  {
    allStrapiProduct {
      edges {
        node {
          Name
          MenuParams {
            url
            internal_link
          }
          ShopPicture {
            childImageSharp {
              fluid {
                  srcWebp
              }
            }
          }
          ShopDescription
          Addons {
            Name
          }
          ShopTreats {
            texte
          }
          Tags {
            tag
          }
        }
      }
    }
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
    allStrapiAddon {
      edges {
        node {
          Name
        }
      }
    }
  }
`;