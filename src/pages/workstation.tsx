import { graphql } from "gatsby";
import React from "react";
import { InmodePanel_Addon_Interface, InmodePanel_Product_Interface, InmodePanel_TagFamily_Interface } from "../components/interfaces";
import Layout from "../components/Layout";
import SEO from "../components/seo";
import Shop from "../components/shop/shop";
import { edges_to_array } from "../functions/edges_to_array";

const WorkstationPage = ({ data }:WorkStation_Page) => {
    
    return (
        <Layout title="workstations">
          <SEO title="Gamme"/>
          <Shop
            products={edges_to_array(data.allStrapiProduct.edges)}
            tag_families={edges_to_array(data.allStrapiTagFamily.edges)}
            technologies={edges_to_array(data.allStrapiAddon.edges)}
            shop_card="workstation"
          />
        </Layout>
    )
};

export default WorkstationPage;

interface WorkStation_Page {
    data: {
        allStrapiProduct: {
            edges: InmodePanel_Product_Interface[];
        }
        allStrapiTagFamily: {
            edges: InmodePanel_TagFamily_Interface[];
        };
        allStrapiAddon: {
            edges: InmodePanel_Addon_Interface[];
        };
    };
};

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