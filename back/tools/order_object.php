<?php

$ObjectName = 'orders';

function build_order_object() {
    logEvent('build_order_object()');
    if(count(is_order()) > 0) {
        logEvent('Errors in order');
        return false;
    }
    try {
        $_order = [];
        $_order['Reference'] = isset($_POST['Reference']) ? $_POST['Reference'] : null; // EASY TO VERIFY
        
        $_order['Date'] = strftime('%Y-%m-%dT%H:%M:%S.000Z', strtotime(isset($_POST['Date']) ? $_POST['Date'] : time())); // EASY TO VERIFY
    
        $_order['Article'] = array_map(function($article) {
            return [
                'Article' => $article['Article'],
                'Quantity' => $article['Quantity'],
                'Price' => $article['Price'],
                'Name' => $article['Name'],
                'Pack' => $article['Pack'],
                'Reference' => $article['Reference'],
            ];
        }, $_POST['Article']);
    
        if(isset($_POST['Shipping']) && $_POST['Shipping'] != null)
        {
            $_order['Shipping'] = []; // MAKE A SPECIFIC FUNCTION FOR THE Livraison MODEL
            $_order['Shipping']['Firstname'] = isset($_POST['Shipping']['Firstname']) ? $_POST['Shipping']['Firstname'] : null;
            $_order['Shipping']['Lastname'] = isset($_POST['Shipping']['Lastname']) ? $_POST['Shipping']['Lastname'] : null;
            $_order['Shipping']['Society'] = isset($_POST['Shipping']['Society']) ? $_POST['Shipping']['Society'] : null;
            $_order['Shipping']['Address'] = isset($_POST['Shipping']['Address']) ? $_POST['Shipping']['Address'] : null;
            $_order['Shipping']['ZIP'] = isset($_POST['Shipping']['ZIP']) ? $_POST['Shipping']['ZIP'] : null;
            $_order['Shipping']['City'] = isset($_POST['Shipping']['City']) ? $_POST['Shipping']['City'] : null;
            $_order['Shipping']['Phone'] = isset($_POST['Shipping']['Phone']) ? $_POST['Shipping']['Phone'] : null;
            $_order['Shipping']['Mail'] = isset($_POST['Shipping']['Mail']) ? $_POST['Shipping']['Mail'] : null;
            $_order['Shipping']['Country'] = isset($_POST['Shipping']['Country']) ? $_POST['Shipping']['Country'] : null;
        }
        else {
            $_order['Shipping'] = null;
        }
        
        $_order['Paid'] = isset($_POST['Paid']) ? $_POST['Paid'] : null; // EASY TO VERIFY
    
        $_order['Status'] = isset($_POST['Status']) ? $_POST['Status'] : null; // EASY TO VERIFY
    
        $_order['Billing'] = []; // MAKE A SPECIFIC FUNCTION FOR THE Facturation MODEL
        $_order['Billing']['Firstname'] = isset($_POST['Billing']['Firstname']) ? $_POST['Billing']['Firstname'] : null;
        $_order['Billing']['Lastname'] = isset($_POST['Billing']['Lastname']) ? $_POST['Billing']['Lastname'] : null;
        $_order['Billing']['Society'] = isset($_POST['Billing']['Society']) ? $_POST['Billing']['Society'] : null;
        $_order['Billing']['Address'] = isset($_POST['Billing']['Address']) ? $_POST['Billing']['Address'] : null;
        $_order['Billing']['ZIP'] = isset($_POST['Billing']['ZIP']) ? $_POST['Billing']['ZIP'] : null;
        $_order['Billing']['City'] = isset($_POST['Billing']['City']) ? $_POST['Billing']['City'] : null;
        $_order['Billing']['Phone'] = isset($_POST['Billing']['Phone']) ? $_POST['Billing']['Phone'] : null;
        $_order['Billing']['Society'] = isset($_POST['Billing']['Society']) ? $_POST['Billing']['Society'] : null;
        $_order['Billing']['Mail'] = isset($_POST['Billing']['Mail']) ? $_POST['Billing']['Mail'] : null;
        $_order['Billing']['Country'] = isset($_POST['Billing']['Country']) ? $_POST['Billing']['Country'] : null;
    
        $_order['Firstname'] = isset($_POST['Firstname']) ? $_POST['Firstname'] : null; // EASY TO VERIFY
    
        $_order['Lastname'] = isset($_POST['Lastname']) ? $_POST['Lastname'] : null; // EASY TO VERIFY
    
        $_order['Society'] = isset($_POST['Society']) ? $_POST['Society'] : null; // EASY TO VERIFY
    
        $_order['DeliveryTax'] = isset($_POST['DeliveryTax']) ? $_POST['DeliveryTax'] : null; // EASY TO VERIFY
        
        $_order['Total'] = isset($_POST['Total']) ? $_POST['Total'] : null; // EASY TO VERIFY

        $_order['Paiement'] = isset($_POST['SEPA']) && $_POST['SEPA'] == true ? 'Virement' : 'SogeCommerce'; // EASY TO VERIFY

        $_order['Country'] = isset($_POST['Country']) ? $_POST['Country'] : null; // EASY TO VERIFY

        $_order['TVA_Intra'] = isset($_POST['TVA_Intra']) ? $_POST['TVA_Intra'] : null; // EASY TO VERIFY

        logEvent('Order object preview');
        logEvent(json_encode($_order));
        return $_order;
    }
    catch(\Exception $e) {
        // logEvent('build_order_object error');
        // logEvent(error);
        return [
            'error' => $e
        ];
    }
}

function is_order() {
    logEvent('is_order()');
    $_errors = [];
    if($_POST == null || empty($_POST)) {
        logEvent('$_POST is null or empty');
        return false;
    }
    if(gettype($_POST) != "array") {
        logEvent('$_POST is not an array');
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
    logEvent('errors : '.json_encode($_errors));
    return $_errors;
}

function is_secured() {
    logEvent('is_secured()');
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
    //     vads_card_country: "FR",
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
    //     vads_language: "fr",
    //     vads_operation_type: "DEBIT",
    //     vads_order_id: "hgcjAG",
    //     vads_page_action: "PAYMENT",
    //     vads_payment_certificate: "dd164d1f7b6f9c4667fb56dcbabb0d58e553d845",
    //     vads_payment_config: "SINGLE",
    //     vads_payment_src: "EC",
    //     vads_pays_ip: "FR",
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

/**
 * Short - 
 * 
 * Detailed - 
 * 
 * @param array $object
 * @param string $token
 * 
 * @return array
 */
function create_order_object($token) {
    logEvent('create_order_object()');
    logEvent('object.Date : '.$_POST['Date']);
    
    try {
        $_body = build_order_object();
        if($_body['error']) {
            throw $_body['error'];
        }
        return _create_object(
            $_body,
            $token,
            $GLOBALS['ObjectName'],
            'Reference',
        );
    }
    catch(\Exception $e) {
        logEvent('create_order_object error');
        logEvent(json_encode($e));
        return [
            'error' => $e,
        ];
    }
}

function update_order_object($reference, $token) {
    logEvent('update_order_object()');
    logEvent('object.Date : '.$_POST['Date']);
    try {
        $_body = build_order_object();
        if($_body['error']) {
            throw $_body['error'];
        }
        return _update_object(
            $reference,
            $_body,
            $token,
            $GLOBALS['ObjectName'],
            'Reference'
        );
    }
    catch(\Exception $e) {
        logEvent('update_order_object error');
        logEvent(json_encode($e));
        return [
            'error' => $e,
        ];
    }
}

function is_paid($status) {
    logEvent('is_paid()');
    switch($status) {
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

function update_order_payment_status($Reference, $Trans_status, $token) {
    logEvent('update_order_payment_status()');
    logEvent('Uptade status of order '.$Reference.' to '.$Trans_status);
    try {
        return _update_object(
            $Reference,
            [
                'Reference' => $Reference,
                'Statut' => $Trans_status,
                'Paid' => is_paid($Trans_status) ? true : false,
            ],
            $token,
            $GLOBALS['ObjectName'],
            'Reference'
        );
    }
    catch(\Exception $e) {
        logEvent('update_order_object error');
        logEvent(json_encode($e));
        return [
            'error' => $e,
        ];
    }
}

/*export */function load_order_object($reference, $token) {
    logEvent('load_order_object()');
    return _load_object($reference, $token, $GLOBALS['ObjectName'], 'Reference');
}

/*export */function delete_order_object($reference, $token) {
    logEvent('delete_order_object()');
    return _delete_object($reference, $token, $GLOBALS['ObjectName'], 'Reference');
}
