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

function get_day(day:number):string {
    try {
        return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day];
    }
    catch(err) {
        return 'unknown';
    }
}

function get_month(month:number):string {
    try {
        return ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][month]
    }
    catch(err) {
        return 'unknown';
    }
}

function _getDay(_date:Date) {return get_day(_date.getDay());}
function _getDate(_date:Date) {return (_date.getDate() < 10 ? `0${_date.getDate()}` : _date.getDate());}
function _getMonth(_date:Date) {return get_month(_date.getMonth());}
function _getFull_year(_date:Date) {return _date.getFullYear();}
function _getHour(_date:Date) {return (_date.getHours() < 10 ? `0${_date.getHours()}` : _date.getHours());}
function _getMinute(_date:Date) {return (_date.getMinutes() < 10 ? `0${_date.getMinutes()}` : _date.getMinutes());}
function _getSecond(_date:Date) {return (_date.getSeconds() < 10 ? `0${_date.getSeconds()}` : _date.getSeconds());}

function get_date(date:string):string {
    const _date = new Date(date);
    let _temp = "";
    _temp += _getDay(_date) + ', ';
    _temp += _getMonth(_date) + ' ';
    _temp += _getDate(_date) + ' ';
    _temp += _getFull_year(_date) + ' at ';
    _temp += _getHour(_date) + ':';
    _temp += _getMinute(_date) + ':';
    _temp += _getSecond(_date);
    return _temp;
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
                    {/* Reference: "geGCkk" */}
                    {/* <div className="order-id">Order {order.Reference}</div> */}
                    {/* Article: (3) [{…}, {…}, {…}] */}
                    {/* <div className="order-articles">
                        {order.Article.map((article , key:number):any => {
                            let _art = cart.article(article.Article.reference);
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
                    {/* DeliveryTax: 50 */}
                    {/* <div className="order-delivery"> */}
                        {/* {order.DeliveryTax == 0 && "Livraison gratuite"} */}
                        {/* TODO Fonction currency(currency:number):string, ex 978 => '€' */}
                        {/* {order.DeliveryTax > 0 && `Frais de livraison : ${order.DeliveryTax}€`} */}
                    {/* </div> */}
                    {/* Date: "2021-02-26T05:40:43.000Z" */}
                    <div className="order-date">
                        {status} on {get_date(order.Date)} UTC
                    </div>
                    {/* Billing: {id: 20, Firstname: "m", Lastname: "m", Phone: "0667630604", Mail: "test@gmail.com", …} */}
                    {/* {order.Billing && <div className="order-billing">
                        <h3>Informations de facturation</h3>
                        <div className="billing-table">
                            {order.Billing.Firstname && <div className="billing-firstname">{order.Billing.Firstname}</div>}
                            {order.Billing.Lastname && <div className="billing-lastname">{order.Billing.Lastname}</div>}
                            {order.Billing.Society && <div className="billing-society">{order.Billing.Society}</div>}
                            {order.Billing.Address && <div className="billing-address">{order.Billing.Address}</div>}
                            {order.Billing.Country && <div className="billing-country">{order.Billing.Country}</div>}
                            {order.Billing.ZIP && <div className="billing-zip">{order.Billing.ZIP}</div>}
                            {order.Billing.City && <div className="billing-city">{order.Billing.City}</div>}
                            {order.Billing.Phone && <div className="billing-phone">{order.Billing.Phone}</div>}
                            {order.Billing.Mail && <div className="billing-mail">{order.Billing.Mail}</div>}
                        </div>
                    </div>} */}
                    {/* Shipping: null */}
                    {/* {order.Shipping && <div className="order-shipping">
                        <h3>Informations de livraison</h3>
                        <div className="shipping-table">
                            {order.Shipping.Firstname && <div className="shipping-firstname">{order.Shipping.Firstname}</div>}
                            {order.Shipping.Lastname && <div className="shipping-lastname">{order.Shipping.Lastname}</div>}
                            {order.Shipping.Society && <div className="shipping-society">{order.Shipping.Society}</div>}
                            {order.Shipping.Address && <div className="shipping-address">{order.Shipping.Address}</div>}
                            {order.Shipping.Country && <div className="shipping-country">{order.Shipping.Country}</div>}
                            {order.Shipping.ZIP && <div className="shipping-zip">{order.Shipping.ZIP}</div>}
                            {order.Shipping.City && <div className="shipping-city">{order.Shipping.City}</div>}
                            {order.Shipping.Phone && <div className="shipping-phone">{order.Shipping.Phone}</div>}
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
                    <Link to="/" title="Home">Home</Link>
                    <Link to="/workstation" title="Workstations">Workstations</Link>
                    {/* SWITCH CART */}

                    <Link to="/shop" title="Shop">Shop</Link>

                    {/* SWITCH CART END */}
                </div>
            </div>
        </div>
    );
};

export default OrderLayout;