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
            logoutIcon: file(relativePath: {eq: "icons/exit.svg"}) {...FileImgFormat}
            whiteEditIcon: file(relativePath: {eq: "icons/edit-white.svg"}) {...FileImgFormat}
            blueEditIcon: file(relativePath: {eq: "icons/edit-blue.svg"}) {...FileImgFormat}
            keyBenefitIcon: file(relativePath: {eq: "icons/key_benefit.png"}) {...FileImgFormat}
            keyBenefitIconTeal: file(relativePath: {eq: "icons/key_benefit_teal.svg"}) {...FileImgFormat}
            keyBenefitIconRose: file(relativePath: {eq: "icons/key_benefit_dusty.png"}) {...FileImgFormat}
            keyBenefitDefine: file(relativePath: {eq: "icons/key_define.png"}) {...FileImgFormat}
            keyBenefitEnvision: file(relativePath: {eq: "icons/key_envision.png"}) {...FileImgFormat}
            keyBenefitIgniteRF: file(relativePath: {eq: "products/igniterf/InMode - Bullet Point (Carbon-Fire) - V1.svg"}) {...FileImgFormat}
            keyBenefitIgniteRF2: file(relativePath: {eq: ""products/igniterf/Zoning 3 - Avantages/InMode - Bullet Point (Carbon-Fire) - V2.svg""}) {...FileImgFormat}
            
            orderCreateSpinner: file(relativePath: {eq: "icons/order-create-spinner.svg"}) {...FileImgFormat}
            cartBasketIcon: file(relativePath: {eq: "icons/cart_basket.svg"}) {...FileImgFormat}
            closeWhiteIcon: file(relativePath: {eq: "icons/close-white.webp"}) {...FileImgFormat}
            hexagonalCross: file(relativePath: {eq: "icons/closingcross.png"}) {...FileImgFormat}
            rmvInit: file(relativePath: {eq: "icons/rmv-article-init.svg"}) {...FileImgFormat}
            rmvHover: file(relativePath: {eq: "icons/rmv-article-blue.svg"}) {...FileImgFormat}
            contactUsPiece: file(relativePath: {eq: "contact_us.png"}) {...FileImgFormat}
            contactUsPiece2: file(relativePath: {eq: "nous_contacter.png"}) {...FileImgFormat}
            fixedMenuLogo: file(relativePath: {eq: "header-logo.png"}) {...FileImgFormat}
            headerLogo: file(relativePath: {eq: "header-logo.png"}) {...FileImgFormat}
            headerLogo2: file(relativePath: {eq: "header-logo-2.png"}) {...FileImgFormat}
            headerLogo3: file(relativePath: {eq: "header-logo-3.png"}) {...FileImgFormat}
            headerLogo4: file(relativePath: {eq: "header-logo-4.png"}) {...FileImgFormat}
            seoLogo: file(relativePath: {eq: "header-logo.png"}) {...FileImgFormat}
            seoLogo2: file(relativePath: {eq: "header-logo.png"}) {...FileImgFormat}
            footerLogo: file(relativePath: {eq: "footer-logo.png"}) {...FileImgFormat}
            footerLogo2: file(relativePath: {eq: "footer-logo2.png"}) {...FileImgFormat}
            footerLogo3: file(relativePath: {eq: "footer-logo-3.png"}) {...FileImgFormat}
            newHeaderInmodeLogo: file(relativePath: {eq: "new-header-inmode-logo.png"}) {...FileImgFormat}
            addressIcon: file(relativePath: {eq: "icons/icomoon/svg/073-location2.svg"}) {...FileImgFormat}
            phoneIcon: file(relativePath: {eq: "icons/icomoon/svg/067-phone.svg"}) {...FileImgFormat}
            mailIcon: file(relativePath: {eq: "icons/icomoon/svg/391-mail5.svg"}) {...FileImgFormat}
            bgPattern: file(relativePath: {eq: "footer-bg-pattern.png"}) {...FileImgFormat}
            privacyPolicyTriangle: file(relativePath: {eq: "privacy-icon.svg"}) {...FileImgFormat}
            privacyPolicyC: file(relativePath: {eq: "privacy-c.png"}) {...FileImgFormat}
            backAlveole: file(relativePath: {eq: "home/bg-alveoles.jpg"}) {...FileImgFormat}
            alveole1: file(relativePath: {eq: "home/alveole-1.jpg"}) {...FileImgFormat}
            new_alveole1: file(relativePath: {eq: "home/alveole congres.jpg"}) {...FileImgFormat}
            alveole2: file(relativePath: {eq: "home/alveole-2.jpg"}) {...FileImgFormat}
            new_alveole2: file(relativePath: {eq: "home/alveole webinar.jpg"}) {...FileImgFormat}
            alveole3: file(relativePath: {eq: "home/alveole-3.jpg"}) {...FileImgFormat}
            alveole4: file(relativePath: {eq: "home/alveole-4.png"}) {...FileImgFormat}
            alveole5: file(relativePath: {eq: "home/alveole-5.jpg"}) {...FileImgFormat}
            homeClinicalBack: file(relativePath: {eq: "home/media-bg.webp"}) {...FileImgFormat}
            homeClinicalBack2: file(relativePath: {eq: "home/media-bg-2.jpg"}) {...FileImgFormat}
            homeClinicalStudy: file(relativePath: {eq: "home/studies-img.png"}) {...FileImgFormat}
            heroHeader: file(relativePath: {eq: "hero-3.png"}) {...FileImgFormat}
            hero1: file(relativePath: {eq: "home/hero-1.jpg"}) {...FileImgFormat}
            hero2: file(relativePath: {eq: "home/hero-2.jpg"}) {...FileImgFormat}
            hero3: file(relativePath: {eq: "home/hero-3.jpg"}) {...FileImgFormat}
            plusIcon: file(relativePath: {eq: "icons/add.svg"}) {...FileImgFormat}
            arrowRightIcon: file(relativePath: {eq: "icons/arrow-right.png"}) {...FileImgFormat}
            arrowLeftIcon: file(relativePath: {eq: "icons/arrow-left.png"}) {...FileImgFormat}
            gatsbyAstronaut: file(relativePath: {eq: "gatsby-astronaut.png"}) {...FileImgFormat}
            nextImage: file(relativePath: {eq: "products/addons/next.png"}) {...FileImgFormat}
            whiteTrash: file(relativePath: {eq: "icons/white-trash.svg"}) {...FileImgFormat}
            redTrash: file(relativePath: {eq: "icons/red-trash.svg"}) {...FileImgFormat}

            empowerRFPromoPoster: file(relativePath: {eq: "products/empowerrf/promo-video-poster.jpg"}) {...FileImgFormat}
            empowerRFMachinePoster: file(relativePath: {eq: "products/empowerrf/empowerrf-launch-linkedin-post-preview-3.jpg"}) {...FileImgFormat}

            inmodeStamp: file(relativePath: {eq: "about-us/inmode-stamp.png"}) {...FileImgFormat}

            EnvisionLogo: file(relativePath: {eq: "products/envision/envision logo.avif"}) {...FileImgFormat}
            EnvisionBa1FormaI: file(relativePath: {eq: "products/envision/ba1 - formaI.png"}) {...FileImgFormat}
            EnvisionBa2FormaI: file(relativePath: {eq: "products/envision/ba2 - formaI.jpg"}) {...FileImgFormat}
            EnvisionBa3FormaI: file(relativePath: {eq: "products/envision/ba3 - formaI.jpg"}) {...FileImgFormat}
            EnvisionFormaIMarine: file(relativePath: {eq: "products/envision/formaI marine.jpg"}) {...FileImgFormat}
            EnvisionFormaIAzuli: file(relativePath: {eq: "products/envision/formaI azuli.png"}) {...FileImgFormat}
            EnvisionLumeccaIMarine: file(relativePath: {eq: "products/envision/lumeccaI marine.jpg"}) {...FileImgFormat}
            EnvisionLumeccaIAzuli: file(relativePath: {eq: "products/envision/lumeccaI azuli.png"}) {...FileImgFormat}
            EnvisionMorpheusMarine: file(relativePath: {eq: "products/envision/morpheus marine.jpg"}) {...FileImgFormat}
            EnvisionMorpheusAzuli: file(relativePath: {eq: "products/envision/morpheus azuli.jpg"}) {...FileImgFormat}
            EnvisionFormaIBack: file(relativePath: {eq: "products/envision/formaI - back.webp"}) {...FileImgFormat}
            EnvisionFormaIZoom: file(relativePath: {eq: "products/envision/formaI - zoom.webp"}) {...FileImgFormat}
            EnvisionLumeccaIBack: file(relativePath: {eq: "products/envision/lumeccaI - back.webp"}) {...FileImgFormat}
            EnvisionLumeccaIZoom: file(relativePath: {eq: "products/envision/lumeccaI - zoom.webp"}) {...FileImgFormat}
            EnvisionMorpheus8Back: file(relativePath: {eq: "products/envision/morpheus8 - back.webp"}) {...FileImgFormat}
            EnvisionMorpheus8Zoom: file(relativePath: {eq: "products/envision/morpheus8 - zoom.webp"}) {...FileImgFormat}
            EnvisionBlackLogo: file(relativePath: {eq: "products/envision/envision black.png"}) {...FileImgFormat}
            EnvisionBannerRight: file(relativePath: {eq: "products/envision/envision banner right.jpg"}) {...FileImgFormat}
            EnvisionLogoRight: file(relativePath: {eq: "products/envision/EnvisionLogoRight.png"}) {...FileImgFormat}

            EnvisionMivision: file(relativePath: {eq: "products/envision/(MK) InMode-Envision-Etude-Clinique-Journal-Mivision-DEDEnvision.png"}) {...FileImgFormat}
            EnvisionOphtalmo: file(relativePath: {eq: "products/envision/(MK)-InMode-Envision-Etude-Clinique-PeerRev-OJ-Envision-SPEnvisionFormaI.png"}) {...FileImgFormat}

            IgniteRFBannerLogo: file(relativePath: {eq: "products/igniterf/InMode - IgniteRF - Visuals Icons4.png"}) {...FileImgFormat}
            IgniteRFLogoRight: file(relativePath: {eq: "products/igniterf/InMode - IgniteRF - Logo (Pearl).svg"}) {...FileImgFormat}
            IgniteRFWhatIsDisplay: file(relativePath: {eq: "products/igniterf/InMode - IgniteRF - Workstation.png"}) {...FileImgFormat}
            IgniteRFWhatIsDisplay2: file(relativePath: {eq: "products/igniterf/Ignite-RF_No Tech_Right Side (1).png"}) {...FileImgFormat}
            IgniteRFQuantumRF25Back: file(relativePath: {eq: "products/igniterf/QuantumRF 25 - Visual.png"}) {...FileImgFormat}
            IgniteRFQuantumRF25Zoom: file(relativePath: {eq: "products/igniterf/QuantumRF 25 - Visual.png"}) {...FileImgFormat}
            IgniteRFQuantumRF25Title: file(relativePath: {eq: "products/igniterf/InMode - QuantumRF 25 - Logo (Black-Fire).svg"}) {...FileImgFormat}
            IgniteRFQuantumRF10Back: file(relativePath: {eq: "products/igniterf/QuantumRF 10 - Visual.png"}) {...FileImgFormat}
            IgniteRFQuantumRF10Zoom: file(relativePath: {eq: "products/igniterf/QuantumRF 10 - Visual.png"}) {...FileImgFormat}
            IgniteRFQuantumRF10Title: file(relativePath: {eq: "products/igniterf/InMode - QuantumRF 10 - Logo (Black-Fire).svg"}) {...FileImgFormat}
            IgniteRFBodyTiteTurboBack: file(relativePath: {eq: "products/igniterf/BodyTite Turbo - Visual.png"}) {...FileImgFormat}
            IgniteRFBodyTiteTurboZoom: file(relativePath: {eq: "products/igniterf/BodyTite Turbo - Visual.png"}) {...FileImgFormat}
            IgniteRFBodyTiteTitle: file(relativePath: {eq: "products/igniterf/InMode - BodyTite Turbo - Logo (Black-Fire).svg"}) {...FileImgFormat}
            IgniteRFFaceTiteTurboBack: file(relativePath: {eq: "products/igniterf/FaceTite Turbo - Visual.png"}) {...FileImgFormat}
            IgniteRFFaceTiteTurboZoom: file(relativePath: {eq: "products/igniterf/FaceTite Turbo - Visual.png"}) {...FileImgFormat}
            IgniteRFFaceTiteTurboTitle: file(relativePath: {eq: "products/igniterf/InMode - FaceTite Turbo - Logo (Black-Fire).svg"}) {...FileImgFormat}
            IgniteRFMorpheus8BurstBack: file(relativePath: {eq: "products/igniterf/Morpheus8 Burst - Visual.png"}) {...FileImgFormat}
            IgniteRFMorpheus8BurstZoom: file(relativePath: {eq: "products/igniterf/Morpheus8 Burst - Visual.png"}) {...FileImgFormat}
            IgniteRFMorpheus8BurstTitle: file(relativePath: {eq: "products/igniterf/InMode - Morpheus8 Burst - Logo (Black-Fire).svg"}) {...FileImgFormat}
            IgniteRFMorpheus8BurstDeepBack: file(relativePath: {eq: "products/igniterf/Morpheus8 Burst Deep - Visual.png"}) {...FileImgFormat}
            IgniteRFMorpheus8BurstDeepZoom: file(relativePath: {eq: "products/igniterf/Morpheus8 Burst Deep - Visual.png"}) {...FileImgFormat}
            IgniteRFMorpheus8BurstDeepTitle: file(relativePath: {eq: "products/igniterf/InMode - Morpheus8 Burst Deep - Logo (Black-Fire).svg"}) {...FileImgFormat}
            IgniteRFBodyTiteIgniteRFBack: file(relativePath: {eq: "products/igniterf/BodyTite_IgniteRFBack.png"}) {...FileImgFormat}
            IgniteRFBodyTiteIgniteRFZoom: file(relativePath: {eq: "products/igniterf/BodyTite_IgniteRFZoom.png"}) {...FileImgFormat}
            IgniteRFBodyTiteIgniteRFTitle: file(relativePath: {eq: "products/igniterf/TechnologyLogo_BodyTite_Black.png"}) {...FileImgFormat}
            IgniteRFAccuTiteIgniteRFBack: file(relativePath: {eq: "products/igniterf/AccuTite_IgniteRFBack.png"}) {...FileImgFormat}
            IgniteRFAccuTiteIgniteRFZoom: file(relativePath: {eq: "products/igniterf/AccuTite_IgniteRFZoom.png"}) {...FileImgFormat}
            IgniteRFAccuTiteIgniteRFTitle: file(relativePath: {eq: "products/igniterf/TechnologyLogo_AccuTite_Black.png"}) {...FileImgFormat}
            IgniteRFFaceTiteIgniteRFBack: file(relativePath: {eq: "products/igniterf/Facetite_IgniteRFBack.png"}) {...FileImgFormat}
            IgniteRFFaceTiteIgniteRFZoom: file(relativePath: {eq: "products/igniterf/Facetite_IgniteRFZoom.png"}) {...FileImgFormat}
            IgniteRFFaceTiteIgniteRFTitle: file(relativePath: {eq: "products/igniterf/TechnologyLogo_FaceTite_Black.png"}) {...FileImgFormat}

            IgniteRFBeforeAfterWillis: file(relativePath: {eq: "products/igniterf/Dr. Z. Willis (Facetite).jpg"}) {...FileImgFormat}
            IgniteRFBeforeAfterDiamond: file(relativePath: {eq: "products/igniterf/Diamond Aesthetics (M8 Burst Deep).jpg"}) {...FileImgFormat}
            IgniteRFBeforeAfterRaniere: file(relativePath: {eq: "products/igniterf/Dr. J. Raniere (Bodytite).jpg"}) {...FileImgFormat}
            IgniteRFBeforeAfterClifton: file(relativePath: {eq: "products/igniterf/Dr. M. Clifton (Accutite + M8).png"}) {...FileImgFormat}
            IgniteRFBeforeAfterLoffredo: file(relativePath: {eq: "products/igniterf/Dr. M. Loffredo & Dr. S. Jones.jpg"}) {...FileImgFormat}
            IgniteRFBeforeAfterTarajki: file(relativePath: {eq: "products/igniterf/Dr. M. Tarajki (Facetite).jpg"}) {...FileImgFormat}
            IgniteRFBeforeAfterHester: file(relativePath: {eq: "products/igniterf/Dr. P. Hester.jpg"}) {...FileImgFormat}
            IgniteRFBeforeAfterDiepenbrock: file(relativePath: {eq: "products/igniterf/Dr. R. Diepenbrock (Facetite + M8).jpg"}) {...FileImgFormat}
            IgniteRFBeforeAfterMalhotra: file(relativePath: {eq: "products/igniterf/Dr. R. Malhotra (BodyTite).jpg"}) {...FileImgFormat}

            DefineFullLogo: file(relativePath: {eq: "products/define/define banner logo.png"}) {...FileImgFormat}
            DefineCheekTitle: file(relativePath: {eq: "products/define/DEFINE CHEEK.png"}) {...FileImgFormat}
            DefineChinTitle: file(relativePath: {eq: "products/define/DEFINE CHIN.png"}) {...FileImgFormat}
            DefineMorpheus8AddonTitle: file(relativePath: {eq: "products/define/Morpheus8.png"}) {...FileImgFormat}
            EmpowerRFMorpheus8AddonTitle: file(relativePath: {eq: "products/empowerrf/Morpheus8.svg"}) {...FileImgFormat}
            BannerAddonMorpheus8: file(relativePath: {eq: "products/addons/morpheus8/bandeau.png"}) {...FileImgFormat}

            ProductBannerBodyTite: file(relativePath: {eq: "products/bodytite/bodytite.png"}) {...FileImgFormat}
            ProductBannerEvoke: file(relativePath: {eq: "products/evoke/evoke.png"}) {...FileImgFormat}
            ProductBannerEnvision: file(relativePath: {eq: "products/envision/envision black.png"}) {...FileImgFormat}
            ProductBannerIgniteRF: file(relativePath: {eq: "products/igniterf/InMode - IgniteRF - Icone simple (Pearl).svg"}) {...FileImgFormat}
            ProductBannerIgniteRFIcon: file(relativePath: {eq: "products/igniterf/Icone du logo IgniteRF.png"}) {...FileImgFormat}
            ProductBannerIgniteRFLogo: file(relativePath: {eq: "products/igniterf/Logo IgniteRF.png"}) {...FileImgFormat}

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
            
            BannerIgniteRF: file(relativePath: {eq: "products/igniterf/Bandeau-Nouveaute-IgniteRF-_1_.webp"}) {...FileImgFormat}
            BannerIgniteRF2: file(relativePath: {eq: "products/igniterf/Nouveauté (60 x 20 po).jpg"}) {...FileImgFormat}
            BannerOptimas: file(relativePath: {eq: "products/optimas/BandeauxOptimasMax2.png"}) {...FileImgFormat}

            ExoCoBioAward1: file(relativePath: {eq: "products/ExoCoBio/award1.png"}) {...FileImgFormat}
            ExoCoBioAward2: file(relativePath: {eq: "products/ExoCoBio/award2.png"}) {...FileImgFormat}
            ExoCoBioAward3: file(relativePath: {eq: "products/ExoCoBio/award3.png"}) {...FileImgFormat}
            ExoCoBioExosom: file(relativePath: {eq: "products/ExoCoBio/exosom.gif"}) {...FileImgFormat}
            ExoCoBioWeAreBg: file(relativePath: {eq: "products/ExoCoBio/we_are_bg.png"}) {...FileImgFormat}
            ExoCoBioWeAreBg2: file(relativePath: {eq: "products/ExoCoBio/we_are_bg_2.jpg"}) {...FileImgFormat}
            ExoCoBioWeAreImg: file(relativePath: {eq: "products/ExoCoBio/we_are_img.png"}) {...FileImgFormat}
            ExoCoBioMore1: file(relativePath: {eq: "products/ExoCoBio/more1.png"}) {...FileImgFormat}
            ExoCoBioMore2: file(relativePath: {eq: "products/ExoCoBio/more2.png"}) {...FileImgFormat}
            ExoCoBioMore3: file(relativePath: {eq: "products/ExoCoBio/more3.png"}) {...FileImgFormat}
            ExoCoBioMore4: file(relativePath: {eq: "products/ExoCoBio/more4.png"}) {...FileImgFormat}
            ExoCoBioMore5: file(relativePath: {eq: "products/ExoCoBio/more5.png"}) {...FileImgFormat}
            ExoCoBioBenefitsBg: file(relativePath: {eq: "products/ExoCoBio/benefits_bg.png"}) {...FileImgFormat}
            ExoCobioRecommendLogo: file(relativePath: {eq: "products/ExoCoBio/recommend_morpheus_logo.png"}) {...FileImgFormat}
            ExoCobioRecommendMachine: file(relativePath: {eq: "products/ExoCoBio/recommend_morpheus_machine.png"}) {...FileImgFormat}
            ExoCobioSRLV1: file(relativePath: {eq: "products/ExoCoBio/srlv_1.png"}) {...FileImgFormat}
            ExoCobioSRLV2: file(relativePath: {eq: "products/ExoCoBio/srlv_2.png"}) {...FileImgFormat}
            ExoCobioSRLV3: file(relativePath: {eq: "products/ExoCoBio/srlv_3.png"}) {...FileImgFormat}
            ExoCobioSRLV4: file(relativePath: {eq: "products/ExoCoBio/srlv_4.png"}) {...FileImgFormat}
            ExoCobioHRLV1: file(relativePath: {eq: "products/ExoCoBio/hrlv_1.png"}) {...FileImgFormat}
            ExoCobioHRLV2: file(relativePath: {eq: "products/ExoCoBio/hrlv_2.png"}) {...FileImgFormat}
            ExoCobioIRLV1: file(relativePath: {eq: "products/ExoCoBio/irlv_1.png"}) {...FileImgFormat}
            ExoCobioIRLV2: file(relativePath: {eq: "products/ExoCoBio/irlv_3.webp"}) {...FileImgFormat}
            ExoCobioExoBalm1: file(relativePath: {eq: "products/ExoCoBio/exobalm_1.png"}) {...FileImgFormat}
            ExoCobioAsceGel: file(relativePath: {eq: "products/ExoCoBio/asce_gel.png"}) {...FileImgFormat}
            ExoCobioAsceGelMini: file(relativePath: {eq: "products/ExoCoBio/asce_gel_mini.png"}) {...FileImgFormat}

            OptimasMax__BannerLogo: file(relativePath: {eq: "products/optimas_max/OptimasMAX_Logo.png"}) {...FileImgFormat}
            OptimasMax__BannerMini: file(relativePath: {eq: "products/optimas_max/banner_mini.png"}) {...FileImgFormat}
            OptimasMax__Burst_ChromeLogo: file(relativePath: {eq: "products/optimas_max/Burst_ChromeLogo_0124.png"}) {...FileImgFormat}
            OptimasMax__OptimasMAX4TechLeftSide: file(relativePath: {eq: "products/optimas_max/OptimasMAX_4_Tech_Left_Side (2).png"}) {...FileImgFormat}
            
            IgniteRFSpecialModesBurst: file(relativePath: {eq: "products/igniterf/Zoning 4 - Technologies Burst et Scale/Burst_ChromeLogo.png"}) {...FileImgFormat}
            IgniteRFSpecialModesScale: file(relativePath: {eq: "products/igniterf/Zoning 4 - Technologies Burst et Scale/Scale-Chrome.png"}) {...FileImgFormat}
            
            OptimasMax__Morpheus8Burst24PinTopAngled: file(relativePath: {eq: "products/optimas_max/Morpheus8Burst_24Pin_Top_Angled (1).png"}) {...FileImgFormat}
            OptimasMax__Morpheus8BurstLogo_Final_Black: file(relativePath: {eq: "products/optimas_max/Morpheus8BurstLogo_Final-Black.png"}) {...FileImgFormat}
            
            OptimasMax__Morpheus8BurstDeep_40Pin_Top_Angled: file(relativePath: {eq: "products/optimas_max/Morpheus8BurstDeep_40Pin_Top_Angled.png"}) {...FileImgFormat}
            OptimasMax__Morpheus8BurstDeep_Logo_2024: file(relativePath: {eq: "products/optimas_max/Morpheus8BurstDeep-Logo-2024.png"}) {...FileImgFormat}
            
            OptimasMax__LumecaPeakLightOption_Faded: file(relativePath: {eq: "products/optimas_max/Lumeca_Peak_LightOption4-Faded.png"}) {...FileImgFormat}
            OptimasMax__LumeccaPeak: file(relativePath: {eq: "products/optimas_max/LumeccaPeak_515_580.png"}) {...FileImgFormat}
            
            OptimasMax__Fusion_Light_Dark_Angled_Faded_Flipped: file(relativePath: {eq: "products/optimas_max/Fusion_Light-Dark_Angled-Faded-Flipped.png"}) {...FileImgFormat}
            OptimasMax__FusionLightFusionDarkLogo_Black: file(relativePath: {eq: "products/optimas_max/FusionLight_FusionDark_Logo-Black.png"}) {...FileImgFormat}
            
            OptimasMax__Diolaze_XL_Max_Angled_Faded_Flipped: file(relativePath: {eq: "products/optimas_max/Diolaze_XL_Max_Angled-Faded-Flipped.png"}) {...FileImgFormat}
            OptimasMax__DiolazeXLMax_Black: file(relativePath: {eq: "products/optimas_max/DiolazeXLMax_Black.png"}) {...FileImgFormat}
            
            OptimasMax__VasculazeHPSideBlack_Faded: file(relativePath: {eq: "products/optimas_max/Vasculaze_HP_Side_Black-Faded.png"}) {...FileImgFormat}
            OptimasMax__VasculazeMaxBlack: file(relativePath: {eq: "products/optimas_max/VasculazeMax_Black_0624-01.png"}) {...FileImgFormat}
            
            OptimasMax__PlusFormaAngledRight_Faded: file(relativePath: {eq: "products/optimas_max/Plus_Forma_AngledRight-Faded.png"}) {...FileImgFormat}
            OptimasMax__TechnologyLogoFormaBlack: file(relativePath: {eq: "products/optimas_max/TechnologyLogo_Forma_Black.png"}) {...FileImgFormat}
            OptimasMax__PlusLogoBlack: file(relativePath: {eq: "products/optimas_max/Plus_Logo_Black.png"}) {...FileImgFormat}
            

            OptimasMax__ScaleChrome2023: file(relativePath: {eq: "products/optimas_max/Scale-Chrome-2023.png"}) {...FileImgFormat}
            
            OptimasMax__BeforeAfter_1: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres1.jpg"}) {...FileImgFormat}
            OptimasMax__BeforeAfter_2: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres2.jpg"}) {...FileImgFormat}
            OptimasMax__BeforeAfter_3: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres3.jpg"}) {...FileImgFormat}
            OptimasMax__BeforeAfter_4: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres4.jpg"}) {...FileImgFormat}
            OptimasMax__BeforeAfter_5: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres5.jpg"}) {...FileImgFormat}
            OptimasMax__BeforeAfter_6: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres6.jpg"}) {...FileImgFormat}
            OptimasMax__BeforeAfter_7: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres7.jpg"}) {...FileImgFormat}
            OptimasMax__BeforeAfter_8: file(relativePath: {eq: "products/optimas_max/InMode - Optimas Max - Avant-Apres8.jpg"}) {...FileImgFormat}
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
    contactUsPiece2: GatsbyImage_Interface;
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
    EnvisionLumeccaIMarine: GatsbyImage_Interface;
    EnvisionLumeccaIAzuli: GatsbyImage_Interface;
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

    IgniteRFBannerLogo: GatsbyImage_Interface;
    IgniteRFLogoRight: GatsbyImage_Interface;
    IgniteRFWhatIsDisplay: GatsbyImage_Interface;
    IgniteRFQuantumRF25Back: GatsbyImage_Interface;
    IgniteRFQuantumRF25Zoom: GatsbyImage_Interface;
    IgniteRFQuantumRF25Title: GatsbyImage_Interface;
    IgniteRFQuantumRF10Back: GatsbyImage_Interface;
    IgniteRFQuantumRF10Zoom: GatsbyImage_Interface;
    IgniteRFQuantumRF10Title: GatsbyImage_Interface;
    IgniteRFBodyTiteTurboBack: GatsbyImage_Interface;
    IgniteRFBodyTiteTurboZoom: GatsbyImage_Interface;
    IgniteRFBodyTiteTitle: GatsbyImage_Interface;
    IgniteRFFaceTiteTurboBack: GatsbyImage_Interface;
    IgniteRFFaceTiteTurboZoom: GatsbyImage_Interface;
    IgniteRFFaceTiteTurboTitle: GatsbyImage_Interface;
    IgniteRFMorpheus8BurstBack: GatsbyImage_Interface;
    IgniteRFMorpheus8BurstZoom: GatsbyImage_Interface;
    IgniteRFMorpheus8BurstTitle: GatsbyImage_Interface;
    IgniteRFMorpheus8BurstDeepBack: GatsbyImage_Interface;
    IgniteRFMorpheus8BurstDeepZoom: GatsbyImage_Interface;
    IgniteRFMorpheus8BurstDeepTitle: GatsbyImage_Interface;
    
    DefineFullLogo: GatsbyImage_Interface;
    DefineCheekTitle: GatsbyImage_Interface;
    DefineChinTitle: GatsbyImage_Interface;

    DefineMorpheus8AddonTitle: GatsbyImage_Interface;
    EmpowerRFMorpheus8AddonTitle: GatsbyImage_Interface;

    BannerAddonMorpheus8: GatsbyImage_Interface;

    ProductBannerBodyTite: GatsbyImage_Interface;
    ProductBannerEvoke: GatsbyImage_Interface;
    ProductBannerEnvision: GatsbyImage_Interface;

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

    BannerIgniteRF: GatsbyImage_Interface;
};

export default ImagesProvider;