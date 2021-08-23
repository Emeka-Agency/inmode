const { filter_object } = require('./filter_object.js');
const { 
    _create_object,
    _update_object,
    _load_object,
    _delete_object
} = require('./strapi.js');

// interface Facturation {
//     Prenom: string;
//     Nom: string;
//     Telephone: string;
//     Mail: string;
//     Adresse: string;
//     Country?: string;
//     CodePostal: string;
//     Ville: string;
//     Societe?: string;
// };

// interface Livraison {
//     Prenom: string;
//     Nom: string;
//     Telephone: string;
//     Mail: string;
//     Adresse: string;
//     Country?: string;
//     CodePostal: string;
//     Ville: string;
//     Societe?: string;
// };

// interface Order {
//     Reference: string;
//     Date: number;
//     Article: {
//         Article: number[];
//         Quantity: number;
//     };
//     Facturation: Facturation;
//     Livraison: Livraison;
//     FraisLivraison: number;
//     Paye: boolean;
//     Statut: string;
//     Prenom: string;
//     Nom: string;
//     Societe: string;
//     Total: number;
//     Paiement: string;
//     Pays: string;
//     TVA_Intra: string;
// };

const ObjectName = 'orders';

function build_order_object(object) {
    // console.log('build_order_object');
    if(is_order(object).length) {
        return false;
    }
    try {
        let _order = {};
        _order.Reference = object.Reference; // EASY TO VERIFY
        
        _order.Date = new Date(object.Date).toISOString(); // EASY TO VERIFY
    
        _order.Article = object.Article.map((article) => {
            return {Article: article.Article, Quantite: article.Quantity}
        })
    
        if( object.Shipping != null)
        {
            _order.Livraison = {}; // MAKE A SPECIFIC FUNCTION FOR THE Livraison MODEL
            _order.Livraison.Prenom = object.Shipping.Firstname || null;
            _order.Livraison.Nom = object.Shipping.Lastname || null;
            _order.Livraison.Societe = object.Shipping.Society || null;
            _order.Livraison.Adresse = object.Shipping.Address || null;
            _order.Livraison.CodePostal = object.Shipping.ZIP || null;
            _order.Livraison.Ville = object.Shipping.City || null;
            _order.Livraison.Telephone = object.Shipping.Phone || null;
            _order.Livraison.Mail = object.Shipping.Mail || null;
            _order.Livraison.Pays = object.Shipping.Country || null;
        }
        else {
            _order.Shipping = null;
        }
        
        _order.Paye = object.Paid; // EASY TO VERIFY
    
        _order.Statut = object.Status; // EASY TO VERIFY
    
        _order.Facturation = {}; // MAKE A SPECIFIC FUNCTION FOR THE Facturation MODEL
        _order.Facturation.Prenom = object.Billing.Firstname || null;
        _order.Facturation.Nom = object.Billing.Lastname || null;
        _order.Facturation.Telephone = object.Billing.Phone || null;
        _order.Facturation.Adresse = object.Billing.Address || null;
        _order.Facturation.CodePostal = object.Billing.ZIP || null;
        _order.Facturation.Ville = object.Billing.City || null;
        _order.Facturation.Societe = object.Billing.Society || null;
        _order.Facturation.Mail = object.Billing.Mail || null;
        _order.Facturation.Pays = object.Billing.Country || null;
    
        _order.Prenom = object.Firstname; // EASY TO VERIFY
    
        _order.Nom = object.Lastname; // EASY TO VERIFY
    
        _order.Societe = object.Society || null; // EASY TO VERIFY
    
        _order.FraisLivraison = object.DeliveryTax; // EASY TO VERIFY
        
        _order.Total = object.Total; // EASY TO VERIFY

        _order.Paiement = object.SEPA == true ? 'Virement' : 'SogeCommerce'; // EASY TO VERIFY

        _order.Pays = object.Country; // EASY TO VERIFY

        _order.TVA_Intra = object.TVA_Intra; // EASY TO VERIFY

        // console.log(_order);
        return _order;
    }
    catch(error) {
        // console.log('build_order_object error');
        // console.log(error);
        return {
            error: error
        };
    }
}

function is_order(datas) {
    var _errors = [];
    if(!datas) {
        return false;
    }
    if(!typeof datas == "object") {
        return false;
    }
    // if(!datas.Reference {
    //     _errors.push({
    //         var: 'Reference',
    //         message: 'Reference must be provided'
    //     });
    // }
    // if(datas.Reference && typeof datas.Reference != "string") {
    //     _errors.push({
    //         var: 'Reference',
    //         message: 'Reference must be a string'
    //     });
    // }
    return _errors;
}

function manage_order_object(datas) {
    if(!datas) {
        return false;
    }
    var _errors = is_order(datas);
    if(_errors.length) {
        return _errors;
    }
    return filter_object(datas, not_is_empty);
}

function not_is_empty(elem) {
    return elem && elem != "";
}

function is_secured(datas) {
    // let a = {
    //     signature: "kyQGVluix%2BjvxwvdoxhcAbITzd4syxAS3k0dssO%2BpaQ%3D",
    //     vads_acquirer_network: "CB",
    //     vads_action_mode: "INTERACTIVE",
    //     vads_amount: "216000",
    //     vads_auth_mode: "FULL",
    //     vads_auth_number: "3fe742",
    //     vads_auth_result: "00",
    //     vads_bank_label: "Banque+de+d%C3%A9mo+et+de+l%27innovation",
    //     vads_bank_product: "F",
    //     vads_brand_management: "%7B%22userChoice%22%3Afalse%2C%22brandList%22%3A%22CB%7CVISA%22%2C%22brand%22%3A%22CB%22%7D",
    //     vads_capture_delay: "0",
    //     vads_card_brand: "CB",
    //     vads_card_country: "GB",
    //     vads_card_number: "497010XXXXXX0014",
    //     vads_contract_used: "3610709",
    //     vads_ctx_mode: "TEST",
    //     vads_currency: "978",
    //     vads_cust_address: "124+Rue+de+Crim%C3%A9e",
    //     vads_cust_cell_phone: "0667630604",
    //     vads_cust_city: "Marseille",
    //     vads_cust_email: "mael.fallet%40gmail.com",
    //     vads_cust_first_name: "Ma%C3%ABl",
    //     vads_cust_last_name: "FALLET",
    //     vads_cust_name: "Ma%C3%ABl+FALLET",
    //     vads_cust_zip: "13003",
    //     vads_effective_amount: "216000",
    //     vads_effective_creation_date: "20210226000603",
    //     vads_effective_currency: "978",
    //     vads_expiry_month: "6",
    //     vads_expiry_year: "2022",
    //     vads_extra_result: "",
    //     vads_language: "en",
    //     vads_operation_type: "DEBIT",
    //     vads_order_id: "hgcjAG",
    //     vads_page_action: "PAYMENT",
    //     vads_payment_certificate: "dd164d1f7b6f9c4667fb56dcbabb0d58e553d845",
    //     vads_payment_config: "SINGLE",
    //     vads_payment_src: "EC",
    //     vads_pays_ip: "GB",
    //     vads_presentation_date: "20210226000603",
    //     vads_result: "00",
    //     vads_sequence_number: "1",
    //     vads_site_id: "53371535",
    //     vads_threeds_auth_type: "CHALLENGE",
    //     vads_threeds_cavv: "Q2F2dkNhdnZDYXZ2Q2F2dkNhdnY%3D",
    //     vads_threeds_cavvAlgorithm: "2",
    //     vads_threeds_eci: "05",
    //     vads_threeds_enrolled: "Y",
    //     vads_threeds_error_code: "",
    //     vads_threeds_exit_status: "10",
    //     vads_threeds_sign_valid: "1",
    //     vads_threeds_status: "Y",
    //     vads_threeds_xid: "VkNkQmQyeGg4dDhnWTJZamdHQ0w%3D",
    //     vads_tid: "001",
    //     vads_trans_date: "20210226000602",
    //     vads_trans_id: "hgcjAG",
    //     vads_trans_status: "AUTHORISED",
    //     vads_trans_uuid: "00138851d48d4887b22946200b0d5756",
    //     vads_validation_mode: "0",
    //     vads_version: "V2",
    //     vads_warranty_result: "YES",
    // }
    return true;
}

/*export */const create_order_object = async function(object, token) {
    console.log(`object.Date : ${object.Date}`);
    try {
        let _body = build_order_object(object);
        if(_body.error) {
            throw _body.error;
        }
        return _create_object(
            _body,
            token,
            ObjectName,
            'Reference',
        );
    }
    catch(error) {
        console.log('create_order_object error');
        console.log(error);
        return {
            error: error,
        };
    }
}

/*export */const update_order_object = async function(reference, object, token) {
    // console.log(`object.Date : ${object.Date}`);
    try {
        let _body = build_order_object(object);
        if(_body.error) {
            throw _body.error;
        }
        return await _update_object(
            reference,
            _body,
            token,
            ObjectName,
            'Reference'
        );
    }
    catch(error) {
        console.log('update_order_object error');
        console.log(error);
        return {
            error: error,
        };
    }
}

function is_paid(status) {
    switch(status) {
        case 'ACCEPTED':
        case 'AUTHORISED':
        case 'CAPTURED':
            return true;
        case 'ABANDONED':
        case 'AUTHORISED_TO_VALIDATE':
        case 'CANCELLED':
        case 'CAPTURE_FAILED':
        case 'EXPIRED':
        case 'REFUSED':
        case 'SUSPENDED':
        case 'UNDER_VERIFICATION':
        case 'WAITING_AUTHORISATION':
        case 'WAITING_AUTHORISATION_TO_VALIDAT':
        default:
            return false;
    }
}

/*export */const update_order_payment_status = async function(Reference, Trans_status, token) {
    console.log(`Uptade status of order ${Reference} to ${Trans_status}`);
    try {
        return await _update_object(
            Reference,
            {
                Reference: Reference,
                Statut: Trans_status,
                Paye: is_paid(Trans_status) ? true : false,
            },
            token,
            ObjectName,
            'Reference'
        );
    }
    catch(error) {
        console.log('update_order_object error');
        console.log(error);
        return {
            error: error,
        };
    }
}

/*export */const load_order_object = async function(reference, token) {
    return await _load_object(reference, token, ObjectName, 'Reference');
}

/*export */const delete_order_object = async function(reference, token) {
    return await _delete_object(reference, token, ObjectName, 'Reference');
}

/*export */const order_create = {
    Reference: 'a8g9m1',
    Date: new Date('2020-01-25').toISOString(),
    Article: [
        {
            Article: 1,
            Quantity: 7,
        },
        {
            Article: 2,
            Quantity: 3,
        },
        {
            Article: 4,
            Quantity: 8,
        },
    ],
    Facturation: {
        Prenom: 'Maël',
        Nom: 'FALLET',
        Telephone: '0667630604',
        Mail: 'mael.fallet@gmail.com',
        Adresse: '124 Rue de Crimée',
        Pays: 'GB',
        CodePostal: '13003',
        Ville: 'Marseille',
        // Societe: '',
    },
    Prenom: 'Maël',
    Nom: 'FALLET',
    // Societe: '',
    // Livraison: {},
    FraisLivraison: 50,
    Paye: false,
    Statut: 'AUTHORISED',
};
/*export */const order_update = {
    Reference: 'a8g9m1',
    Date: new Date('2020-02-25').toISOString(),
    Article: [
        {
            Article: 1,
            Quantity: 7,
        },
        {
            Article: 4,
            Quantity: 2,
        },
    ],
    Facturation: {
        Prenom: 'Maël',
        Nom: 'FALLET',
        Telephone: '0667630604',
        Mail: 'mael.fallet@gmail.com',
        Adresse: '124 Rue de Crimée',
        Pays: 'GB',
        CodePostal: '13003',
        Ville: 'Marseille',
        Societe: '',
    },
    Livraison: {
        Prenom: 'Maël',
        Nom: 'FALLET',
        Telephone: '0667630604',
        Mail: 'mael.fallet@gmail.com',
        Adresse: '197 Boulevard National',
        Pays: 'GB',
        CodePostal: '13003',
        Ville: 'Marseille',
        Societe: 'Pekashem',
    },
    FraisLivraison: 0,
    Paye: true,
    Statut: 'ACCEPTED',
    Prenom: 'Maël',
    Nom: 'FALLET',
    Societe: '',
};
/*export */const order_load = "a8g9m1";
/*export */const order_delete = "a8g9m1";

module.exports.create_order_object = create_order_object;
module.exports.update_order_object = update_order_object;
module.exports.load_order_object = load_order_object;
module.exports.delete_order_object = delete_order_object;
module.exports.update_order_payment_status = update_order_payment_status;
module.exports.order_create = order_create;
module.exports.order_update = order_update;
module.exports.order_load = order_load;
module.exports.order_delete = order_delete;
module.exports.is_secured = is_secured;