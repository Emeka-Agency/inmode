import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import VideoTestimonials from '../components/home/video-testimonials';
import Newsletter from '../components/newsletter';
import GenericDetails from '../components/details';
import { InmodePanel_Product_Interface, InmodePanel_Addon_Interface } from '../components/interfaces';
import LandingEmpowerTop from '../components/LandingPage/empower-top';
import LandingEmpowerAddons from '../components/LandingPage/empower-addons';

const EmpowerRFDevicePage = ({ data }:EmpowerRFDevicePage) => {

    return (
        <Layout title="empower-rf-device">
            <SEO/>
            <LandingEmpowerTop/>
            <h2 style={{padding: "10px 0", backgroundColor: "var(--pearl)", textAlign: "center", textTransform: "uppercase", margin: "0"}}>women's intimate health</h2>
            <GenericDetails
                datas={{
                    'what_is': data.strapiProduct.WhatIs,
                    'before_keys': data.strapiProduct.BeforeKeyBenefits,
                    'list': data.strapiProduct.KeyBenefits,
                    'list_title': 'key benefits',
                    'list_icon': 'key_benefit',
                    'anchor_key': 'key-benefits'
                }}
            />
            <LandingEmpowerAddons addons={Object.fromEntries(data.allStrapiAddon.nodes.map(addon => [addon.Name, addon]))}/>
            <div style={{width: "100%", backgroundColor: 'var(--pearl)'}}>
                <Link to={data.strapiProduct.MenuParams.url}className="landing_empower-find_out_more">Find out more</Link>
            </div>
            <VideoTestimonials testimonials={[
                {
                    name: "Dr Vivek",
                    type: "",
                    origin: "New Device EmpowerRF",
                    url: "https://www.youtube.com/watch?v=04t7j87GKWI",
                    poster: "https://img.youtube.com/vi/04t7j87GKWI/maxresdefault.jpg"
                },
                {
                    name: "Dr Bejma",
                    type: "",
                    origin: "Women's International Month",
                    url: "https://www.youtube.com/watch?v=nImq4IJgP0w",
                    poster: "https://img.youtube.com/vi/nImq4IJgP0w/maxresdefault.jpg"
                },
                {
                    name: "Sara Cheeney",
                    type: "",
                    origin: "Director of Pure Perfection Clinic",
                    url: "https://www.youtube.com/watch?v=Ss0A_Sjxa2w",
                    poster: "https://img.youtube.com/vi/Ss0A_Sjxa2w/maxresdefault.jpg"
                },
                {
                    name: "EmpowerRF",
                    type: "",
                    origin: "EmpowerRF launch",
                    url: "https://www.youtube.com/watch?v=egrx28naa7o",
                    poster: "https://img.youtube.com/vi/egrx28naa7o/maxresdefault.jpg"
                }
            ]}/>
            <Newsletter/>
        </Layout>
    );
};

interface EmpowerRFDevicePage {
    data: {
        strapiProduct: InmodePanel_Product_Interface;
        allStrapiAddon: {nodes: InmodePanel_Addon_Interface[]};
    };
};

export default EmpowerRFDevicePage;

export const query = graphql`
    {
        strapiProduct(Name: {eq: "Empower RF"}) {
            MenuParams {
                url
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
        }

        allStrapiAddon(filter: {Name: {in: ["V-Tone", "Morpheus8v", "Forma", "Morpheus8", "Evolve Tone", "Aviva"]}}) {
            nodes {
                Name
                MenuParams {
                    url
                }
                Banner {
                    right_text
                    left_img {
                        ext
                        url
                        localFile {
                            childImageSharp {
                                fixed {
                                    srcWebp
                                    srcSetWebp
                                    aspectRatio
                                }
                                fluid {
                                    srcWebp
                                    srcSetWebp
                                    aspectRatio
                                }
                                original {
                                    width
                                    height
                                }
                            }
                            absolutePath
                            publicURL
                        }
                        url
                    }
                }
            }
        }
    }
`;