import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import VideoTestimonials from '../components/home/video-testimonials';
import Newsletter from '../components/newsletter';
import GenericDetails from '../components/details';
import { InmodePanel_Product_Interface, InmodePanel_Addon_Interface } from '../components/interfaces';
import LandingEvolveXTop from '../components/LandingPage/evolvex-top';
import LandingEvolveXAddons from '../components/LandingPage/evolvex-addons';

const EvolveXRFDevicePage = ({ data }:EvolveXRFDevicePage) => {

    return (
        <Layout title="evolvex-device">
            <SEO/>
            <LandingEvolveXTop/>
            <h2 style={{fontSize: "50px", padding: "10px 0", backgroundColor: "var(--pearl)", textAlign: "center", textTransform: "uppercase", margin: "0"}}>hands-free remodeling</h2>
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
            <LandingEvolveXAddons addons={Object.fromEntries(data.allStrapiAddon.nodes.map(addon => [addon.Name, addon]))}/>
            <div style={{width: "100%", backgroundColor: 'var(--pearl)'}}>
                <Link to={data.strapiProduct.MenuParams.url}className="landing_evolvex-find_out_more">Find out more</Link>
            </div>
            <VideoTestimonials testimonials={[
                {
                    name: "Dr Vivek",
                    type: "",
                    origin: "New Device EvolveXRF",
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
                }
            ]}/>
            <Newsletter/>
        </Layout>
    );
};

interface EvolveXRFDevicePage {
    data: {
        strapiProduct: InmodePanel_Product_Interface;
        allStrapiAddon: {nodes: InmodePanel_Addon_Interface[]};
    };
};

export default EvolveXRFDevicePage;

export const query = graphql`
    {
        strapiProduct(Name: {eq: "EvolveX"}) {
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

        allStrapiAddon(filter: {Name: {in: ["Evolve Tite", "Evolve Transform", "Evolve Tone"]}}) {
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