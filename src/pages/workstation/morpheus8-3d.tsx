import React from 'react';
import Layout from '../../components/Layout';
import Divider from '../../components/divider';
import ProductBanner from '../../components/product/banner';
import ProductNavigation from '../../components/product/navigation';
import SEO from '../../components/seo';
import ProductBeforeAfter from '../../components/product/before-after';
import ClinicalStudies from '../../components/Clinical/clinical-studies';
import { InmodePanel_Product_Interface } from '../../components/interfaces';
import { _log } from '../../functions/logger';
import ContactForm from '../../components/contact/contact-form';
import { resolveImg, resolveImgSet } from '../../functions/tools';
import RequestInformation from '../../components/RequestInformation';
import { graphql, useStaticQuery } from 'gatsby';

const Morpheus8_3D = ({ data }:Morpheus8_3D) => {

    const [images] = React.useState(useStaticQuery(graphql `
        {
            noImg: file(relativePath: {eq: "no-img.png"}) {
                ...FileImgFormat
            }
            keyBenefitIcon: file(relativePath: {eq: "icons/key_benefit.png"}) {
                ...FileImgFormat
            }
            whatIsPicture: file(relativePath: {eq: "products/morpheus8/main-p.png"}) {
                ...FileImgFormat
            }
            _3d: file(relativePath: {eq: "products/m83d/3d.jpg"}) {
                ...FileImgFormat
            }
            _1: file(relativePath: {eq: "products/m83d/1.png"}) {
                ...FileImgFormat
            }
            _2: file(relativePath: {eq: "products/m83d/2.png"}) {
                ...FileImgFormat
            }
            _3: file(relativePath: {eq: "products/m83d/3.png"}) {
                ...FileImgFormat
            }
        }

        fragment FileImgFormat on File {
            ext
            extension
            url
            absolutePath
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
            publicURL
            url
        }
    `));

    const datas:InmodePanel_Product_Interface = {
        'Banner': {
            'full_img': {
                'localFile': {
                    'childImageSharp': {
                        'fluid': {
                            'srcWebp': images.noImg,
                            'srcSetWebp': images.noImg,
                        },
                    },
                },
            },
        },
        'WhatIs': {
            'picture': {
                'localFile': {
                    'childImageSharp': {
                        'fluid': {
                            'srcWebp': images.whatIsPicture,
                            'srcSetWebp': images.whatIsPicture,
                        },
                    },
                },
            },
            'TitleText': [
                {
                    'text': 'Sit dolor aute irure excepteur ut voluptate eiusmod esse laboris occaecat magna excepteur sunt.',
                    'title': 'What is Morpheus8 3D body ?',
                },
            ],
        },
        'BeforesAfters': {
            'doctor': '',
            'image': {
                'localFile': {
                    'childImageSharp': {
                        'fluid': {
                            'base64': '',
                            'srcWebp': '',
                            'srcSetWebp': '',
                        },
                    },
                },
            },
            'text': '',
        },
        'Specifications': [
            '40 stainless steel gold-coated micro pins',
            'length 2mm - 7mm',
            'Additional mm heat profile',
            'Computerized Treatment Depth',
            'Isoldated with 0.5mm Conductive Tip',
            '300µm needle diameter',
            'Subdermal and dermal remodeling of larger body areas such as the adbomen, thighs, and buttocks, through fractional coagulation and sub-necrotic bulk heating',
        ],
        'ClinicalStudies': [
            {
                'addons': [
                    {'Name': ''},
                ],
                'author': '',
                'published_date': '',
                'title': '',
                'url': '',
                'picture': {
                    'localFile': {
                        'childImageSharp': {
                            'fluid': {
                                'base64': '',
                                'srcWebp': images.noImg,
                                'srcSetWebp': images.noImg,
                            },
                        },
                    },
                },
                'publication': '',
            },
            {
                'addons': [
                    {'Name': ''},
                ],
                'author': '',
                'published_date': '',
                'title': '',
                'url': '',
                'picture': {
                    'localFile': {
                        'childImageSharp': {
                            'fluid': {
                                'base64': '',
                                'srcWebp': images.noImg,
                                'srcSetWebp': images.noImg,
                            },
                        },
                    },
                },
                'publication': '',
            },
            {
                'addons': [
                    {'Name': ''},
                ],
                'author': '',
                'published_date': '',
                'title': '',
                'url': '',
                'picture': {
                    'localFile': {
                        'childImageSharp': {
                            'fluid': {
                                'base64': '',
                                'srcWebp': images.noImg,
                                'srcSetWebp': images.noImg,
                            },
                        },
                    },
                },
                'publication': '',
            },
        ],
        'Name': 'Morpheus8 3D',
        'sensitivity': false,
    };

    return (
            <Layout title="products" classes={['m83d']}>
                <SEO title="Products"/>
                <ProductBanner datas={datas.Banner}/>
                <ProductNavigation
                    name={datas.Name}
                    exist={{
                        'before-after': Array.isArray(datas.BeforesAfters) && datas.BeforesAfters.length > 0,
                        'studies': Array.isArray(datas.ClinicalStudies) && datas.ClinicalStudies.length > 0
                    }}
                />
                <div
                    id="what-is"
                    className={["details", 'bg-pearl'].join(' ')}
                    style={{
                        maxWidth: 'unset',
                        width: '100%',
                        padding: '50px 50px',
                        boxSizing: 'border-box'
                    }}
                >
                    <div className="what-is transition">
                        <div className="details-img transition">
                            <img
                                src={resolveImg(datas.WhatIs.picture)}
                                srcSet={resolveImgSet(datas.WhatIs.picture)}
                                alt="detail-main-pic"
                            />
                        </div>
                        <div>
                            <div className="title" style={{color: 'var(--pearl)', fontWeight: '600'}}>
                                {datas.WhatIs.TitleText[0].title}
                            </div>
                            <p className="text" style={{color: 'var(--pearl)'}}>
                                {datas.WhatIs.TitleText[0].text}
                            </p>
                        </div>
                    </div>
                    <div className="text-list transition">

                        <div style={{color: 'var(--pearl)'}} className="title">Unique <span className="teal bold">3D</span> <span className="bold">Smart Frame technology</span></div>
                        <div style={{color: 'var(--pearl)'}} className="list-elem">
                            <img src={images.keyBenefitIcon.publicURL} className="before-text"/>
                            <div style={{color: 'var(--pearl'}} className="text"><span className="teal bold">3</span> = 3 interconnected <span className="bold">rings</span> of microneedles</div>
                        </div>
                        <div style={{color: 'var(--pearl)'}} className="list-elem">
                            <img src={images.keyBenefitIcon.publicURL} className="before-text"/>
                            <div style={{color: 'var(--pearl'}} className="text"><span className="teal bold">D</span> = <span className="bold">Deployment</span> of bipolar RF</div>
                        </div>

                        <div style={{color: 'var(--pearl)'}} className="title">Bipolar RF is deployed in a <span className="teal bold">sequential radiating pattern</span>:</div>
                        <div style={{color: 'var(--pearl)'}} className="list-elem">
                            <img src={images.keyBenefitIcon.publicURL} className="before-text"/>
                            <div style={{color: 'var(--pearl'}} className="text">begins with the <span className="bold">inner circle</span> of microneedles</div>
                        </div>
                        <div style={{color: 'var(--pearl)'}} className="list-elem">
                            <img src={images.keyBenefitIcon.publicURL} className="before-text"/>
                            <div style={{color: 'var(--pearl'}} className="text"><span className="teal bold">radiates outwards</span> to the <span className="bold">middle</span> and <span className="bold">external</span> rings</div>
                        </div>
                        <div style={{color: 'var(--pearl)'}} className="list-elem">
                            <img src={images.keyBenefitIcon.publicURL} className="before-text"/>
                            <div style={{color: 'var(--pearl'}} className="text">micropins act as their own poles between each other (bipolar)</div>
                        </div>
                        
                        <div style={{color: 'var(--pearl)'}} className="text">RF energy is <span className="bold">automatically adjusted</span> for the distance and number of microneedles in each ring</div>
                        
                        <div style={{color: 'var(--pearl)'}} className="text">Sequential activation produces <span className="teal bold">3D tissue block heating</span> and procedures that deliver <span className="bold">more energy</span>, in a <span className="bold">deliverate and uniform</span> treatment pattern</div>
                    </div>
                </div>
                <div className="bg-midnight">
                    <Divider position="top"/>
                    <RequestInformation/>
                    <Divider position="bottom"/>
                </div>
                <div className="bg-white" style={{padding: '50px calc((100% - 1170px) / 2)'}}>
                    <div id="smart-frame">
                        <div style={{width: '100%', padding: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h2 className="midnight semibold inline-block align-middle">3D SMART FRAME TECHNOLOGY</h2>
                            <img className="inline-block align-middle" style={{width: '72px', height: '72px'}} src={resolveImg(images._3d)} alt="3d"/>
                        </div>
                        <div>
                            <h3 className="text-center">SEQUENTIAL RADIATING PATTERN</h3>
                            <div className="smart-frame-elems flex justify-evenly">
                                {[['_1', 'Inner'], ['_2', 'Middle'], ['_3', 'Outer']].map(elem => (
                                    <div className="smart-frame-elem flex flex-col align-middle text-center" style={{alignItems: 'center'}}>
                                        <img style={{width: '256px'}} src={resolveImg(images[elem[0]])} alt={elem[0]}/>
                                        <span style={{marginTop: '8px'}} className="block bold">{elem[1]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-platinum flex flex-row justify-evenly" style={{padding: '50px calc((100% - 1170px) / 2)'}}>
                    <div id="m83d-specifications">
                        <img src={resolveImg(images.noImg)}/>
                        <div className="m83d-specifications workstation-addons">
                            <div className="treatment-addon">
                                <div className="treatment-title">Specifications</div>
                                <div className="treatment-list">
                                    {datas.Specifications.map((text, key) => 
                                            <div className="addon text">{text}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white" style={{padding: '50px calc((100% - 1170px) / 2)', boxSizing: 'border-box'}}>
                    <div id="m83d-burst">
                        <h2>BURST TREATMENT VIDEOS</h2>
                        <div className="flex">
                            <img src={resolveImg(images.noImg)}/>
                            <img src={resolveImg(images.noImg)}/>
                        </div>
                    </div>
                </div>
                {true ? '' : <ProductBeforeAfter datas={datas.BeforesAfters}/>}
                <ClinicalStudies datas={datas.ClinicalStudies}/>
                <ContactForm from={`addon-${datas.Name?.toLowerCase()}`}/>
            </Layout>
    );
};

interface Morpheus8_3D {
  data: {
    strapiProduct: InmodePanel_Product_Interface;
  };
}

export default Morpheus8_3D;