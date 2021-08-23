import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { useCart } from "../contexts/cart-provider";
import {
    BackAmountField,
    BackCtxModeField,
    BackPaymentConfigField,
    NbProductsField,
    ProductAmountField,
    ProductLabelField,
    ProductQtyField,
    ProductRefField
} from "../PaymentFields";

const PayParams = ({  }:PayParams) => {

    const cart = useCart();

    const [shop_datas] = React.useState(useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    shop_id
                    url_success
                    url_cancel
                    url_refused
                    url_error
                    url_order_create
                    url_order_load
                    url_order_signature
                }
            }
        }
    `).site.siteMetadata);

    React.useEffect(() => {
        cart.init_shop(shop_datas.shop_id, {
            success: shop_datas.url_success,
            cancel: shop_datas.url_cancel,
            refused: shop_datas.url_refused,
            error: shop_datas.url_error,
        },
        {
            create: shop_datas.url_order_create,
            load: shop_datas.url_order_load,
            signature: shop_datas.url_order_signature,
        });
    }, []);

    return (
        <>
            <form id="pay_back_params">
                <BackPaymentConfigField/>
                <BackAmountField value={cart.total_all_included()}/>
                <BackCtxModeField/>
                <NbProductsField value={cart.cart.length}/>
                <div id="payment_articles">
                    {/* DELIVERY TAX */}
                    {/*PAS DE FRAIS DE LIVRAISON*/}
                    {/* {false && cart.pay_delivery() && <input hidden id="vads_product_amount0" name="vads_product_amount0" value="1000"/>} */}
                    {/* {false && cart.pay_delivery() && <input hidden id="vads_product_label0" name="vads_product_label0" value="livraison"/>} */}
                    {/* {false && cart.pay_delivery() && <input hidden id="vads_product_qty0" name="vads_product_qty0" value="1"/>} */}
                    {/* {false && cart.pay_delivery() && <input hidden id="vads_product_ref0" name="vads_product_ref0" value="DELIVERY_TAX"/>} */}
                    {/*FRAIS DE LIVRAISON*/}
                    {cart.pay_delivery() && <input hidden id="vads_product_amount0" name="vads_product_amount0" value="5000"/>}
                    {cart.pay_delivery() && <input hidden id="vads_product_label0" name="vads_product_label0" value="livraison"/>}
                    {cart.pay_delivery() && <input hidden id="vads_product_qty0" name="vads_product_qty0" value="1"/>}
                    {cart.pay_delivery() && <input hidden id="vads_product_ref0" name="vads_product_ref0" value="DELIVERY_TAX"/>}
                    
                    {/* TVA */}
                    <input hidden id="vads_product_amount9999" name="vads_product_amount9999" value={Math.ceil(parseInt(cart.total_tva(), 10) * 100)}/>
                    <input hidden id="vads_product_label9999" name="vads_product_label9999" value="tva"/>
                    <input hidden id="vads_product_qty9999" name="vads_product_qty9999" value="1"/>
                    <input hidden id="vads_product_ref9999" name="vads_product_ref9999" value="TVA"/>
                    {cart.cart.length ? cart.cart.map((article, key) => {
                        return (
                            <div id={`${article.reference}-pay_params`} key={key}>
                                <ProductLabelField index={article.id} value={article.name}/>
                                <ProductAmountField index={article.id} value={Math.ceil(article.price * 100)}/>
                                <ProductRefField index={article.id} value={article.reference}/>
                                <ProductQtyField index={article.id} value={article.quantity}/>
                            </div>
                        );
                    }).filter(elem => elem) : ''}
                </div>
            </form>
            <form id="payment_form"></form>
        </>
    );
};

interface PayParams {

};

export default PayParams;