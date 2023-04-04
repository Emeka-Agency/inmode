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
            logoutIcon: file(relativePath: {eq: "icons/exit.svg"}) {
                ...FileImgFormat
            }
            profileIcon: file(relativePath: {eq: "icons/profile.svg"}) {
                ...FileImgFormat
            }
            whiteEditIcon: file(relativePath: {eq: "icons/edit-white.svg"}) {
                ...FileImgFormat
            }
            blueEditIcon: file(relativePath: {eq: "icons/edit-blue.svg"}) {
                ...FileImgFormat
            }
            keyBenefitIcon: file(relativePath: {eq: "icons/key_benefit.png"}) {
                ...FileImgFormat
            }
            keyBenefitIconTeal: file(relativePath: {eq: "icons/key_benefit_teal.png"}) {
                ...FileImgFormat
            }
            keyBenefitIconRose: file(relativePath: {eq: "icons/key_benefit_dusty.png"}) {
                ...FileImgFormat
            }
            orderCreateSpinner: file(relativePath: {eq: "icons/order-create-spinner.svg"}) {
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
            headerLogo2: file(relativePath: {eq: "header-logo-2.png"}) {
                ...FileImgFormat
            }
            headerLogo3: file(relativePath: {eq: "header-logo-3.png"}) {
                ...FileImgFormat
            }
            headerLogo4: file(relativePath: {eq: "header-logo-4.png"}) {
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
            footerLogo2: file(relativePath: {eq: "footer-logo2.png"}) {
                ...FileImgFormat
            }
            footerLogo3: file(relativePath: {eq: "footer-logo-3.png"}) {
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
            backAlveole: file(relativePath: {eq: "home/bg-alveoles.jpg"}) {
                ...FileImgFormat
            }
            alveole1: file(relativePath: {eq: "home/alveole-1.jpg"}) {
                ...FileImgFormat
            }
            new_alveole1: file(relativePath: {eq: "home/alveole congres.jpg"}) {
                ...FileImgFormat
            }
            alveole2: file(relativePath: {eq: "home/alveole-2.jpg"}) {
                ...FileImgFormat
            }
            new_alveole2: file(relativePath: {eq: "home/alveole webinar.jpg"}) {
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
            homeClinicalBack2: file(relativePath: {eq: "home/media-bg-2.jpg"}) {
                ...FileImgFormat
            }
            homeClinicalStudy: file(relativePath: {eq: "home/studies-img.png"}) {
                ...FileImgFormat
            }
            heroHeader: file(relativePath: {eq: "hero-3.png"}) {
                ...FileImgFormat
            }
            hero1: file(relativePath: {eq: "home/hero-1.jpg"}) {
                ...FileImgFormat
            }
            hero2: file(relativePath: {eq: "home/hero-2.jpg"}) {
                ...FileImgFormat
            }
            hero3: file(relativePath: {eq: "home/hero-3.jpg"}) {
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
            whiteTrash: file(relativePath: {eq: "icons/white-trash.svg"}) {
                ...FileImgFormat
            }
            redTrash: file(relativePath: {eq: "icons/red-trash.svg"}) {
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
    profileIcon: GatsbyImage_Interface;
    logoutIcon: GatsbyImage_Interface;
    whiteEditIcon: GatsbyImage_Interface;
    blueEditIcon: GatsbyImage_Interface;
    keyBenefitIcon: GatsbyImage_Interface;
    keyBenefitIconTeal: GatsbyImage_Interface;
    keyBenefitIconRose: GatsbyImage_Interface;
    orderCreateSpinner: GatsbyImage_Interface;
    cartBasketIcon: GatsbyImage_Interface;
    closeWhiteIcon: GatsbyImage_Interface;
    hexagonalCross: GatsbyImage_Interface;
    rmvInit: GatsbyImage_Interface;
    rmvHover: GatsbyImage_Interface;
    contactUsPiece: GatsbyImage_Interface;
    fixedMenuLogo: GatsbyImage_Interface;
    headerLogo: GatsbyImage_Interface;
    headerLogo2: GatsbyImage_Interface;
    headerLogo3: GatsbyImage_Interface;
    headerLogo4: GatsbyImage_Interface;
    seoLogo: GatsbyImage_Interface;
    footerLogo: GatsbyImage_Interface;
    footerLogo2: GatsbyImage_Interface;
    footerLogo3: GatsbyImage_Interface;
    addressIcon: GatsbyImage_Interface;
    phoneIcon: GatsbyImage_Interface;
    mailIcon: GatsbyImage_Interface;
    bgPattern: GatsbyImage_Interface;
    privacyPolicyTriangle: GatsbyImage_Interface;
    privacyPolicyC: GatsbyImage_Interface;
    backAlveole: GatsbyImage_Interface;
    alveole1: GatsbyImage_Interface;
    new_alveole1: GatsbyImage_Interface;
    alveole2: GatsbyImage_Interface;
    new_alveole2: GatsbyImage_Interface;
    alveole3: GatsbyImage_Interface;
    alveole4: GatsbyImage_Interface;
    alveole5: GatsbyImage_Interface;
    homeClinicalBack: GatsbyImage_Interface;
    homeClinicalBack2: GatsbyImage_Interface;
    homeClinicalStudy: GatsbyImage_Interface;
    heroHeader: GatsbyImage_Interface;
    hero1: GatsbyImage_Interface;
    hero2: GatsbyImage_Interface;
    hero3: GatsbyImage_Interface;
    plusIcon: GatsbyImage_Interface;
    arrowRightIcon: GatsbyImage_Interface;
    gatsbyAstronaut: GatsbyImage_Interface;
    whiteTrash: GatsbyImage_Interface;
    redTrash: GatsbyImage_Interface;
};

export default ImagesProvider;