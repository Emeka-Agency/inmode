import {
    Article_Interface,
    InmodePanel_Order_Interface,
    SogecommerceOrder,
    InmodePanel_Order_Shipping_Interface,
    InmodePanel_Order_Billing_Interface,
    InmodePanel_Product_BoughtArticle_Interface
} from "../interfaces";

const _countries = (_country:string | undefined | null):string => {
    if(_country == undefined || _country == null) {
        return "FR";
    }
    switch(_country) {
        case "BE":
            return 'Belgique';
        case "LU":
            return 'Luxembourg';
        case "FRDT":
            return 'DOM/TOM';
        case "FR":
        default:
            return 'France';
    }
};

function date_from_transdate(_transdate:string):string {
    // console.log("date_from_transdate");
    let str_date:string = "";
    str_date += _transdate.substring(0, 4) + '-';
    str_date += _transdate.substring(4, 6) + '-';
    str_date += _transdate.substring(6, 8) + ' ';
    str_date += _transdate.substring(8, 10) + ':';
    str_date += _transdate.substring(10, 12) + ':';
    str_date += _transdate.substring(12, 14);
    return str_date;
}

function fill_billing(datas:InmodePanel_Order_Billing_Interface):InmodePanel_Order_Billing_Interface {
    // console.log("fill_billing");
    return {
        firstname: datas && typeof datas.firstname == 'string' && datas.firstname.length > 0 ? datas.firstname : "ErrorFirstname",
        lastname: datas && typeof datas.lastname == 'string' && datas.lastname.length > 0 ? datas.lastname : "ErrorLastname",
        phone: 
            (datas && typeof datas.phone == 'string' && datas.phone.length >0)
            ||
            (datas && typeof datas.phone == 'number' && datas.phone > 0)
            ? datas.phone : "ErrorPhone",
        mail: datas && typeof datas.mail == 'string' && datas.mail.length > 0 ? datas.mail : "ErrorMail",
        address: datas && typeof datas.address == 'string' && datas.address.length > 0 ? datas.address : "ErrorAddress",
        country: datas && typeof datas.country == 'string' && datas.country.length > 0 ? datas.country : "ErrorCountry",
        zip: 
            (datas && typeof datas.zip == 'string' && datas.zip.length >0)
            ||
            (datas && typeof datas.zip == 'number' && datas.zip > 0)
            ? datas.zip : "ErrorZIP",
        city: datas && typeof datas.city == 'string' && datas.city.length  ? datas.city : "ErrorCity",
        society: datas && typeof datas.society == 'string' && datas.society.length ? datas.society : undefined,
        retriever: datas && typeof datas.retriever == 'string' && datas.retriever.length ? datas.retriever : undefined,
    }
}

function fill_shipping(datas:InmodePanel_Order_Shipping_Interface | undefined):InmodePanel_Order_Shipping_Interface | undefined {
    // console.log("fill_shipping");
    if(
        (datas && typeof datas.firstname == 'string' && datas.firstname.length > 0) &&
        (datas && typeof datas.lastname == 'string' && datas.lastname.length > 0) &&
        (
            (datas && typeof datas.phone == 'string' && datas.phone.length >0)
            ||
            (datas && typeof datas.phone == 'number' && datas.phone > 0)
        ) &&
        (datas && typeof datas.address == 'string' && datas.address.length > 0) &&
        (datas && typeof datas.country == 'string' && datas.country.length > 0) &&
        (
            (datas && typeof datas.zip == 'string' && datas.zip.length >0)
            ||
            (datas && typeof datas.zip == 'number' && datas.zip > 0)
        ) &&
        (datas && typeof datas.city == 'string' && datas.city.length )> 0
    ) {
        return datas;
    }
    return undefined;
}

function filter(datas:InmodePanel_Order_Interface):InmodePanel_Order_Interface {
    // console.log("filter");
    datas.billing = fill_billing(datas.billing);
    datas.shipping = fill_shipping(datas.shipping);
    return datas;
}

export function create_strapi_order(_datas:SogecommerceOrder, cart:Article_Interface[], total:number, sepa:boolean = false, country:string):InmodePanel_Order_Interface {
    // console.log("create_strapi_order");

    // console.log(_datas);

    let _temp:InmodePanel_Order_Interface = {
        reference: _datas.vads_order_id,
        date: date_from_transdate(_datas.vads_trans_date),
        articles: cart && cart.map((article:Article_Interface):InmodePanel_Product_BoughtArticle_Interface => {
            return {
                wp_id: document?.querySelector(`[data-reference="${article.reference}"]`)?.getAttribute('data-wp_id'),
                article: article.id,
                quantity: article.quantity,
                price: article.price,
                name: article.name,
                pack: article.pack_name(),
                reference: article.reference,
            }
        }),
        billing: {
            firstname: _datas.vads_cust_first_name,
            lastname: _datas.vads_cust_last_name,
            phone: _datas.vads_cust_cell_phone,
            mail: _datas.vads_cust_email,
            address: _datas.vads_cust_address,
            country: _countries(_datas.vads_cust_country),
            zip: _datas.vads_cust_zip,
            city: _datas.vads_cust_city,
            society: _datas.vads_cust_legal_name,
            retriever: _datas.cust_address,
        },
        shipping: {
            firstname: _datas.vads_ship_to_first_name,
            lastname: _datas.vads_ship_to_last_name,
            phone: _datas.vads_ship_to_phone_num,
            mail: _datas.delivery_mail,
            address: _datas.vads_ship_to_street,
            country: _countries(_datas.vads_ship_to_country),
            zip: _datas.vads_ship_to_zip,
            city: _datas.vads_ship_to_city,
            society: _datas.vads_ship_to_legal_name,
            retriever: _datas.ship_address,
        },
        firstname: _datas.vads_cust_first_name,
        lastname: _datas.vads_cust_last_name,
        society: _datas.vads_cust_legal_name,
        delivery_tax: _datas.vads_product_qty0 && _datas.vads_product_qty0 == 1 ? 50 : 0,
        paid: false,
        status: 'UNDER_VERIFICATION',
        total: document.getElementById("vads_amount") instanceof Element ? document.getElementById("vads_amount")?.getAttribute('value') / 100 : ((_datas.vads_amount ? typeof _datas.vads_amount == 'string' ? parseFloat(_datas.vads_amount) : _datas.vads_amount : 0)/100).toFixed(2) || total,
        sepa: sepa ? sepa : false,
        country: _countries(country),
        tva_intra: _datas.intra_tva ?? false,
        has_fees: _datas.has_fees,
        custom: _datas.custom,
        user: _datas.user,
    };

    return filter(_temp);
}

export async function create_object(body:InmodePanel_Order_Interface, url:string):Promise<void | Response> {
    // console.log("create_object");
    let promise:void | Response;
    let headers = new Headers();
    // console.log(headers.get('content-type'));
    let vars:RequestInit = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(body)
    };
    promise = await fetch(url, vars).catch(err => console.error(err));
    // console.log(promise);
    return promise;
}

export async function load_object(reference:string, url:string):Promise<Response> {
    // console.log("load_object");
    let promise:Promise<Response>;
    let headers = new Headers();
    // console.log(headers.get('content-type'));
    let vars:RequestInit = {
        method: "POST",
        headers: headers,
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify({reference: reference})
    };
    return await fetch(url, vars);
}