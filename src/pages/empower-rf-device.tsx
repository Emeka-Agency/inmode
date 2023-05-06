import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/seo';
import VideoTestimonials from '../components/home/video-testimonials';
import Newsletter from '../components/newsletter';
import GenericDetails from '../components/details';
import { InmodePanel_Product_Interface } from '../components/interfaces';
import LandingEmpowerTop from '../components/LandingPage/empower-top';

const EmpowerRFDevicePage = ({ data }:EmpowerRFDevicePage) => {

    return (
        <Layout title="empower-rf-device">
            <SEO/>
            <LandingEmpowerTop/>
            <h2 style={{fontSize: "50px", padding: "10px 0", backgroundColor: "var(--pearl)", textAlign: "center", textTransform: "uppercase", margin: "0"}}>women's intimate health</h2>
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
            <VideoTestimonials/>
            <Newsletter/>
        </Layout>
    );
};

interface EmpowerRFDevicePage {
    data: {
        strapiProduct: InmodePanel_Product_Interface;
    };
};

export default EmpowerRFDevicePage;


export const query = graphql`
    {
        strapiProduct(Name: {eq: "Empower RF"}) {
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
    }
`;