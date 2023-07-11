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
import Testimonial from '../components/Testimonial';

const EvolveXRFDevicePage = ({ data }:EvolveXRFDevicePage) => {

    return (
        <Layout title="evolvex-device">
            <SEO/>
            <LandingEvolveXTop/>
            <h2 style={{padding: "10px 0", backgroundColor: "var(--pearl)", textAlign: "center", textTransform: "uppercase", margin: "0"}}>hands-free remodeling</h2>
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
                    name: "Dr Dev Patel",
                    type: "",
                    origin: "InMode EVOLVE Demo, With Dr Dev Patel",
                    url: "https://www.youtube.com/watch?v=Uy3tNRmCPME",
                    poster: "https://img.youtube.com/vi/Uy3tNRmCPME/maxresdefault.jpg"
                },
                {
                    name: "EvolveX",
                    type: "",
                    origin: "EvolveX launch",
                    url: "https://www.youtube.com/watch?v=6nmce_KLeR0",
                    poster: "https://img.youtube.com/vi/6nmce_KLeR0/maxresdefault.jpg"
                }
            ]}/>
            <div style={{width: "100%", backgroundColor: 'var(--midnight)'}}>
                <div id="testimonial">
                    <div id="testimonial-text">{"“True innovation within the medical aesthetics industry is vital to ensure fantastic results for patients driven by clinical evidence. EvolveX platform system will sit within a truly outstanding portfolio of technology. This new technology follows on from the monumental success we've experienced with Morpheus8 and will be a brilliant journey for transforming total body contouring to unprecedented levels. We are truly excited to launch the EvolveX platform system and in doing so, offer fantastic capabilities for both our physicians and their patients.”"}</div>
                    <h3 id="testimonial-name">{"Neil Wolfenden, "}</h3>
                    <p id="testimonial-clinic">{"Managing director at InMode UK"}</p>
                </div>
            </div>
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