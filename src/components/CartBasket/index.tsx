import { navigate } from "gatsby-link";
import React from "react";
import { openModale, paymentSEPA } from "../../functions/modale";
import { useCart } from "../contexts/cart-provider";
import { useImages } from "../contexts/images-provider";

import './index.css';

const CartBasket = ({  }:CartBasket) => {

    const images = useImages();

    const cart = useCart();

    return (
        <div className="cart opened">
            <img
                className="cart-basket user-select-none"
                src={images.resolve_img('cartBasketIcon')}
                onClick={(e) => {
                    if(cart.total_articles()) {
                        cart.toggle_open_cart();
                    }
                    else {
                        navigate('/shop');
                    }
                }}
            />
            <div hidden={cart.total_articles() ? false : true} className="cart-basket-nbr">
                {cart.total_articles()}
            </div>
        </div>
    );
};

interface CartBasket {

};

export default CartBasket;