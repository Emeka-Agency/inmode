import React from "react";
import { useCart } from "../contexts/cart-provider";

import './shop-product.css';
import { InmodePanel_ShopGroup_Interface, InmodePanel_Shop_Interface } from "../interfaces";

const ShopProduct2 = ({ product, special, wp_id }:ShopProduct2) => {

    if(!product) {
        return <></>;
    }

    const cart = useCart();
    const article = cart.articles[product.reference];
    
    if(!article) {
        return <></>;
    }

    // if(article.Name == "Morpheus8 Resurfacing Tip 24 pin") {
    //     article.Name = "Morpheus8 teal#Resurfacing#teal Tip 24 pin";
    // }

    // const resolve_style = (str:any):React.ReactNode|string => {
    //     let bold = str.indexOf('bold#') > -1;
    //     let italic = str.indexOf('italic#') > -1;
    //     let teal = str.indexOf('teal#') > -1;
    //     let rose = str.indexOf('rose#') > -1;
    //     let temp = null;
    //     if(bold == true) {
    //         str = <>
    //             {str.split('bold#')[0] ?? ""}
    //             <span style={{fontWeight: 'bold'}}>{str.split('bold#')[1].split('#bold')[0] ?? str}</span>
    //             {str.split('#bold')[1] ?? ""}
    //         </>;
    //     }
    //     if(italic == true) {
    //         str = <>
    //             {str.split('italic#')[0] ?? ""}
    //             <span style={{textDecoration: 'italic'}}>{str.split('italic#')[1].split('#italic')[0] ?? str}</span>
    //             {str.split('#italic')[1] ?? ""}
    //         </>;
    //     }
    //     if(teal == true) {
    //         str = <>
    //             {str.split('teal#')[0] ?? ""}
    //             <span style={{color: 'var(--teal)'}}>{str.split('teal#')[1].split('#teal')[0] ?? str}</span>
    //             {str.split('#teal')[1] ?? ""}
    //         </>;
    //     }
    //     if(rose == true) {
    //         str = <>
    //             {str.split('rose#')[0] ?? ""}
    //             <span style={{color: 'var(--rose)'}}>{str.split('rose#')[1].split('#rose')[0] ?? str}</span>
    //             {str.split('#rose')[1] ?? ""}
    //         </>;
    //     }
    //     return str;
    // }

    return (
        <div
            data-reference={product.reference}
            data-wp_id={wp_id}
            className={`shop-product2 transition${special ? ' special' : ''}`}
        >
            <div className={`reference${special ? ' special' : ''}`}>{product.reference}</div>
            <div className={`name${special ? ' special' : ''}`}>{article.Name}</div>
            {/* <div className={`name${special ? ' special' : ''}`}>{resolve_style(article.Name)}</div> */}
            <div className={`pack${special ? ' special' : ''}`}>{article.pack || ""}</div>
            {/* <div className={`pack${special ? ' special' : ''}`}>{resolve_style(article.pack || "")}</div> */}
            <div className={`manage${special ? ' special' : ''}`}>
                <div
                    className={`minus${special ? ' special' : ''}`}
                    onClick={(e) => {
                        cart.remove(product.reference, 1);
                    }}
                >
                    -
                </div>
                <div className={`quantity${special ? ' special' : ''}`}>
                    {cart.find(product.reference) ? cart.find(product.reference)?.quantity : 0}
                </div>
                <div
                    className={`add${special ? ' special' : ''}`}
                    onClick={(e) => {
                        cart.add(product.reference, 1);
                    }}
                >
                    +
                </div>
            </div>
            <div className={`price${special ? ' special' : ''}`}>
                {cart.find(product.reference) ? cart.find(product.reference)?.total() : article.price}
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
    product: InmodePanel_Shop_Interface;
    special: any;
    wp_id?: string|number;
};

export default ShopProduct2;