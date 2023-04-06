import React from "react";
import { _log } from "../../functions/logger";
import { useCart } from "../contexts/cart-provider";

import './shop-product.css';
import { resolveImg, resolveImgSet } from "../../functions/tools";

const ShopProduct = ({ reference, special }:ShopProduct_Interface) => {

    const cart = useCart();
    const article = cart.articles[reference];

    _log(cart.articles);
    _log(article);

    let _image = undefined;
    if(Array.isArray(cart.articles[article.reference].pictures)) {
        _image = cart.articles[article.reference].pictures[0];
        if(_image.formats && _image.formats.thumbnail) {
            _image = _image.formats.thumbnail;
        }
        else {
            _image = _image.url || undefined;
        }
    }

    return (
        <div className={`shop-product2 transition${special ? ' special' : ''}`}>
            <div className="pack-details">
                Pack of {article.pack_name()}
            </div>
            <div className="product-icon">
                {
                    _image == undefined ?
                    <></>:typeof _image == "string" ?
                    <img
                        src={'https://inmodeuk-content.emeka.fr' + _image}
                        alt={article.name}
                        className="product-icon-img"
                    />:
                    <img
                        src={resolveImg(_image.localFile)}
                        srcSet={resolveImgSet(_image.localFile)}
                        alt={article.name}
                        className="product-icon-img"
                    />
                }
            </div>
            <div className="production-name">
                {article.Name}
            </div>
            <div className="product-description">
                {article.description}
            </div>
            <div className="product-total">
                {cart.find(reference) ? cart.find(reference).total() : article.price}
            </div>
            <div className="product-reference">
                SKU: {reference}
            </div>
            <div className="product-cart-manage">
                <div
                    className={`purchase${special ? ' special' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        if(cart.total_articles()) {
                            cart.toggle_open_cart();
                        }
                        else {
                            cart.add(reference, 1)
                            cart.toggle_open_cart();
                        }
                    }}
                >
                    Add to cart {cart.find(reference) ? `(${cart.find(reference).quantity})` : ''}
                </div>
            </div>
        </div>
    );
};

interface ShopProduct_Interface {
    reference: string;
    special: string;
};

export default ShopProduct;