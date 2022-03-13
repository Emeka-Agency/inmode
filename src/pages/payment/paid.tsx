import React from 'react';
import Layout from "../../components/Layout";
import SEO from "../../components/seo";
import { graphql, useStaticQuery } from 'gatsby';

import OrderLayout from "../../components/OrderLayout";

import { useCart } from "../../components/contexts/cart-provider";
import { get_url_params } from '../../functions/url_utlis';

const PaymentPaidPage = () => {

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
    
    const [params, setParams] = React.useState({});
    const [order, setOrder] = React.useState(undefined);

    const cart = useCart();

    const page_title = "Paiement effectué";

    React.useEffect(() => {
        let _test:any = get_url_params();
        setParams(new Object({..._test}));
        if(
            (_test.vads_trans_id == undefined || _test.vads_trans_id == null)
            &&
            (_test.vads_order_id == undefined || _test.vads_order_id == null)
        ) {
            window.location.href = window.location.origin;
        }
        else {
            order_load(_test.vads_trans_id != undefined ? _test.vads_trans_id : _test.vads_order_id!= undefined ? _test.vads_order_id : null);
            window.history.pushState('', page_title, '/payment/paid/');
        }
    }, []);

    const order_load = async(reference:string) => {
        // console.log('order_load with reference : ', reference);
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
        <Layout>
            <SEO title={page_title}/>
            <OrderLayout status={page_title} order={order}/>
        </Layout>
    );
};

export default PaymentPaidPage;