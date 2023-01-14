import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import ImagesContext from "./Images-context";

import { GatsbyImage_Interface, Images_Interface } from '../interfaces';

export const useImages = ():Images_Interface => {
    return useContext(ImagesContext);
}

const ImagesProvider = ({ children }:{children:React.ReactNode}):React.Provider<Images_Interface> => {

    const [images]:[ImagesList, React.Dispatch<ImagesList>] = React.useState(useStaticQuery(graphql `
        {
            keyBenefitIcon: file(relativePath: {eq: "icons/key_benefit.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                    }
                }
            }
            cartBasketIcon: file(relativePath: {eq: "icons/cart_basket.svg"}) {
                publicURL
            }
            closeWhiteIcon: file(relativePath: {eq: "icons/close-white.webp"}) {
                publicURL
            }
            hexagonalCross: file(relativePath: {eq: "icons/closingcross.png"}) {
                childImageSharp {
                    fluid {
                        srcSet
                        srcSetWebp
                    }
                }
            }
            rmvInit: file(relativePath: {eq: "icons/rmv-article-init.svg"}) {
                publicURL
            }
            rmvHover: file(relativePath: {eq: "icons/rmv-article-blue.svg"}) {
                publicURL
            }
            contactUsPiece: file(relativePath: {eq: "contact_us.png"}) {
                childImageSharp {
                    fluid {
                        srcSet
                        srcSetWebp
                    }
                }
            }
            fixedMenuLogo: file(relativePath: {eq: "header-logo.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            headerLogo: file(relativePath: {eq: "header-logo.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                        base64
                        tracedSVG
                    }
                }
            }
            seoLogo: file(relativePath: {eq: "header-logo.png"}) {
                img: childImageSharp {
                    srcProps: fixed(width: 100, height: 100) {
                        src: srcWebp
                    }
                }
            }
            seoLogo2: file(relativePath: {eq: "header-logo.png"}) {
                img: childImageSharp {
                    srcProps: fluid {
                        src: srcWebp
                    }
                }
            }
            footerLogo: file(relativePath: {eq: "footer-logo.png"}) {
                childImageSharp {
                    fluid {
                        aspectRatio
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            addressIcon: file(relativePath: {eq: "icons/icomoon/svg/073-location2.svg"}) {
                publicURL
            }
            phoneIcon: file(relativePath: {eq: "icons/icomoon/svg/067-phone.svg"}) {
                publicURL
            }
            mailIcon: file(relativePath: {eq: "icons/icomoon/svg/391-mail5.svg"}) {
                publicURL
            }
            bgPattern: file(relativePath: {eq: "footer-bg-pattern.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            privacyPolicyTriangle: file(relativePath: {eq: "privacy-icon.svg"}) {
                publicURL
            }
            privacyPolicyC: file(relativePath: {eq: "privacy-c.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                    }
                }
            }
            learnIcon: file(relativePath: {eq: "about-us/learn-icon.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
                publicURL
            }
            backAlveole: file(relativePath: {eq: "home/bg-alveoles.jpg"}) {
                publicURL
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            wideBackAlveole: file(relativePath: {eq: "home/wide-bg-alveoles.png"}) {
                publicURL
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            alveole1: file(relativePath: {eq: "home/alveole-1.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            alveole2: file(relativePath: {eq: "home/alveole-2.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            alveole3: file(relativePath: {eq: "home/alveole-3.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            alveole4: file(relativePath: {eq: "home/alveole-4.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            alveole5: file(relativePath: {eq: "home/alveole-5.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            homeClinicalBack: file(relativePath: {eq: "home/media-bg.webp"}) {
                publicURL
            }
            homeClinicalStudy: file(relativePath: {eq: "home/studies-img.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            heroHeader: file(relativePath: {eq: "hero-3.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            plusIcon: file(relativePath: {eq: "icons/add.svg"}) {
                publicURL
            }
            arrowRightIcon: file(relativePath: {eq: "icons/arrow-right.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            gatsbyAstronaut: file(relativePath: {eq: "gatsby-astronaut.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            nextImage: file(relativePath: {eq: "products/addons/next.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            eventsNoImg: file(relativePath: {eq: "header-logo.png"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
            }
            awardElle: file(relativePath: {eq: "award-elle.webp"}) {
                publicURL
            }
            awardShape: file(relativePath: {eq: "award-shape.webp"}) {
                publicURL
            }
            awardBeauty: file(relativePath: {eq: "award-beauty.webp"}) {
                publicURL
            }
            award2019: file(relativePath: {eq: "award-2019.gif"}) {
                publicURL
            }
            award2021: file(relativePath: {eq: "award-2021.jpg"}) {
                publicURL
            }
            awardDiamonds: file(relativePath: {eq: "award-diamond.jpg"}) {
                publicURL
            }
            homeIcon: file(relativePath: {eq: "icons/home-icon.svg"}) {
                publicURL
            }
            homeIconHover: file(relativePath: {eq: "icons/home-icon-blue.svg"}) {
                publicURL
            }
            case_01: file(relativePath: {eq: "case/01 . Trikwan case study.webp"}) {
                publicURL
            }
            case_02: file(relativePath: {eq: "case/02 . bodytite_CS1_NW.webp"}) {
                publicURL
            }
            case_03: file(relativePath: {eq: "case/03 . M8_CS2_HD.webp"}) {
                publicURL
            }
            case_04: file(relativePath: {eq: "case/04 . CPullen-case-study.webp"}) {
                publicURL
            }
            case_05: file(relativePath: {eq: "case/05 . Aesthetically You.webp"}) {
                publicURL
            }
            case_06: file(relativePath: {eq: "case/06 . KPA case study.webp"}) {
                publicURL
            }
            case_07: file(relativePath: {eq: "case/07.png"}) {
                publicURL
            }
            case_08: file(relativePath: {eq: "case/08.png"}) {
                publicURL
            }
            case_09: file(relativePath: {eq: "case/09.jpg"}) {
                publicURL
            }
            case_10: file(relativePath: {eq: "case/10.png"}) {
                publicURL
            }
            case_11: file(relativePath: {eq: "case/11.jpg"}) {
                publicURL
            }
            case_12: file(relativePath: {eq: "case/12.png"}) {
                publicURL
            }
            lock: file(relativePath: {eq: "icons/lock.svg"}) {
                publicURL
            }
        }
    `));
    // eventsNoImg: file(relativePath: {eq: "events-no-img.jpg"}) {
    //     childImageSharp {
    //         fluid {
    //             srcWebp
    //             srcSetWebp
    //         }
    //     }
    // }

    const getOneImage = (request:string):GatsbyImage_Interface | null => {
        if(request == null || typeof request != 'string') {
            return null;
        }
        return images[request];
    };

    const getImageSet = (request:string):GatsbyImage_Interface | null => {
        if(request == null || !Array.isArray(request)) {
            return null;
        }
        else {
            return request.map((ask:string) => {
                return getOneImage(ask);
            }).filter(elem => elem);
        }
    };

    return (
        <ImagesContext.Provider value = {{
            'getOne': getOneImage,
            'getSet': getImageSet,
        }}>
            {children}
        </ImagesContext.Provider>
    );
};

interface ImagesList {
    keyBenefitIcon: GatsbyImage_Interface;
    cartBasketIcon: GatsbyImage_Interface;
    closeWhiteIcon: GatsbyImage_Interface;
    hexagonalCross: GatsbyImage_Interface;
    rmvInit: GatsbyImage_Interface;
    rmvHover: GatsbyImage_Interface;
    contactUsPiece: GatsbyImage_Interface;
    fixedMenuLogo: GatsbyImage_Interface;
    headerLogo: GatsbyImage_Interface;
    seoLogo: GatsbyImage_Interface;
    footerLogo: GatsbyImage_Interface;
    addressIcon: GatsbyImage_Interface;
    phoneIcon: GatsbyImage_Interface;
    mailIcon: GatsbyImage_Interface;
    bgPattern: GatsbyImage_Interface;
    privacyPolicyTriangle: GatsbyImage_Interface;
    privacyPolicyC: GatsbyImage_Interface;
    backAlveole: GatsbyImage_Interface;
    alveole1: GatsbyImage_Interface;
    alveole2: GatsbyImage_Interface;
    alveole3: GatsbyImage_Interface;
    alveole4: GatsbyImage_Interface;
    alveole5: GatsbyImage_Interface;
    homeClinicalBack: GatsbyImage_Interface;
    homeClinicalStudy: GatsbyImage_Interface;
    heroHeader: GatsbyImage_Interface;
    plusIcon: GatsbyImage_Interface;
    arrowRightIcon: GatsbyImage_Interface;
    gatsbyAstronaut: GatsbyImage_Interface;
    eventsNoImg: GatsbyImage_Interface;
    awardElle: GatsbyImage_Interface;
    awardShape: GatsbyImage_Interface;
    awardBeauty: GatsbyImage_Interface;
    award2019: GatsbyImage_Interface;
    award2021: GatsbyImage_Interface;
    awardDiamonds: GatsbyImage_Interface;
    homeIcon: GatsbyImage_Interface;
    homeIconHover: GatsbyImage_Interface;
    case_01: GatsbyImage_Interface;
    case_02: GatsbyImage_Interface;
    case_03: GatsbyImage_Interface;
    case_04: GatsbyImage_Interface;
    case_05: GatsbyImage_Interface;
    case_06: GatsbyImage_Interface;
    case_07: GatsbyImage_Interface;
    case_08: GatsbyImage_Interface;
    case_09: GatsbyImage_Interface;
    case_10: GatsbyImage_Interface;
    case_11: GatsbyImage_Interface;
    case_12: GatsbyImage_Interface;
    lock: GatsbyImage_Interface;
}

export default ImagesProvider;