import React from "react";
import { useCart } from "../contexts/cart-provider";
import { useImages } from "../contexts/images-provider";

import './index.css';

const CartBasket = ({  }:CartBasket) => {

    const images = useImages();

    const cart = useCart();

    return (
        <div className="cart opened">
            <img
                className="cart-basket"
                src={images.getOne('cartBasketIcon').publicURL}
                onClick={(e) => {
                    if(cart.total_articles()) {
                        cart.toggle_open_cart();
                    }
                }}
            />
            <div hidden={cart.total_articles() ? false : true} className="cart-basket-nbr">
                <span>{cart.total_articles()}</span>
            </div>
        </div>
    );
};

interface CartBasket {

};

export default CartBasket;