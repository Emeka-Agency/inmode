import React from "react";
import { resolveImg } from "../../functions/tools";
import { InmodePanel_Base_Banner_Interface } from "../interfaces";
import { useImages } from "../contexts/images-provider";

const ProductBanner = ({ datas, name }:ProductBanner_Interface) => {

    const icon_style = {maxHeight:80,filter:"brightness(80)"};

    const images = useImages();

    const specialBandeau = (__name?:string) => {
        if(typeof __name != "string") {return <></>;}

        if(__name == "BodyTite") {
            return <img src={images.resolve_img('BannerIgniteRF2')} srcSet={images.resolve_img_set('BannerIgniteRF2')} style={{width:'90%', height: 'auto', position: 'relative', zIndex: 1, margin: '64px 5%'}} />;
        }
        if(__name == "Optimas") {
            return <img src={images.resolve_img('BannerOptimas')} srcSet={images.resolve_img_set('BannerOptimas')} style={{width:'90%', height: 'auto', position: 'relative', zIndex: 1, margin: '64px 5%'}} />;
        }

        return <></>;
    }

    const icon_height = (n?:string) => {
        if(['bodytite', 'evoke', 'envision'].indexOf((n ?? "").toLowerCase()) > -1) {
            return 64;
        }
        return 'auto';
    }

    const icon_max_height = (n?:string) => {
        if(n == 'IgniteRF') {
            return '60px';
        }
        return 'unset';
    }
    
    function missingIcon(n?:string) {
        switch(n?.toLowerCase()) {
            case "bodytite": return <img className="product-icon" src={images.resolve_img("ProductBannerBodyTite")} srcSet={images.resolve_img_set("ProductBannerBodyTite")} style={icon_style} />
            case "evoke": return <img className="product-icon" src={images.resolve_img("ProductBannerEvoke")} srcSet={images.resolve_img_set("ProductBannerEvoke")} style={icon_style} />
            case "envision": return <img className="product-icon" src={images.resolve_img("ProductBannerEnvision")} srcSet={images.resolve_img_set("ProductBannerEnvision")} style={icon_style} />
            case "igniterf": return <img className="product-icon" src={images.resolve_img("ProductBannerIgniteRFIcon")} srcSet={images.resolve_img_set("ProductBannerIgniteRFIcon")} style={{maxHeight: '80px'}} />
            default: return <></>;
        }
    }

    function __style__product_banner_mini(name:string) {
        const special = ["Envision", "IgniteRF"].indexOf(name) > -1;
        return {
            ...(special ? {boxSizing: "border-box"} : {}),
            padding: special ? "8px 16px" : '0',
            flexDirection: 'row',
            columnGap: '16px',
            alignItems: 'center'
        };
    }

    // TODO récupérer images et vidéos pour chaque produit
    return (
        <>
            <div className="product-banner transition">
                <div className="top-transition"></div>
                <div className="product-banner-media">
                    {datas?.left_video ?
                        <video
                            playsInline={true}
                            autoPlay={true}
                            loop={true}
                            muted={true}
                            // poster={datas?.left_img && datas?.left_img.localFile.childImageSharp?.fluid.srcWebp}
                            height={380}
                        >
                            <source
                                src={datas?.left_video}
                                type="video/mp4"
                            />
                            <track src="" kind="subtitles" srcLang="en" label="English"></track>
                        </video>
                        :
                    datas?.left_img ?
                        <img
                            className="product-banner-left-img"
                            src={resolveImg(datas?.left_img)}
                            alt="bodytite-logo-text"
                        />
                        :
                        null
                    }
                </div>
                <div className="product-banner-details">
                    <div style={{display:"flex",flexDirection:"row",columnGap:"12px",flexWrap:"nowrap",alignItems:"center"}}>
                        {missingIcon(name)}
                        <img
                            className="product-banner-logo"
                            src={resolveImg(datas?.right_img)}
                            alt="bodytite-logo-text"
                            style={{height:icon_height(name),maxHeight:icon_max_height(name),position:'relative',top:name?.toLowerCase() == 'bodytite'?-4:0}}
                        />
                    </div>
                    <div className="product-banner-short-descr">
                        {datas?.right_text}
                    </div>
                </div>
                <div className="product-banner-mini" style={__style__product_banner_mini(name ?? "")}>
                    {missingIcon(["Envision", "IgniteRF"].indexOf(name ?? "") > -1 ? name : "")}
                    <img
                        src={resolveImg(datas?.mini)}
                        alt="product-banner-mini"
                    />
                </div>
                <div className="product-banner-mask"></div>
            </div>
            {specialBandeau(name)}
        </>
    );
};

interface ProductBanner_Interface {
    datas: InmodePanel_Base_Banner_Interface;
    name?: string;
};

export default ProductBanner;