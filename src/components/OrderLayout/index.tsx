import { Link } from 'gatsby';
import React from 'react';

import { useCart } from '../contexts/cart-provider';
import { InmodePanel_Order_Interface } from '../interfaces';
import LoadingGIF from '../LoadingGIF';

import './index.css';

interface OrderLayoutParams {
    status: string;
    order?: InmodePanel_Order_Interface;
};

function capitalize(string:string|null = null) {
    if(typeof string != "string") {return "";}
    else {return string.charAt(0).toLocaleUpperCase() + string.slice(1);}
}

function get_date(date:any):string {
    return `${capitalize(date["%weekday%"])} ${date["%day%"]} ${capitalize(date["%monthname%"])} ${date["%year%"]} à ${date["%hours%"]}:${date["%minutes%"]}:${date["%seconds%"]}`;
}

function status_message(status:string):string {
    return status;
}

const OrderLayout = ({ status, order }:OrderLayoutParams) => {

    const cart = useCart();

    return (
        <div className="order-layout">
            <div className="container">
                <h2>{status}</h2>
                {!order ? <LoadingGIF/> :
                <div className="order">
                    {/* reference: "geGCkk" */}
                    {/* <div className="order-id">Order {order.reference}</div> */}
                    {/* article: (3) [{…}, {…}, {…}] */}
                    {/* <div className="order-articles">
                        {order.article.map((article , key:number):any => {
                            let _art = cart.article(article.article.reference);
                            if(_art) {
                                return (
                                    <div key={key} className="order-article">
                                        <div className="article-name">{_art.Name}</div>
                                        <div className="article-price">{_art.price}</div>
                                        <div className="article-pack_size">{_art.pack_size}</div>
                                        <div className="article-quantity">{article.Quantite}</div>
                                        <div className="article-total">{_art.price * article.Quantite * (_art.discount > 0 ? _art.discount : 1)}</div>
                                    </div>
                                );
                            }
                            return null;
                        }).filter(e => e)}
                    </div> */}
                    {/* delivery_tax: 50 */}
                    {/* <div className="order-delivery"> */}
                        {/* {order.delivery_tax == 0 && "Livraison gratuite"} */}
                        {/* TODO Fonction currency(currency:number):string, ex 978 => '€' */}
                        {/* {order.delivery_tax > 0 && `Frais de livraison : ${order.delivery_tax}€`} */}
                    {/* </div> */}
                    {/* date: "2021-02-26T05:40:43.000Z" */}
                    <div className="order-date">
                        {status} le {get_date(order.date)}.
                    </div>
                    {/* billing: {id: 20, firstname: "m", lastname: "m", phone: "0667630604", mail: "test@gmail.com", …} */}
                    {/* {order.billing && <div className="order-billing">
                        <h3>Informations de facturation</h3>
                        <div className="billing-table">
                            {order.billing.firstname && <div className="billing-firstname">{order.billing.firstname}</div>}
                            {order.billing.lastname && <div className="billing-lastname">{order.billing.lastname}</div>}
                            {order.billing.society && <div className="billing-society">{order.billing.society}</div>}
                            {order.billing.address && <div className="billing-address">{order.billing.address}</div>}
                            {order.billing.country && <div className="billing-country">{order.billing.country}</div>}
                            {order.billing.zip && <div className="billing-zip">{order.billing.zip}</div>}
                            {order.billing.city && <div className="billing-city">{order.billing.city}</div>}
                            {order.billing.phone && <div className="billing-phone">{order.billing.phone}</div>}
                            {order.billing.mail && <div className="billing-mail">{order.billing.mail}</div>}
                        </div>
                    </div>} */}
                    {/* shipping: null */}
                    {/* {order.shipping && <div className="order-shipping">
                        <h3>Informations de livraison</h3>
                        <div className="shipping-table">
                            {order.shipping.firstname && <div className="shipping-firstname">{order.shipping.firstname}</div>}
                            {order.shipping.lastname && <div className="shipping-lastname">{order.shipping.lastname}</div>}
                            {order.shipping.society && <div className="shipping-society">{order.shipping.society}</div>}
                            {order.shipping.address && <div className="shipping-address">{order.shipping.address}</div>}
                            {order.shipping.country && <div className="shipping-country">{order.shipping.country}</div>}
                            {order.shipping.zip && <div className="shipping-zip">{order.shipping.zip}</div>}
                            {order.shipping.city && <div className="shipping-city">{order.shipping.city}</div>}
                            {order.shipping.phone && <div className="shipping-phone">{order.shipping.phone}</div>}
                        </div>
                    </div>} */}
                    {/* TODO Create a function to display a generic message according to the status */}
                    {/* Statut: "ACCEPTED" */}
                    {/* <div className="order-status">
                        {status_message(order.Statut)}
                    </div> */}
                </div>
                }
                <div className="payment-suggestions">
                    <Link to="/" title="Accueil">Accueil</Link>
                    <Link to="/workstation" title="Machines">Machines</Link>
                    {/* SWITCH CART */}

                    <Link to="/shop" title="Shop">Shop</Link>

                    {/* SWITCH CART END */}
                </div>
            </div>
        </div>
    );
};

export default OrderLayout;