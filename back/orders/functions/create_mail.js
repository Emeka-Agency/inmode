const {
    _load_object,
} = require('./order_object.js');
const { _request } = require('./fetch.js');

// SWITCH LOCALHOST
const PHP_back = 'https://inmodemd.fr/back/app.php';
// const PHP_back = 'http://localhost/inmode/back/app.php';

const usedValues = [
    'Reference',
    'Date',
    'Article',
    'Livraison',
    'Paye',
    'Statut',
    'Facturation',
    'Prenom',
    'Nom',
    'Societe',
    'FraisLivraison',
    'Total',
    'Paiement',
    'Pays',
    'TVA_Intra',
];

function mailBody(_datas = null, _receiver = null, _type = null) {
    console.log('//////////////////');
    console.log('mailBody');
    // console.log(_datas);
    console.log(_receiver);
    console.log(_type);
    console.log('//////////////////');
    if(_datas == null || _receiver == null) {
        console.log('Cas 1');
        return null;
    }
    if(typeof _receiver != 'string' || typeof _type != 'string') {
        console.log('Cas 2');
        return null;
    }
    if(typeof _datas != "object" || Array.isArray(_datas)) {
        console.log('Cas 3');
        return null;
    }
    let _body = {};
    let _order = {};
    usedValues.forEach((key) => {
        if(_datas[key] != undefined) {
            // console.log(`_datas[${key}] : ${_datas[key]}`);
            _order[key] = _datas[key];
        }
    })
    _body.order = _order;
    try {
        _body.email = _datas['Facturation']['Mail'];
    }
    catch (err) {
        console.log('Cas 4');
        return null;
    }
    _body.action = 'order-mail';
    _body.for = _receiver;
    _body.type = _type;
    console.log('$$$$$//////////////////$$$$$');
    console.log('mailBody body');
    console.log(_body);
    console.log('$$$$$//////////////////$$$$$');
    return _body;
}

async function MailPayment(order = null, _payment = null) {
    console.log('//////////////////');
    console.log('MailPayment');
    console.log(order);
    console.log(_payment);
    console.log('//////////////////');
    if (order == null || typeof order != "object" || Array.isArray(order)) {
        console.log('MailPayment null 1');
        return false;
    }
    if(_payment == null) {
        console.log('MailPayment null 2');
        return false;
    }
    let _body_client = mailBody(order, 'client', _payment);
    if(_body_client == null) {
        console.log('MailPayment null 3');
        return null;
    }
    let res_client =  await _request('POST', null, PHP_back, _body_client, false, {});
    if(res_client == null || res_client == false || res_client == undefined) {
        _request('POST', null, PHP_back, {'action': 'fail-mail', 'type': 'order', 'for': 'client', 'reference': order.Reference}, false);
    }
    /////////////////////////////////
    let _body_pro = mailBody(order, 'pro', _payment);
    if(_body_pro == null) {
        console.log('MailPayment null 4');
        return null;
    }
    let res_pro =  await _request('POST', null, PHP_back, _body_pro, false, {});
    if(res_pro == null || res_pro == false || res_pro == undefined) {
        _request('POST', null, PHP_back, {'action': 'fail-mail', 'type': 'order', 'for': 'pro', 'reference': order.Reference}, false);
    }
    return true;
}

// async function MailSEPAPayment(order = null) {
//     if (order == null || typeof order != "object" || Array.isArray(order)) {
//         return false;
//     }
//     let _body_client = mailBody(order, 'client', 'sepa');
//     if(_body_client == null) {
//         return null;
//     }
//     let res_client =  _request('POST', null, PHP_back, _body_client, false, {});
//     if(res_client == null || res_client == false || res_client == undefined) {
//         _request('POST', null, PHP_back, {'action': 'fail-mail', 'type': 'order', 'for': 'client', 'reference': order.Reference}, false);
//     }
//     /////////////////////////////////
//     let _body_pro = mailBody(order, 'pro', 'sepa');
//     if(_body_pro == null) {
//         return null;
//     }
//     let res_pro =  _request('POST', null, PHP_back, _body_pro, false, {});
//     if(res_pro == null || res_pro == false || res_pro == undefined) {
//         _request('POST', null, PHP_back, {'action': 'fail-mail', 'type': 'order', 'for': 'pro', 'reference': order.Reference}, false);
//     }
// }
// async function MailSOGEPayment(order = null) {
//     if (order == null || typeof order != "object" || Array.isArray(order)) {
//         return false;
//     }
//     let _body_client = mailBody(order, 'client', 'soge');
//     if(_body_client == null) {
//         return null;
//     }
//     let res_client =  _request('POST', null, PHP_back, _body_client, false, {});
//     if(res_client == null || res_client == false || res_client == undefined) {
//         _request('POST', null, PHP_back, {'action': 'fail-mail', 'type': 'order', 'for': 'client', 'reference': order.Reference}, false);
//     }
//     /////////////////////////////////
//     let _body_pro = mailBody(order, 'pro', 'soge');
//     if(_body_pro == null) {
//         return null;
//     }
//     let res_pro =  _request('POST', null, PHP_back, _body_pro, false, {});
//     if(res_pro == null || res_pro == false || res_pro == undefined) {
//         _request('POST', null, PHP_back, {'action': 'fail-mail', 'type': 'order', 'for': 'pro', 'reference': order.Reference}, false);
//     }
// }

module.exports.MailPayment = MailPayment;
// module.exports.MailSEPAPayment = MailSEPAPayment;
// module.exports.MailSOGEPayment = MailSOGEPayment;