import React from "react";
import PropTypes from "prop-types";
import ProductsContext from "../contexts/products-context";
import { Link } from "gatsby";
import { resolveImg, resolveImgSet } from "../../functions/tools";

const SlidesMini = ({ from = "any" }:SlidesMini_Interface) => {

    const [products] = React.useState(React.useContext(ProductsContext).products);

    return (
        <div className={`slides-mini-${from}`}>
            {products && products.map((product, key) => 
                <div className="slide" key={key}>
                    <div className="product-image">
                        <img
                            src={resolveImg(product.ShopPicture)}
                            srcSet={resolveImgSet(product.ShopPicture)}
                            alt='products'
                        />
                    </div>
                    <div className="right">
                        <div className="product-icon">
                            <img
                                src={resolveImg(product.Icon)}
                                srcSet={resolveImgSet(product.Icon)}
                                alt={product.Name}
                            />
                        </div>
                        <div className="product-name">
                            {product.Name}
                        </div>
                        <div className="slide-view-detail">
                            Product information
                            <Link className="zone-link" to={product.MenuParams.url} title={product.Name}></Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

interface SlidesMini_Interface {
    from: string;
};

export default SlidesMini;