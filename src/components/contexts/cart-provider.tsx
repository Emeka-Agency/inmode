import { useStaticQuery, graphql } from 'gatsby';
import React, { ReactChild, useContext } from 'react';
import { disableMainScroll, enableMainScroll } from '../../functions/disable-scroll';
import { useWindowSize } from '../../functions/window-size';
import CartContext from './cart-context';

import { _sort_html_list, _sort_object } from '../../functions/sort';
import rand_token from '../../functions/rand_token';
import { formById, getById } from '../../functions/selectors';

import moment from 'moment';
import { filter_object } from '../../functions/filter_object';

import { create_object, create_strapi_order, load_object } from './strapi';

import '../interfaces';
import {
    Article_Interface,
    NameTable_Interface,
    Woocommerce_Shop_Interface,
    InmodePanel_Shop_Interface,
    SogecommerceOrder,
    Cart_Interface,
    Cart_FormSave_Interface
} from '../interfaces';
import { openModale, paymentProblems, paymentSEPA } from '../../functions/modale';
import { initWakeup } from '../../functions/fetch';
import { useUser } from './user-provider';
import { err_log } from '../../functions/logging';

export const useCart = ():Cart_Interface => {
    return useContext(CartContext);
}

const SECURITY_TIME = 15000;

const CartProvider = ({ requested = "", children }:{requested:string, children:ReactChild}):React.Provider<Cart_Interface> => {

    const name_table:NameTable_Interface = {
        tip: ['tip', 'tips'],
        canule: ['canule', 'canules'],
        kit: ['Kit-Mix', 'Kit-Mix'],
        pin: ['pin', 'pins'],
        unite: ['unité', 'unités']
    };

    const user = useUser();

    const [appeared, setAppeared] = React.useState(false);

    
    // allWcProducts {
    //     nodes {
    //         id
    //         wordpress_id
    //         name
    //         price
    //         tags {
    //             name
    //         }
    //         categories {
    //             name
    //         }
    //         meta_data {
    //             key
    //             value
    //         }
    //         images {
    //             localFile {
    //             childrenImageSharp {
    //                 fluid {
    //                     srcSet
    //                     srcSetWebp
    //                 }
    //             }
    //         }
    //     }
    // }

    const [articles] = React.useState(
        Object.fromEntries(
            useStaticQuery(graphql`
                {
                    allStrapiShop(sort: {order: ASC, fields: relative}) {
                        nodes {
                            strapiId
                            relative
                            reference
                            Name
                            pack_size
                            pack_type
                            price
                            discount
                            picture {
                                localFile {
                                    childImageSharp {
                                        fluid {
                                            srcWebp
                                            srcSetWebp
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `).allStrapiShop.nodes.map((article:InmodePanel_Shop_Interface) => {
                return [
                    article.reference,
                    {
                        ...article,
                        'pack_name': (function() {
                            return `${article.pack_size} ${name_table[article.pack_type][article.pack_size === 1 ? 0 : 1]}`;
                        }),
                    }];
            }),
        ),
    );

    const currencies = {
        'EUR': 978
    };

    const [payment_launch, setPaymentLaunch]:[boolean, React.Dispatch<boolean>] = React.useState(Boolean(false));

    // SWITCH TEST / PRODUCTION MODE
    const [pay_params, setPayParams] = React.useState({
        signature: "",
        actionMode: "INTERACTIVE",
        // vads_ctx_mode: "TEST",
        vads_ctx_mode: "PRODUCTION",
        currency: currencies.EUR,
        pageAction: "PAYMENT",
        siteId: "",
        transDate: "",
        transId: "",
        version: "V2",
        reference: "",
        url_success: "",
        url_cancel: "",
        url_refused: "",
        url_error: "",
        order_create: "",
        order_load: "",
        order_signature: "",
    });

    const [otherAddress, setOtherAddress]:[Boolean, React.Dispatch<Boolean>] = React.useState(new Boolean(false));
    const [formFields, setFormFields]:[Cart_FormSave_Interface, React.Dispatch<Cart_FormSave_Interface>] = React.useState(pay_params);

    const article_base = (ref:string, qnt:number):Article_Interface => {
        return {
            id: articles[ref].strapiId,
            name: articles[ref].Name,
            reference: ref,
            quantity: qnt,
            pack_size: articles[ref].pack_size,
            type: articles[ref].pack_type,
            pack_name():string {return `${qnt * this.pack_size} ${name_table[this.type][qnt * this.pack_size === 1 ? 0 : 1]}`;},
            add(qnt:number):Article_Interface {this.quantity+=qnt;return this;},
            remove(qnt:number):Article_Interface {
                let process = 0;
                this.quantity > qnt && ++process && this.add(0 - qnt);
                this.quantity <= qnt && !process && this.add(0 - this.quantity);
                return this;
            },
            is_ref(ref:string):boolean {return ref === this.reference;},
            price: articles[ref].price,
            discount: articles[ref].discount || 0,
            total():number {return this.price * this.quantity * (1 + this.discount / 100);},
            // 'delete': (function() {
            //     // console.log("HARA KIRI KIRI !")
            //     delete this;
            // })
        };
    }

    const init_shop = async(
        shop_id:string,
        urls:{success: string, cancel: string, refused: string, error: string},
        order_urls:{create: string, load:string, signature:string}
    ):Promise<void> => {
        let _temp = {
            ...pay_params,
            siteId: shop_id,
            url_success: urls.success,
            url_cancel: urls.cancel,
            url_refused: urls.refused,
            url_error: urls.error,
            order_create: order_urls.create,
            order_load: order_urls.load,
            order_signature: order_urls.signature,
        };
        await setPayParams(_temp);
    }

    const [cart, setCart] = React.useState([]);
    const [purchaseOpened, setPurchaseOpened] = React.useState(false);
    const size = useWindowSize();

    const open_purchase = ():void => {
        initWakeup("open_purchase");
        !appeared && setAppeared(true);
        setPurchaseOpened(true);
        size.width < 1200 && disableMainScroll();
    }
    const close_purchase = ():void => {
        enableMainScroll();
        setPurchaseOpened(false);
    }
    const toggle_open_purchase = ():void => {purchaseOpened ? close_purchase() : open_purchase();}

    const article_index = (ref:string):number => {
        return cart.map((item:Article_Interface, key) => {
            return item.is_ref(ref) ? key : 0;
        }).reduce((a, b) => {return a + b;});
    }

    const find_in_cart = (ref:string):Article_Interface | undefined | null => {
        if(cart && cart.length) {
            return cart.find((item:Article_Interface) => {
                if(ref === item.reference) {
                    return item;
                }
            })
        }
        return null;
    }

    const find_in_articles = (ref:string):Article_Interface | undefined | null => {
        if(!ref) {
            return null;
        }
        if(typeof ref != 'string') {
            return null;
        }
        return articles[ref] || null;
    }

    const add_article = (ref:string, qnt:number):void => {
        !appeared && setAppeared(true);
        let temp = find_in_cart(ref);
        if(temp) {
            let _cart:Cart_Interface["cart"] = new Array(...cart);
            _cart.splice(article_index(ref), 1, temp.add(qnt));
            setCart(_cart);
        }
        else {
            let _cart:Cart_Interface["cart"] = new Array(...cart);
            _cart.push(article_base(ref, qnt));
            setCart(_cart);
        }
    }

    const remove_article = (ref:string, qnt:number):void => {
        let temp = find_in_cart(ref);
        if(nb_articles() <= 1) {
            setPurchaseOpened(false);
        }
        if(temp && temp.quantity <= qnt) {
            delete_article(ref);
        }
        if(temp && temp.quantity > qnt) {
            let _cart:Cart_Interface["cart"] = new Array(...cart);
            _cart.splice(article_index(ref), 1, temp.remove(qnt))
            setCart(_cart);
        }
    }

    const delete_article = (ref:string):void => {
        if(cart.length === 1) {
            setCart([]);
        }
        else if(article_index(ref) >= 0) {
            let _cart:Cart_Interface["cart"] = new Array(...cart);
            _cart.splice(article_index(ref), 1)
            setCart(_cart);
        }
    }

    const add_paying_datas = (ref:string, qnt:number):void => {
        let temp = find_in_cart(ref);
    }

    const edit_paying_datas = (ref:string, qnt:number):void => {
        let temp = find_in_cart(ref);
    }

    const delete_paying_datas = (ref:string):void => {
        let temp = find_in_cart(ref);
    }

    const count_total = ():number => {
        return cart.map((article:Article_Interface) => {
            return article.total();
        }).reduce((a, b) => {
            return a + b;
        }, 0);
    };

    const total_DELIVER = ():string => {return count_total() === 0 ? (0).toFixed(2) : (50).toFixed(2);}
    const total_HT = ():string => {return count_total().toFixed(2);}
    const hasTVAIntra = ():boolean => {
        let i = 0;
        let _temp = getById('facture');
        const _other_address = _temp ? _temp.checked : false;
        _temp = getById('vads_cust_country');
        const _part_1_country = _temp ? _temp.value : formFields.vads_cust_country || "FR";
        _temp = getById('vads_ship_to_country');
        const _part_2_country = _temp ? _temp.value : formFields.vads_ship_to_country || "FR";
        if(_other_address == false && ["FR", "FRDT"].indexOf(_part_1_country) > -1) {
            return false;
        }
        if(_other_address == true && ["FR", "FRDT"].indexOf(_part_2_country) > -1) {
            return false;
        }
        return true;
    }
    /*PAS DE FRAIS DE LIVRAISON*/
    // const total_TVA = ():string => {return (count_total() * 0.2 * 0).toFixed(2);}
    // const total_TTC = ():string => {return ((count_total() * (hasTVA() ? 1.2 : 1)) + (pay_delivery() && false ? 50 : 0)).toFixed(2);}
    // /*FRAIS DE LIVRAISON*/
    const total_TVA = ():string => {return hasTVAIntra() ? (0).toFixed(2) : ((count_total() + (pay_delivery() ? 50 : 0)) * 0.2).toFixed(2);}
    const total_TTC = ():string => {return (count_total() + (pay_delivery() ? 50 : 0) + parseFloat(total_TVA())).toFixed(2);}
    
    /*PAS DE FRAIS DE LIVRAISON*/
    // const pay_delivery = ():boolean => {return count_total() * 1.2 < 500 && false ? true : false;}
    /*PAS FRAIS DE LIVRAISON*/
    const pay_delivery = ():boolean => {return count_total() < 500 ? true : false;}

    const payment_str = (form_fields:any) => {
        return Object.keys(form_fields).sort().map((key:string):string => {
            // console.log(`${key} : ${form_fields[key]}`);
            return form_fields[key];
        }).join('+');
    }

    const get_signature = async(str:string):Promise<{status:string, signature?:string, message?:string}> => {
        // console.log("get_signature");
        let promise:Promise<{status:string, signature?:string, message?:string}>;
        let vars:RequestInit = {
            method: "POST",
            headers: new Headers(),
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({string: str})
        };
        promise = await (await fetch(pay_params.order_signature, vars)).json().catch((err:any) => {err_log(err, "components/contexts/cart-provider.tsx:get_signature promise catch");});
        // console.log(promise);
        return promise;
    }

    const form_fields = (form:HTMLFormElement) => {
        return _sort_html_list(Array.from(form.elements), 'name', 'up').filter(e => e.name && e.id);
    }

    const security_payment_verify = (force:boolean = true) => {
        console.log("security_payment_verify");
        console.log(Date.now());
        if(payment_launch == true) {
            console.log("Payment latence");
            setPaymentLaunch(false);
            if(typeof window != undefined && window.localStorage.getItem('order') != null) {
                openModale(
                    paymentProblems({
                        order: JSON.parse(window.localStorage.getItem('order') || "")
                    })
                );
            }
            close_purchase();
            reset_form_fields();
            reset_cart();
            setOtherAddress(false);
        }
        else {
            console.log("No payment latence");
        }
    }

    const redirect_payment = async (form_fields:any, sepa:boolean = false):Promise<boolean | void> => {

        try {

            let _actual = {
                "vads_cust_last_name": getById("vads_cust_last_name")?.value || "",
                "vads_cust_first_name": getById("vads_cust_first_name")?.value || "",
                "ct_title": getById("ct_title")?.value || "",
                "ct_clinic": getById("ct_clinic")?.value || "",
                "vads_cust_legal_name": getById("vads_cust_legal_name")?.value || "",
                "vads_cust_address": getById("vads_cust_address")?.value || "",
                "vads_cust_zip": getById("vads_cust_zip")?.value || "",
                "vads_cust_city": getById("vads_cust_city")?.value || "",
                "vads_cust_country": getById("vads_cust_country")?.value || "",
                "vads_cust_cell_phone": getById("vads_cust_cell_phone")?.value || "",
                "vads_cust_email": getById("vads_cust_email")?.value || "",

                "vads_ship_to_last_name": getById("vads_ship_to_last_name")?.value || "",
                "vads_ship_to_first_name": getById("vads_ship_to_first_name")?.value || "",
                "sp_title": getById("sp_title")?.value || "",
                "sp_clinic": getById("sp_clinic")?.value || "",
                "vads_ship_to_legal_name": getById("vads_ship_to_legal_name")?.value || "",
                "vads_ship_to_street": getById("vads_ship_to_street")?.value || "",
                "vads_ship_to_zip": getById("vads_ship_to_zip")?.value || "",
                "vads_ship_to_city": getById("vads_ship_to_city")?.value || "",
                "vads_ship_to_country": getById("vads_ship_to_country")?.value || "",
                "vads_ship_to_phone_num": getById("vads_ship_to_phone_num")?.value || "",
            };
    
            updage_global_form_fields(_actual);
    
            // Vérification adresse de facturation
            // const exists_billing_address = user.findAddress(getById("cust_address")?.value || null);
    
            
            // Vérification adresse d'envoi
            // const exists_shipping_address = user.findAddress(getById("ship_address")?.value || null);
    
            setPaymentLaunch(true);
            // let timer = setTimeout(() => {
                // security_payment_verify(true);
            // }, SECURITY_TIME));
            // }, SECURITY_TIME) || null;
            // console.log(Date.now());
    
            // console.log("redirect_payment");
    
            form_fields = [...form_fields, ...Array.from(formById('pay_back_params').elements)];
    
            form_fields = _sort_html_list(form_fields);
    
            const date = moment.utc().format('YYYYMMDDHHmmss');
            
            let _temp:SogecommerceOrder = new Object({});
            form_fields.forEach((elem:Element) => {
                _temp = {..._temp, [elem.getAttribute('name')]: elem.getAttribute('value') ?? elem.value};
            });
            
            const order_id = rand_token(6);
    
            // TODO call back to check if id exists
    
            _temp["vads_action_mode"] = pay_params.actionMode;
            _temp["vads_ctx_mode"] = pay_params.vads_ctx_mode;
            _temp["vads_currency"] = pay_params.currency;
            _temp["vads_page_action"] = pay_params.pageAction;
            _temp["vads_site_id"] = pay_params.siteId;
            _temp["vads_trans_date"] = date;
            _temp["vads_trans_id"] = order_id;
            _temp["vads_version"] = pay_params.version;
            _temp["vads_order_id"] = order_id;
            _temp["vads_return_mode"] = "GET";
            // _temp['vads_return_mode'] = "POST";
            _temp["vads_url_success"] = pay_params.url_success;
            _temp["vads_url_cancel"] = pay_params.url_cancel;
            _temp["vads_url_refused"] = pay_params.url_refused;
    
            _temp = {..._temp, ..._actual};
    
            _temp = _sort_object(filter_object(_temp, (e:any) => e && e != ""));
    
            var _signature = '';
    
            if(sepa) {
                _temp['signature'] = '';
            }
            else {
                _signature = await get_signature(payment_str(_temp));
        
                // console.log(_signature);
        
                if(_signature.status == 'error' && !sepa) {
                    return false;
                }
        
                _signature = _signature.signature;
    
                _temp['signature'] = _signature ?? '';
            }
    
            
            _temp["delivery_mail"] = getById("delivery_mail")?.value || "";
            _temp["user"] = getById("order_user")?.value || null;
            _temp["cust_address"] = getById("cust_address")?.value || null;
            _temp["ship_address"] = getById("ship_address")?.value || null;
            _temp["custom"] = getById("custom")?.value || null;
    
            setPayParams({
                ...pay_params,
                signature: _signature ?? '',
                transDate: date,
                reference: order_id,
                transId: order_id,
            });
    
            let _delivery_mail:any = getById('delivery_mail');
            if(_delivery_mail) {
                _temp['delivery_mail'] = _delivery_mail.value;
            }
            let intra_tva:any = getById('intra_tva');
            if(intra_tva) {
                _temp['intra_tva'] = intra_tva.value;
            }
    
            _temp['has_fees'] = parseFloat(total_TVA());
            
            let _country:string|undefined = undefined;
            if(!formFields.vads_cust_country && !formFields.vads_ship_to_country) {
                if(otherAddress == true) {
                    let temp:HTMLSelectElement = getById('vads_ship_to_country');
                    _country = temp ? temp.value : "FR";
                }
                else {
                    let temp:HTMLSelectElement = getById('vads_cust_country');
                    _country = temp ? temp.value : "FR";
                }
            }
            else {
                if(otherAddress == true) {
                    _country = formFields.vads_ship_to_country;
                }
                else {
                    _country = formFields.vads_cust_country;
                }
            }
            if(_country == null) {
                _country = 'FR';
            }
    
            // console.log(_temp);
            // console.log(create_strapi_order(_temp, cart, parseFloat(total_TTC()), sepa, _country));
            // return false;
        }
        catch(err:any)
        {
            err_log(err, "components/contexts/cart-provider.tsx:redirect_payment first catch")
            return false;
        }

        try {

            // let { status } = await (await create_object(create_strapi_order(_temp, cart, parseFloat(total_TTC()), sepa, _country), pay_params.order_create)).json().catch((error:any) => err_log(error, "components/contexts/cart-provider.tsx:redirect_payment create_object catch"));
            // let { status } = await (await create_object(create_strapi_order(_temp, cart, parseFloat(total_TTC()), sepa, _country), pay_params.order_create)).json();
            // let result = await (await cwreate_object(create_strapi_order(_temp, cart, parseFloat(total_TTC()), sepa, _country), pay_params.order_create)).json();
            let result = await (await create_object(create_strapi_order(_temp, cart, parseFloat(total_TTC()), sepa, _country), pay_params.order_create)).json().catch((error:any) => err_log(error, "components/contexts/cart-provider.tsx:redirect_payment create_object catch"));

            console.log(result);

            // return false;

            if(typeof window != undefined) {
                window.localStorage.setItem('order', JSON.stringify(create_strapi_order(_temp, cart, parseFloat(total_TTC()), sepa, _country)));
            }

            // console.log(timer);

            // if(timer == null) {
            //     return false;
            // }

            setPaymentLaunch(false);
            console.log(Date.now());

            // console.log(result);

            if(result && result.wp_id != null && result.number != null && result.reference != null) {
                if(sepa) {
                    openModale(
                        paymentSEPA(
                            {
                                reference: order_id,
                                total: total_TTC(),
                                RIB: "FR76 3000 3015 7800 0200 1741 805",
                                BIC: "SOGEFRPP",
                            },
                        )
                    );
                }
                else {
                    fill_redirect_form('payment_form', _temp);
                    submit_form('payment_form');
                    // TODO vérifier que la redirection est bien effectuée, sinon afficher erreur et détruire form
                    // document.getElementById('payment_form').remove();
                }
                close_purchase();
                reset_form_fields();
                reset_cart();
                setOtherAddress(false);
                return true;
            }
            else {
                return false;
            }
        }
        catch(err:any) {
            // IMPORTANT - Reset formulaire et affiche message
            err_log(err, "components/contexts/cart-provider.tsx:redirect_payment second catch")
            return false;
        }
        
    }

    const fill_redirect_form = (selector:string, values:Object) => {
        // console.log("fill_redirect_form");
        if(!selector || typeof selector != 'string') {
            return false;
        }
        if(!values || typeof values != 'object') {
            return false;
        }
        let _form = formById(selector);
        _form.action = "https://sogecommerce.societegenerale.eu/vads-payment/";
        _form.method = "POST";
        _form.innerHTML = Object.keys(values).map(key => `<input hidden name="${key}" id="${key}" value="${values[key]}"/>`).join('');
        _form.innerHTML += '<input type="submit" name="payer" value="Payer"/>';
    }

    const submit_form = (selector:string) => {
        // console.log("submit_form");
        if(!selector || typeof selector != 'string') {
            return false;
        }
        if(!formById(selector)) {
            return false;
        }
        formById(selector).submit();
    }

    const reset_form_fields = ():void => {
        setFormFields(Object.fromEntries(Object.keys(formFields).map((field) => {
            return [field, undefined];
        })));
    }

    const reset_cart = ():void => {
        setCart([]);
    }

    const update_form_fields = (e:Event | any):void => {
        console.log(e);
        e instanceof Event && e.preventDefault();
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value
        });
    }

    const updage_global_form_fields = function(datas):void {
        setFormFields({
            ...formFields,
            ...datas
        });
    }

    const nb_articles = ():number => {
        if(cart.length == 0) {
            return 0;
        }
        return cart.map(article => article.quantity).reduce((sum, nbr) => sum + nbr);
    }

    const setOther = (_b:boolean):void => {
        setOtherAddress(_b);
    }

    return (
        <CartContext.Provider
            value={{
                articles: articles,
                article: find_in_articles,
                cart: cart,
                find: find_in_cart,
                add: add_article,
                remove: remove_article,
                total: count_total,
                delivery_tax: total_DELIVER,
                total_base: total_HT,
                total_tva: total_TVA,
                total_all_included: total_TTC,
                pay_delivery: pay_delivery,
                delete: delete_article,
                cart_opened: purchaseOpened,
                open_cart: open_purchase,
                close_cart: close_purchase,
                toggle_open_cart: toggle_open_purchase,
                appeared: appeared,
                redirectPay: redirect_payment,
                pay: pay_params,
                init_shop: init_shop,
                updateForm: update_form_fields,
                updateFillAddress: updage_global_form_fields,
                total_articles: nb_articles,
                formSave: formFields,
                formReset: reset_form_fields,
                cartReset: reset_cart,
                differentAddress: otherAddress,
                hasDifferentShipping: setOther,
                getTVAIntra: hasTVAIntra,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;

