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
        case "FR":
        default:
            return 'France';
    }
};

function date_from_transdate(_transdate:string):string {
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
    return {
        Firstname: datas && typeof datas.Firstname == 'string' && datas.Firstname.length > 0 ? datas.Firstname : "ErrorFirstname",
        Lastname: datas && typeof datas.Lastname == 'string' && datas.Lastname.length > 0 ? datas.Lastname : "ErrorLastname",
        Phone: 
            (datas && typeof datas.Phone == 'string' && datas.Phone.length >0)
            ||
            (datas && typeof datas.Phone == 'number' && datas.Phone > 0)
            ? datas.Phone : "ErrorPhone",
        Mail: datas && typeof datas.Mail == 'string' && datas.Mail.length > 0 ? datas.Mail : "ErrorMail",
        Address: datas && typeof datas.Address == 'string' && datas.Address.length > 0 ? datas.Address : "ErrorAddress",
        Country: datas && typeof datas.Country == 'string' && datas.Country.length > 0 ? datas.Country : "ErrorCountry",
        ZIP: 
            (datas && typeof datas.ZIP == 'string' && datas.ZIP.length >0)
            ||
            (datas && typeof datas.ZIP == 'number' && datas.ZIP > 0)
            ? datas.ZIP : "ErrorZIP",
        City: datas && typeof datas.City == 'string' && datas.City.length  ? datas.City : "ErrorCity",
        Society: datas && typeof datas.Society == 'string' && datas.Society.length ? datas.Society : null
    }
}

function fill_shipping(datas:InmodePanel_Order_Shipping_Interface | undefined):InmodePanel_Order_Shipping_Interface | undefined {
    if(
        (datas && typeof datas.Firstname == 'string' && datas.Firstname.length > 0) &&
        (datas && typeof datas.Lastname == 'string' && datas.Lastname.length > 0) &&
        (
            (datas && typeof datas.Phone == 'string' && datas.Phone.length >0)
            ||
            (datas && typeof datas.Phone == 'number' && datas.Phone > 0)
        ) &&
        (datas && typeof datas.Address == 'string' && datas.Address.length > 0) &&
        (datas && typeof datas.Country == 'string' && datas.Country.length > 0) &&
        (
            (datas && typeof datas.ZIP == 'string' && datas.ZIP.length >0)
            ||
            (datas && typeof datas.ZIP == 'number' && datas.ZIP > 0)
        ) &&
        (datas && typeof datas.City == 'string' && datas.City.length )> 0
    ) {
        return datas;
    }
    return undefined;
}

function filter(datas:InmodePanel_Order_Interface):InmodePanel_Order_Interface {
    datas.Billing = fill_billing(datas.Billing);
    datas.Shipping = fill_shipping(datas.Shipping);
    return datas;
}

export function create_strapi_order(_datas:SogecommerceOrder, cart:Article_Interface[], total:number, sepa:boolean = false, country:string):InmodePanel_Order_Interface {

    console.log(_datas);

    let _temp:InmodePanel_Order_Interface = {
        Reference: _datas.vads_order_id,
        Date: date_from_transdate(_datas.vads_trans_date),
        Article: cart && cart.map((article:Article_Interface):InmodePanel_Product_BoughtArticle_Interface => {
            return {
                Article: article.id,
                Quantity: article.quantity,
                Price: article.price,
                Name: article.name,
                Pack: article.pack_name(),
                Reference: article.reference,
            }
        }),
        Billing: {
            Firstname: _datas.vads_cust_first_name,
            Lastname: _datas.vads_cust_last_name,
            Phone: _datas.vads_cust_cell_phone,
            Mail: _datas.vads_cust_email,
            Address: _datas.vads_cust_address,
            Country: _countries(_datas.vads_cust_country),
            ZIP: _datas.vads_cust_zip,
            City: _datas.vads_cust_city,
            Society: _datas.vads_cust_legal_name,
        },
        Shipping: {
            Firstname: _datas.vads_ship_to_first_name,
            Lastname: _datas.vads_ship_to_last_name,
            Phone: _datas.vads_ship_to_phone_num,
            Mail: _datas.delivery_mail,
            Address: _datas.vads_ship_to_street,
            Country: _countries(_datas.vads_ship_to_country),
            ZIP: _datas.vads_ship_to_zip,
            City: _datas.vads_ship_to_city,
            Society: _datas.vads_ship_to_legal_name,
        },
        Firstname: _datas.vads_cust_first_name,
        Lastname: _datas.vads_cust_last_name,
        Society: _datas.vads_cust_legal_name,
        DeliveryTax: _datas.vads_product_qty0 && _datas.vads_product_qty0 == 1 ? 50 : 0,
        Paid: false,
        Status: 'UNDER_VERIFICATION',
        Total: ((_datas.vads_amount ? typeof _datas.vads_amount == 'string' ? parseInt(_datas.vads_amount, 10) : _datas.vads_amount : 0)/100).toFixed(2) || total,
        SEPA: sepa ? sepa : false,
        Country: _countries(country),
        TVA_Intra: _datas.intra_tva,
    };

    return filter(_temp);
}

export async function create_object(body:InmodePanel_Order_Interface, url:string):Promise<void | Response> {
    let promise:void | Response;
    let vars:RequestInit = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        mode: 'no-cors',
        cache: 'default',
        body: JSON.stringify(body)
    };
    promise = await fetch(url, vars).catch(err => console.error(err));
    console.log(promise);
    return promise;
}

export async function load_object(reference:string, url:string):Promise<Response> {
    let promise:Promise<Response>;
    let vars:RequestInit = {
        method: "POST",
        headers: new Headers({'content-type': 'application/json'}),
        mode: 'no-cors',
        cache: 'default',
        body: JSON.stringify({reference: reference})
    };
    return await fetch(url, vars);
}