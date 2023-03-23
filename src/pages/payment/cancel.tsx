import React from 'react';
import Layout from "../../components/Layout";
import SEO from "../../components/seo";
import { graphql, useStaticQuery } from 'gatsby';

import OrderLayout from "../../components/OrderLayout";

import { useCart } from "../../components/contexts/cart-provider";
import { get_url_params } from '../../functions/url_utlis';

const PaymentCancelPage = () => {

    // TODO ajouter fallback si aucun order provided

    const [load_url] = React.useState(useStaticQuery(graphql`
        {
            site {
                siteMetadata {
                    url_order_load
                }
            }
        }
    `).site.siteMetadata.url_order_load);
    
    const [order, setOrder] = React.useState(undefined);

    const cart = useCart();

    const page_title = "Paiement annulé";

    React.useEffect(() => {
        let _test:any = get_url_params();
        if(
            (_test.vads_trans_id == undefined || _test.vads_trans_id == null)
            &&
            (_test.vads_order_id == undefined || _test.vads_order_id == null)
        ) {
            window.location.href = window.location.origin;
        }
        else {
            order_cancel(_test.vads_trans_id != undefined ? _test.vads_trans_id : _test.vads_order_id!= undefined ? _test.vads_order_id : null);
            window.history.pushState('', page_title, '/payment/cancel/');
        }
    }, []);

    const order_cancel = async(reference:string) => {
        if(!reference) {return false;}
        if(typeof reference != 'string') {return false;}
        let { status, order } = await (await fetch(load_url, {
            method: 'POST',
            headers: new Headers(),
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({reference: reference}),
        })).json();
        if(status == 'success') {
            setOrder(order);
            return true;
        }
        return false;
    }
    
    return (
        <Layout title="pay-cancel">
            <SEO title={page_title}/>
            <OrderLayout payment={"cancel"} status={page_title} order={order}/>
        </Layout>
    );
};

export default PaymentCancelPage;