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
                ...FileImgFormat
            }
            cartBasketIcon: file(relativePath: {eq: "icons/cart_basket.svg"}) {
                ...FileImgFormat
            }
            closeWhiteIcon: file(relativePath: {eq: "icons/close-white.webp"}) {
                ...FileImgFormat
            }
            hexagonalCross: file(relativePath: {eq: "icons/closingcross.png"}) {
                ...FileImgFormat
            }
            rmvInit: file(relativePath: {eq: "icons/rmv-article-init.svg"}) {
                ...FileImgFormat
            }
            rmvHover: file(relativePath: {eq: "icons/rmv-article-blue.svg"}) {
                ...FileImgFormat
            }
            contactUsPiece: file(relativePath: {eq: "contact_us.png"}) {
                ...FileImgFormat
            }
            fixedMenuLogo: file(relativePath: {eq: "header-logo.png"}) {
                ...FileImgFormat
            }
            headerLogo: file(relativePath: {eq: "header-logo.png"}) {
                ...FileImgFormat
            }
            seoLogo: file(relativePath: {eq: "header-logo.png"}) {
                ...FileImgFormat
            }
            seoLogo2: file(relativePath: {eq: "header-logo.png"}) {
                ...FileImgFormat
            }
            footerLogo: file(relativePath: {eq: "footer-logo.png"}) {
                ...FileImgFormat
            }
            addressIcon: file(relativePath: {eq: "icons/icomoon/svg/073-location2.svg"}) {
                ...FileImgFormat
            }
            phoneIcon: file(relativePath: {eq: "icons/icomoon/svg/067-phone.svg"}) {
                ...FileImgFormat
            }
            mailIcon: file(relativePath: {eq: "icons/icomoon/svg/391-mail5.svg"}) {
                ...FileImgFormat
            }
            bgPattern: file(relativePath: {eq: "footer-bg-pattern.png"}) {
                ...FileImgFormat
            }
            privacyPolicyTriangle: file(relativePath: {eq: "privacy-icon.svg"}) {
                ...FileImgFormat
            }
            privacyPolicyC: file(relativePath: {eq: "privacy-c.png"}) {
                ...FileImgFormat
            }
            learnIcon: file(relativePath: {eq: "about-us/learn-icon.png"}) {
                ...FileImgFormat
            }
            backAlveole: file(relativePath: {eq: "home/bg-alveoles.jpg"}) {
                ...FileImgFormat
            }
            wideBackAlveole: file(relativePath: {eq: "home/wide-bg-alveoles.png"}) {
                ...FileImgFormat
            }
            alveole1: file(relativePath: {eq: "home/alveole-1.jpg"}) {
                ...FileImgFormat
            }
            alveole2: file(relativePath: {eq: "home/alveole-2.jpg"}) {
                ...FileImgFormat
            }
            alveole3: file(relativePath: {eq: "home/alveole-3.jpg"}) {
                ...FileImgFormat
            }
            alveole4: file(relativePath: {eq: "home/alveole-4.png"}) {
                ...FileImgFormat
            }
            alveole5: file(relativePath: {eq: "home/alveole-5.jpg"}) {
                ...FileImgFormat
            }
            homeClinicalBack: file(relativePath: {eq: "home/media-bg.webp"}) {
                ...FileImgFormat
            }
            homeClinicalStudy: file(relativePath: {eq: "home/studies-img.png"}) {
                ...FileImgFormat
            }
            heroHeader: file(relativePath: {eq: "hero-3.png"}) {
                ...FileImgFormat
            }
            plusIcon: file(relativePath: {eq: "icons/add.svg"}) {
                ...FileImgFormat
            }
            arrowRightIcon: file(relativePath: {eq: "icons/arrow-right.png"}) {
                ...FileImgFormat
            }
            gatsbyAstronaut: file(relativePath: {eq: "gatsby-astronaut.png"}) {
                ...FileImgFormat
            }
            nextImage: file(relativePath: {eq: "products/addons/next.png"}) {
                ...FileImgFormat
            }
            eventsNoImg: file(relativePath: {eq: "header-logo.png"}) {
                ...FileImgFormat
            }
            awardElle: file(relativePath: {eq: "award-elle.webp"}) {
                ...FileImgFormat
            }
            awardShape: file(relativePath: {eq: "award-shape.webp"}) {
                ...FileImgFormat
            }
            awardBeauty: file(relativePath: {eq: "award-beauty.webp"}) {
                ...FileImgFormat
            }
            award2019: file(relativePath: {eq: "award-2019.gif"}) {
                ...FileImgFormat
            }
            award2021: file(relativePath: {eq: "award-2021.jpg"}) {
                ...FileImgFormat
            }
            awardDiamonds: file(relativePath: {eq: "award-diamond.jpg"}) {
                ...FileImgFormat
            }
            homeIcon: file(relativePath: {eq: "icons/home-icon.svg"}) {
                ...FileImgFormat
            }
            homeIconHover: file(relativePath: {eq: "icons/home-icon-blue.svg"}) {
                ...FileImgFormat
            }
            case_01: file(relativePath: {eq: "case/01 . Trikwan case study.webp"}) {
                ...FileImgFormat
            }
            case_02: file(relativePath: {eq: "case/02 . bodytite_CS1_NW.webp"}) {
                ...FileImgFormat
            }
            case_03: file(relativePath: {eq: "case/03 . M8_CS2_HD.webp"}) {
                ...FileImgFormat
            }
            case_04: file(relativePath: {eq: "case/04 . CPullen-case-study.webp"}) {
                ...FileImgFormat
            }
            case_05: file(relativePath: {eq: "case/05 . Aesthetically You.webp"}) {
                ...FileImgFormat
            }
            case_06: file(relativePath: {eq: "case/06 . KPA case study.webp"}) {
                ...FileImgFormat
            }
            case_07: file(relativePath: {eq: "case/07.png"}) {
                ...FileImgFormat
            }
            case_08: file(relativePath: {eq: "case/08.png"}) {
                ...FileImgFormat
            }
            case_09: file(relativePath: {eq: "case/09.jpg"}) {
                ...FileImgFormat
            }
            case_10: file(relativePath: {eq: "case/10.png"}) {
                ...FileImgFormat
            }
            case_11: file(relativePath: {eq: "case/11.jpg"}) {
                ...FileImgFormat
            }
            case_12: file(relativePath: {eq: "case/12.png"}) {
                ...FileImgFormat
            }
            lock: file(relativePath: {eq: "icons/lock.svg"}) {
                ...FileImgFormat
            }
        }

        fragment FileImgFormat on File {
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
            }
            publicURL
            url
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

    const resolveImg = (request:string):string|undefined => {
        const img = getOneImage(request);
        if(img == null) {return undefined;}
        return img?.childImageSharp?.fluid?.srcWebp
        || img?.childImageSharp?.fixed?.srcWebp
        || img?.publicURL
        || img?.absolutePath
        || img?.url
        || undefined;
    }

    const resolveImgSet = (request:string):string|undefined => {
        const img = getOneImage(request);
        if(img == null) {return undefined;}
        return img?.childImageSharp?.fluid?.srcSetWebp
        || img?.childImageSharp?.fixed?.srcSetWebp
        || img?.publicURL
        || img?.absolutePath
        || img?.url
        || undefined;
    }

    return (
        <ImagesContext.Provider value = {{
            'get_one': getOneImage,
            'get_set': getImageSet,
            'resolve_img': resolveImg,
            'resolve_img_set': resolveImgSet
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