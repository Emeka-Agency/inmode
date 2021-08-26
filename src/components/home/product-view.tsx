import React from "react";
import { Link } from "gatsby";
import ProductsContext from "../contexts/products-context";
import { useImages } from '../contexts/images-provider';

const ProductView = ({children, datas}:ProductView) => {

    const images = useImages();

    const [products] = React.useState(React.useContext(ProductsContext).products);

    if(products.length === 0 || datas.current === -1) {
        return <></>;
    }

    return (
        <div className="product-view-container">
            {children}
            <div className="product-view-img">
                <img
                    src={products[datas.current].ShopPicture.localFile.childImageSharp.fluid.srcWebp}
                    srcSet={products[datas.current].ShopPicture.localFile.childImageSharp.fluid.srcSetWebp}
                    alt='products'
                />
            </div>
            <div className="product-view-details">
                <div className="product-view-title">{products[datas.current].Name}</div>
                <div className="product-view-descr">
                    {products[datas.current].WhatIs.TitleText[0].text}
                </div>
                <div className="addons-view-cards transition custom-scrollbar">
                    {products[datas.current].Addons && products[datas.current].Addons.map((addon, key) => {
                        return (
                            <div key={key} className="addon transition">
                                <div className="addon-general transition">
                                    <div className="title">
                                        <img
                                            className="addon-title"
                                            src={addon.Banner.right_img.localFile.childImageSharp.fluid.srcWebp}
                                            srcSet={addon.Banner.right_img.localFile.childImageSharp.fluid.srcSetWebp}
                                            alt={addon.Name}
                                        />
                                    </div>
                                    <a className="addon-description custom-scrollbar" title={addon.Name}>{addon.Banner.right_text}</a>
                                    <img
                                        className="addon-picture"
                                        src={addon.Banner.left_img.localFile.childImageSharp.fluid.srcWebp}
                                        srcSet={addon.Banner.left_img.localFile.childImageSharp.fluid.srcSetWebp}
                                        alt={addon.Name}/>
                                </div>
                                <div className="addon-details transition">
                                    <div className="title">
                                        <img
                                            className="addon-title"
                                            src={addon.Banner.right_img.localFile.childImageSharp.fluid.srcWebp}
                                            srcSet={addon.Banner.right_img.localFile.childImageSharp.fluid.srcSetWebp}
                                            alt={addon.Name}
                                        />
                                    </div>
                                    <p className="description custom-scrollbar">
                                        {addon.WhatIs.TitleText[0].text}
                                    </p>
                                    <div className="purchase-infos">
                                        {/* <div className={`price ${currency}`}>{addon.price}</div> */}
                                        <Link className="details" to={addon.MenuParams.url} title={addon.Name}>
                                            Details
                                            <img
                                                className="detail-view-addon-arrow transition"
                                                src={images.getOne('arrowRightIcon').childImageSharp.fluid.srcWebp}
                                                srcSet={images.getOne('arrowRightIcon').childImageSharp.fluid.srcSetWebp}
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
                                <img src={images.getOne('plusIcon').publicURL} className="show-more" alt="add"/>
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
    };
};

export default ProductView;