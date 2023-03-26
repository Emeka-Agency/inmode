import React from "react";
import { useCart } from "../contexts/cart-provider";

import './shop-product.css';

const ShopProduct2 = ({ reference, special, wp_id }:ShopProduct2) => {

    const cart = useCart();
    const article = cart.articles[reference];

    return (
        <div
            data-reference={reference}
            data-wp_id={wp_id}
            className={`shop-product2 transition${special ? ' special' : ''}`}
        >
            <div className={`reference${special ? ' special' : ''}`}>{reference}</div>
            <div className={`name${special ? ' special' : ''}`}>{article.Name}</div>
            <div className={`pack${special ? ' special' : ''}`}>{article.pack || ""}</div>
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
                    {cart.find(reference) ? cart.find(reference)?.quantity : 0}
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
                {cart.find(reference) ? cart.find(reference)?.total() : article.price}
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
                Ouvrir le panier
            </div>
        </div>
    );
};

interface ShopProduct2 {
    reference: string;
    special: any;
    wp_id?: string|number;
};

export default ShopProduct2;