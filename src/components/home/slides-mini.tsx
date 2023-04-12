import React from "react";
import PropTypes from "prop-types";
import ProductsContext from "../contexts/products-context";
import { Link } from "gatsby";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import { useImages } from "../contexts/images-provider";

const SlidesMini = ({ from = "any" }:SlidesMini_Interface) => {

    const [products] = React.useState(React.useContext(ProductsContext).products);

    const icons = {
        "BodyTite": 'bodytite_midnight',
        "Optimas": 'optimas_midnight',
        "EvolveX": 'evolve_midnight',
        "Evoke": 'evoke_midnight',
        "Contoura": 'contoura_midnight',
        "Empower RF": 'empowerrf_dusty_rose',
    }

    const images = useImages();

    return (
        <div className={`slides-mini-${from}`}>
            <h2 className="title">Our products</h2>
            <h3 className="subtitle">Aesthetic treatments for the face, body, skin and women's health and well-being.</h3>
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
                                src={images.resolve_img(icons[product.Name])}
                                srcSet={images.resolve_img_set(icons[product.Name])}
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