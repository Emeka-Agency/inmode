import React from "react";
import { useCart } from "../contexts/cart-provider";

import './shop-product.css';

const ShopProduct = ({ reference, special }:ShopProduct_Interface) => {

    const cart = useCart();
    const article = cart.articles[reference];

    console.log(cart.articles);
    console.log(article);

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
            {/* <div className={`reference${special ? ' special' : ''}`}>{reference}</div>
            <div className={`name${special ? ' special' : ''}`}>{article.Name}</div>
            <div className={`pack${special ? ' special' : ''}`}>{article.pack_name()}</div>
            <div className={`manage${special ? ' special' : ''}`}>
                <div
                    className={`minus${special ? ' special' : ''}`}
                    onClick={(e) => {
                        cart.remove(reference, 1);
                    }}
                >
                    -
                </div>
                <div className={`quantity${special ? ' special' : ''}`}>
                    {cart.find(reference) ? cart.find(reference).quantity : 0}
                </div>
                <div
                    className={`add${special ? ' special' : ''}`}
                    onClick={(e) => {
                        cart.add(reference, 1);
                    }}
                >
                    +
                </div>
            </div>
            <div className={`price${special ? ' special' : ''}`}>
                {cart.find(reference) ? cart.find(reference).total() : article.price}
            </div>
            <div
                className={`purchase${special ? ' special' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    if(cart.total_articles()) {
                        cart.toggle_open_cart();
                    }
                }}
            >
                Add to cart
            </div> */}
            <div className="pack-details">
                Pack of {article.pack_name()}
            </div>
            <div className="product-icon">
                {/* <Carousel
                    id={'carousel-ba'}
                    options={flickityOptions}
                    classList={'slides-icons transition'}
                >
                    {datas && datas.map((ba, key) => {
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
                            <div key={key} className="ba-slide">
                                <img
                                    src={ba.image && ba.image.childImageSharp.fluid.srcWebp}
                                    alt={`addon-before-after-${key}`}
                                />
                                <div className="ba-doctor">{ba.doctor}</div>
                                <div className="ba-descr">{ba.text}</div>
                            </div>
                        );
                    })}
                </Carousel> */}
                {
                    _image == undefined ?
                    <></>:typeof _image == "string" ?
                    <img
                        src={'https://inmodeuk-content.emeka.fr' + _image}
                        alt={article.name}
                        className="product-icon-img"
                    />:
                    <img
                        src={_image.childImageSharp.fluid.srcWebp}
                        srcSet={_image.childImageSharp.fluid.srcSetWebp}
                        alt={article.name}
                        className="product-icon-img"
                    />
                }
                {/* <div className="back-product-icon"></div> */}
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
                {/* <div className={`manage${special ? ' special' : ''}`}>
                    <div
                        className={`minus${special ? ' special' : ''}`}
                        onClick={(e) => {
                            cart.remove(reference, 1);
                        }}
                    >
                        -
                    </div>
                    <div className={`quantity${special ? ' special' : ''}`}>
                        {cart.find(reference) ? cart.find(reference).quantity : 0}
                    </div>
                    <div
                        className={`add${special ? ' special' : ''}`}
                        onClick={(e) => {
                            cart.add(reference, 1);
                        }}
                    >
                        +
                    </div>
                </div> */}
            </div>
        </div>
    );
};

interface ShopProduct_Interface {

};

export default ShopProduct;