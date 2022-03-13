import React from "react";
import PropTypes from "prop-types";
import ProductsContext from "../contexts/products-context";
import { Link } from "gatsby";

const SlidesMini = ({ from = "any" }:SlidesMini_Interface) => {

    const [products] = React.useState(React.useContext(ProductsContext).products);

    return (
        <div className={`slides-mini-${from}`}>
            {products && products.map((product, key) => 
                <div className="slide" key={key}>
                    <div className="product-image">
                        <img
                            src={product.ShopPicture.localFile.childImageSharp.fluid.srcWebp}
                            srcSet={product.ShopPicture.localFile.childImageSharp.fluid.srcSetWebp}
                            alt='product'
                        />
                    </div>
                    <div className="right">
                        <div className="product-icon">
                            <img
                                src={product.Icon.localFile.childImageSharp.fluid.srcWebp}
                                srcSet={product.Icon.localFile.childImageSharp.fluid.srcSetWebp}
                                alt={product.Name}
                            />
                        </div>
                        <div className="product-name">
                            {product.Name}
                        </div>
                        <div className="slide-view-detail">
                            Informations produit
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