import React from "react";
import PropTypes from "prop-types";
import ProductsContext from "../contexts/products-context";
import { Link } from "gatsby";
import { resolveImg, resolveImgSet } from "../../functions/tools";

const SlidesMini = ({ from = "any" }:SlidesMini_Interface) => {

    const [products] = React.useState(React.useContext(ProductsContext).products.filter(p => p.Name != "Morpheus8"));

    return (
        <div className={`slides-mini-${from}`}>
            {products && products.map((product, key) => 
                <div className="slide" key={key}>
                    <div className="product-image">
                        <img
                            src={resolveImg(product.ShopPicture)}
                            srcSet={resolveImgSet(product.ShopPicture)}
                            alt='product'
                            className="user-select-none"
                        />
                    </div>
                    <div className="right">
                        <div className="product-icon">
                            <img
                                src={resolveImg(product.Icon)}
                                srcSet={resolveImgSet(product.Icon)}
                                alt={product.Name}
                                className="user-select-none"
                            />
                        </div>
                        <div className="product-name user-select-none">
                            {product.Name}
                        </div>
                        <div className="slide-view-detail user-select-none">
                            Informations produit
                            <Link className="absolute-link" to={product.MenuParams.url} title={product.Name}></Link>
                        </div>
                    </div>
                </div>
            )}
            <Link to="/workstation" className="slides-go-workstation">Nos produits</Link>
        </div>
    );
};

interface SlidesMini_Interface {
    from: string;
};

export default SlidesMini;