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
            whiteEditIcon: file(relativePath: {eq: "icons/edit-white.svg"}) {
                ...FileImgFormat
            }
            blueEditIcon: file(relativePath: {eq: "icons/edit-blue.svg"}) {
                ...FileImgFormat
            }
            keyBenefitIcon: file(relativePath: {eq: "icons/key_benefit.png"}) {
                ...FileImgFormat
            }
            keyBenefitIconTeal: file(relativePath: {eq: "icons/key_benefit_teal.svg"}) {
                ...FileImgFormat
            }
            keyBenefitIconRose: file(relativePath: {eq: "icons/key_benefit_dusty.png"}) {
                ...FileImgFormat
            }
            keyBenefitDefine: file(relativePath: {eq: "icons/key_define.png"}) {
                ...FileImgFormat
            }
            keyBenefitEnvision: file(relativePath: {eq: "icons/key_envision.png"}) {
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
            newHeaderInmodeLogo: file(relativePath: {eq: "new-header-inmode-logo.png"}) {
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
            arrowLeftIcon: file(relativePath: {eq: "icons/arrow-left.png"}) {
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

            empowerRFPromoPoster: file(relativePath: {eq: "products/empowerrf/promo-video-poster.jpg"}) {
                ...FileImgFormat
            }
            empowerRFMachinePoster: file(relativePath: {eq: "products/empowerrf/empowerrf-launch-linkedin-post-preview-3.jpg"}) {
                ...FileImgFormat
            }

            inmodeStamp: file(relativePath: {eq: "about-us/inmode-stamp.png"}) {
                ...FileImgFormat
            }

            EnvisionLogo: file(relativePath: {eq: "products/envision/envision logo.avif"}) {
                ...FileImgFormat
            }
            EnvisionBa1FormaI: file(relativePath: {eq: "products/envision/ba1 - formaI.png"}) {
                ...FileImgFormat
            }
            EnvisionBa2FormaI: file(relativePath: {eq: "products/envision/ba2 - formaI.jpg"}) {
                ...FileImgFormat
            }
            EnvisionBa3FormaI: file(relativePath: {eq: "products/envision/ba3 - formaI.jpg"}) {
                ...FileImgFormat
            }
            EnvisionFormaIMarine: file(relativePath: {eq: "products/envision/formaI marine.jpg"}) {
                ...FileImgFormat
            }
            EnvisionFormaIAzuli: file(relativePath: {eq: "products/envision/formaI azuli.png"}) {
                ...FileImgFormat
            }
            EnvisionLumecaIMarine: file(relativePath: {eq: "products/envision/lumeccaI marine.jpg"}) {
                ...FileImgFormat
            }
            EnvisionLumecaIAzuli: file(relativePath: {eq: "products/envision/lumeccaI azuli.png"}) {
                ...FileImgFormat
            }
            EnvisionMorpheusMarine: file(relativePath: {eq: "products/envision/morpheus marine.jpg"}) {
                ...FileImgFormat
            }
            EnvisionMorpheusAzuli: file(relativePath: {eq: "products/envision/morpheus azuli.jpg"}) {
                ...FileImgFormat
            }
            EnvisionFormaIBack: file(relativePath: {eq: "products/envision/formaI - back.webp"}) {
                ...FileImgFormat
            }
            EnvisionFormaIZoom: file(relativePath: {eq: "products/envision/formaI - zoom.webp"}) {
                ...FileImgFormat
            }
            EnvisionLumeccaIBack: file(relativePath: {eq: "products/envision/lumeccaI - back.webp"}) {
                ...FileImgFormat
            }
            EnvisionLumeccaIZoom: file(relativePath: {eq: "products/envision/lumeccaI - zoom.webp"}) {
                ...FileImgFormat
            }
            EnvisionMorpheus8Back: file(relativePath: {eq: "products/envision/morpheus8 - back.webp"}) {
                ...FileImgFormat
            }
            EnvisionMorpheus8Zoom: file(relativePath: {eq: "products/envision/morpheus8 - zoom.webp"}) {
                ...FileImgFormat
            }
            EnvisionBlackLogo: file(relativePath: {eq: "products/envision/envision black.png"}) {
                ...FileImgFormat
            }
            EnvisionBannerRight: file(relativePath: {eq: "products/envision/envision banner right.jpg"}) {
                ...FileImgFormat
            }
            EnvisionLogoRight: file(relativePath: {eq: "products/envision/EnvisionLogoRight.png"}) {
                ...FileImgFormat
            }

            DefineFullLogo: file(relativePath: {eq: "products/define/define banner logo.png"}) {
                ...FileImgFormat
            }
            DefineCheekTitle: file(relativePath: {eq: "products/define/DEFINE CHEEK.png"}) {
                ...FileImgFormat
            }
            DefineChinTitle: file(relativePath: {eq: "products/define/DEFINE CHIN.png"}) {
                ...FileImgFormat
            }
            DefineMorpheus8AddonTitle: file(relativePath: {eq: "products/define/Morpheus8.png"}) {
                ...FileImgFormat
            }
            EmpowerRFMorpheus8AddonTitle: file(relativePath: {eq: "products/empowerrf/Morpheus8.svg"}) {
                ...FileImgFormat
            }

            CarrouselBodyTiteIcone: file(relativePath: {eq: "products/carousel/bodytite_icone_midnight.svg"}) {...FileImgFormat}
            CarrouselTritonLogo: file(relativePath: {eq: "products/carousel/triton_logo_midnight.svg"}) {...FileImgFormat}
            CarrouselContouraIcone: file(relativePath: {eq: "products/carousel/contoura_icone_midnight.svg"}) {...FileImgFormat}
            CarrouselBodyTiteLogo: file(relativePath: {eq: "products/carousel/bodytite_logo_midnight.svg"}) {...FileImgFormat}
            CarrouselDefineIcone: file(relativePath: {eq: "products/carousel/define_icone_blueduck.svg"}) {...FileImgFormat}
            CarrouselContouraLogo: file(relativePath: {eq: "products/carousel/contoura_logo_midnight.svg"}) {...FileImgFormat}
            CarrouselEmpowerrfIcone: file(relativePath: {eq: "products/carousel/empowerrf_icone_dusty_rose.svg"}) {...FileImgFormat}
            CarrouselDefineLogo: file(relativePath: {eq: "products/carousel/define_logo_blueduck.svg"}) {...FileImgFormat}
            CarrouselEnvisionIcone: file(relativePath: {eq: "products/carousel/envision_icone_lazuli.svg"}) {...FileImgFormat}
            CarrouselEmpowerrfLogo: file(relativePath: {eq: "products/carousel/empowerrf_logo_dusty_rose.svg"}) {...FileImgFormat}
            CarrouselEvokeIcone: file(relativePath: {eq: "products/carousel/evoke_icone_midnight.svg"}) {...FileImgFormat}
            CarrouselEnvisionLogo: file(relativePath: {eq: "products/carousel/envision_logo_lazuli.svg"}) {...FileImgFormat}
            CarrouselEvolvexIcone: file(relativePath: {eq: "products/carousel/evolvex_icone_midnight.svg"}) {...FileImgFormat}
            CarrouselEvokeLogo: file(relativePath: {eq: "products/carousel/evoke_logo_midnight.svg"}) {...FileImgFormat}
            CarrouselOptimasIcone: file(relativePath: {eq: "products/carousel/optimas_icone_midnight.svg"}) {...FileImgFormat}
            CarrouselEvolvexLogo: file(relativePath: {eq: "products/carousel/evolvex_logo_midnight.svg"}) {...FileImgFormat}
            CarrouselTritonIcone: file(relativePath: {eq: "products/carousel/triton_icone_midnight.svg"}) {...FileImgFormat}
            CarrouselOptimasLogo: file(relativePath: {eq: "products/carousel/optimas_logo_midnight.svg"}) {...FileImgFormat}

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
                original {
                    width
                    height
                }
            }
            publicURL
            ext
            extension
        }
    `));

    const getImageRatio = (request:string):number|undefined => {
        let image = getOneImage(request);
        if(image && image.childImageSharp?.fluid?.aspectRatio) {
            return image.childImageSharp?.fluid?.aspectRatio;
        }
        if(image && image.childImageSharp?.fixed?.aspectRatio) {
            return image.childImageSharp?.fixed?.aspectRatio;
        }
        if(image && image.childImageSharp?.original) {
            return (image.childImageSharp.original.height ?? 1) / (image.childImageSharp.original.width ?? 1);
        }
        return undefined;
    };

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
        return img.ext == ".svg" || img.extension == "svg" ? img.publicURL : img?.childImageSharp?.fluid?.srcWebp
        || img?.childImageSharp?.fixed?.srcWebp
        || img?.publicURL
        || img?.absolutePath
        || img?.url
        || undefined;
    }

    const resolveImgSet = (request:string):string|undefined => {
        const img = getOneImage(request);
        if(img == null) {return undefined;}
        return img.ext == ".svg" || img.extension == "svg" ? img.publicURL : img?.childImageSharp?.fluid?.srcSetWebp
        || img?.childImageSharp?.fixed?.srcSetWebp
        || img?.publicURL
        || img?.absolutePath
        || img?.url
        || undefined;
    }

    return (
        <ImagesContext.Provider value = {{
            'get_ratio': getImageRatio,
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
    logoutIcon: GatsbyImage_Interface;
    whiteEditIcon: GatsbyImage_Interface;
    blueEditIcon: GatsbyImage_Interface;
    keyBenefitIcon: GatsbyImage_Interface;
    keyBenefitIconTeal: GatsbyImage_Interface;
    keyBenefitIconRose: GatsbyImage_Interface;
    keyBenefitDefine: GatsbyImage_Interface;
    keyBenefitEnvision: GatsbyImage_Interface;
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
    newHeaderInmodeLogo: GatsbyImage_Interface;
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
    arrowLeftIcon: GatsbyImage_Interface;
    gatsbyAstronaut: GatsbyImage_Interface;
    whiteTrash: GatsbyImage_Interface;
    redTrash: GatsbyImage_Interface;

    empowerRFPromoPoster: GatsbyImage_Interface;
    empowerRFMachinePoster: GatsbyImage_Interface;
    
    inmodeStamp: GatsbyImage_Interface;

    EnvisionLogo: GatsbyImage_Interface;
    EnvisionBa1FormaI: GatsbyImage_Interface;
    EnvisionBa2FormaI: GatsbyImage_Interface;
    EnvisionBa3FormaI: GatsbyImage_Interface;
    EnvisionFormaIMarine: GatsbyImage_Interface;
    EnvisionFormaIAzuli: GatsbyImage_Interface;
    EnvisionLumecaIMarine: GatsbyImage_Interface;
    EnvisionLumecaIAzuli: GatsbyImage_Interface;
    EnvisionMorpheusMarine: GatsbyImage_Interface;
    EnvisionMorpheusAzuli: GatsbyImage_Interface;
    EnvisionFormaIBack: GatsbyImage_Interface;
    EnvisionFormaIZoom: GatsbyImage_Interface;
    EnvisionLumeccaIBack: GatsbyImage_Interface;
    EnvisionLumeccaIZoom: GatsbyImage_Interface;
    EnvisionMorpheus8Back: GatsbyImage_Interface;
    EnvisionMorpheus8Zoom: GatsbyImage_Interface;
    EnvisionBlackLogo: GatsbyImage_Interface;
    EnvisionBannerRight: GatsbyImage_Interface;
    EnvisionLogoRight: GatsbyImage_Interface;
    
    DefineFullLogo: GatsbyImage_Interface;
    DefineCheekTitle: GatsbyImage_Interface;
    DefineChinTitle: GatsbyImage_Interface;

    DefineMorpheus8AddonTitle: GatsbyImage_Interface;
    EmpowerRFMorpheus8AddonTitle: GatsbyImage_Interface;

    CarrouselTritonIcone: GatsbyImage_Interface;
    CarrouselBodytiteLogo: GatsbyImage_Interface;
    CarrouselBodytiteIcone: GatsbyImage_Interface;
    CarrouselContouraLogo: GatsbyImage_Interface;
    CarrouselContouraIcone: GatsbyImage_Interface;
    CarrouselDefineLogo: GatsbyImage_Interface;
    CarrouselDefineIcone: GatsbyImage_Interface;
    CarrouselEmpowerrfLogo: GatsbyImage_Interface;
    CarrouselEmpowerrfIcone: GatsbyImage_Interface;
    CarrouselEnvisionLogo: GatsbyImage_Interface;
    CarrouselEnvisionIcone: GatsbyImage_Interface;
    CarrouselEvokeLogo: GatsbyImage_Interface;
    CarrouselEvokeIcone: GatsbyImage_Interface;
    CarrouselEvolvexLogo: GatsbyImage_Interface;
    CarrouselEvolvexIcone: GatsbyImage_Interface;
    CarrouselOptimasLogo: GatsbyImage_Interface;
    CarrouselOptimasIcone: GatsbyImage_Interface;
    CarrouselTritonLogo: GatsbyImage_Interface;
};

export default ImagesProvider;