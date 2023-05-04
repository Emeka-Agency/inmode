import React, { useEffect } from "react";
import { Link } from "gatsby";
import ProductsContext from "../contexts/products-context";
import { useImages } from '../contexts/images-provider';
import { __horizontal_scroll__Init } from "../../functions/horizontal-scroll";
import { resolveImg, resolveImgSet } from "../../functions/tools";

const ProductView = ({children, datas}:ProductView) => {

    const images = useImages();

    const [products] = React.useState(React.useContext(ProductsContext).products);

    if(products.length === 0 || datas.current === -1) {
        return <></>;
    }

    useEffect(() => {
        __horizontal_scroll__Init("#addons-view-cards-" + datas.index);
    }, []);

    return (
        <div className="product-view-container">
            {children}
            <div className="product-view-img">
                <img
                    src={resolveImg(products[datas.current].ShopPicture)}
                    srcSet={resolveImgSet(products[datas.current].ShopPicture)}
                    alt='product'
                />
            </div>
            <div className="product-view-details">
                <div className="product-view-title">{products[datas.current].Name}</div>
                <div className="product-view-descr">
                    {products[datas.current].WhatIs.TitleText[0].text}
                </div>
                <div className="addons-view-cards transition custom-scrollbar moz-scrollbar" id={`addons-view-cards-${datas.index}`}>
                    {products[datas.current].Addons && products[datas.current].Addons.map((addon, key) => {
                        return (
                            <div key={key} className="addon transition">
                                <div className="addon-general transition">
                                    <div className="title">
                                        <img
                                            className="addon-title"
                                            src={resolveImg(addon.Banner?.right_img)}
                                            srcSet={resolveImgSet(addon.Banner?.right_img)}
                                            alt={addon.Name}
                                        />
                                    </div>
                                    <a className="addon-description custom-scrollbar moz-scrollbar" title={addon.Name}>{addon.Banner.right_text}</a>
                                    <img
                                        className="addon-picture"
                                        src={resolveImg(addon.Banner?.left_img)}
                                        srcSet={resolveImgSet(addon.Banner?.left_img)}
                                        alt={addon.Name}/>
                                </div>
                                <div className="addon-details transition">
                                    <div className="title">
                                        <img
                                            className="addon-title"
                                            src={resolveImg(addon.Banner?.right_img)}
                                            srcSet={resolveImgSet(addon.Banner?.right_img)}
                                            alt={addon.Name}
                                        />
                                    </div>
                                    <p className="description custom-scrollbar moz-scrollbar">
                                        {addon.WhatIs.TitleText[0].text}
                                    </p>
                                    <div className="purchase-infos">
                                        {/* <div className={`price ${currency}`}>{addon.price}</div> */}
                                        <Link className="details" to={addon.MenuParams.url} title={addon.Name}>
                                            Détails
                                            <img
                                                className="detail-view-addon-arrow transition"
                                                src={images.resolve_img('arrowRightIcon')}
                                                srcSet={images.resolve_img_set('arrowRightIcon')}
                                                alt="arrow-left"
                                            />
                                        </Link>
                                        {/* TODO voir avec Kévin l'ajout au panier */}
                                        {/*     - modale avec les produits correspondants */}
                                        {/*     - redirection avec un paramètre/filtre */}
                                        {/*     -  */}
                                        {/*     -  */}
                                        {/* <div className="add-to-cart"><button>Ajouter</button></div> */}
                                    </div>
                                </div>
                                <img src={images.resolve_img('plusIcon')} className="show-more" alt="add"/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
};

interface ProductView {
    children: React.ReactNode;
    datas: {
        current: number;
        index: number;
    };
};

export default ProductView;