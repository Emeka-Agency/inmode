import { navigate } from "gatsby-link";
import React from "react";
import { openModale, paymentSEPA } from "../../functions/modale";
import { useImages } from "../contexts/images-provider";

import './index.css';

const CartBasket = ({  }:CartBasket) => {

    const images = useImages();

    return (
        <div className="cart opened">
            <img
                className="cart-basket user-select-none"
                src={images.resolve_img('cartBasketIcon')}
                onClick={(e) => {
                    if(typeof window != "undefined") {
                        window.location.href = "https://fr.inmoderesources.com/account/login";
                    }
                }}
            />
        </div>
    );
};

interface CartBasket {

};

export default CartBasket;