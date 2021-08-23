// npm install express --save && npm install body-parser --save && npm install strapi --save && npm install axios --save && npm install cors --save

require("dotenv").config({
    path: `.env.${process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"}`,
    // path: `.env`,
});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const strapi = require('strapi');
const fs = require('fs');
const axios = require('axios');
const cors = require('cors');
const { create_test_object,test_create,update_test_object,test_update,load_test_object,test_load,delete_test_object,test_delete} = require('./functions/test_object.js');
const { 
    create_order_object,
    order_create,
    update_order_object,
    update_order_payment_status,
    order_update,
    load_order_object,
    order_load,
    delete_order_object,
    order_delete,
    is_secured
} = require('./functions/order_object.js');

const { 
    create_clinic_object
} = require('./functions/clinic_object.js');
const { clinics } = require('./datas.js');

const {
    MailSEPAPayment,
    MailSOGEPayment,
    MailPayment,
} = require('./functions/create_mail.js');

const hmacSHA256 = require('crypto-js/hmac-sha256');
const hmacMd5 = require('crypto-js/hmac-md5');
const Base64 = require('crypto-js/enc-base64');

// MAILER CONFIGURATION

async function InstagramPosts(insta_id = "1317505554") {
    // var myHeaders = new Headers();
    // myHeaders.append('Allow-Origin', '*');
    // const fetch_get = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     mode: 'no-cors',
    //     cache: 'default'
    // };
    // 1317505554
    // return axios.get(
    //     `https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${insta_id}","first":4,"after":null}`
    // )
    // .then((response) => {
    //     const photos = [];
    //     try {
    //         console.log(response.data);
    //         let _current;
    //         response.data.user.edge_owner_to_timeline_media.edges.forEach((edge) => {
    //             if (edge.node && edge.node.thumbnail_resources.length > 0) {
    //                 _current = edge.node.thumbnail_resources.pop();
    //                 _current != undefined && photos.push(_current.src);
    //             }
    //         });
    //         console.log(photos);
    //         return photos.filter(e => e);
    //     }
    //     catch(err) {
    //         console.log(err);
    //         return [];
    //     }
    // }).catch((err) => {
    //     console.log(`\nCould not fetch instagram posts. Error status ${err}`);
    //     return null;
    // });
}

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
    }
});

const { auth } = require('./middleware/auth.js');
const { send } = require('process');

// const create_test_object = require('./functions/test_object.ts');
// const test_create = require('./functions/test_object.ts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.headers.host}${req.url}`);
    next();
});

//////////////////////////////

// DESIGNED TO KEEP SOGE PAYMENTS DURING THEIR PAYMENT
let awaiting_mails = {};

function keep_mail(_type = null, _reference = null, _datas = null) {
    console.log('keep_mail');
    if(_type == null || _reference == null || _datas == null) {
        console.log('There are missing values to keep datas in safety during the payment process. The mail gonna be sent.');
        return false;
    }
    if(typeof _type != 'string' || typeof _reference != 'string' || (typeof _datas != 'object' || Array.isArray(_datas))) {
        console.log('Values types restrictions are not fullfiled. Datas can\'t be safely kept durung the payment process. The mail gonna be sent.');
        return false;
    }
    awaiting_mails[_reference] = {
        type: _type,
        datas: _datas,
    };
    return true;
}

function pursue_mail(_reference = null, _status = null) {
    console.log('pursue_mail');
    if(_reference == null) {
        console.log('The order reference \'_reference\' was not provided');
        return false;
    }
    if(_status == null) {
        console.log('The order status \'_status\' was not provided');
        return false;
    }
    if(typeof _reference != 'string') {
        console.log('The order reference \'_reference\' was not the correct type');
        return false;
    }
    if(typeof _status != 'string') {
        console.log('The order status \'_status\' was not the correct type');
        return false;
    }
    if(send_mail(awaiting_mails[_reference].type, {...awaiting_mails[_reference].datas, Statut: _status})) {
        console.log(`Mail for order '${_reference}' was sended with its new payment status`);
        return delete awaiting_mails[_reference];
    }
    console.log(`An error happened during the mail pursue protocol for the order referenced as '${_reference}'`);
    return false;
}

// TODO vars d'erreur
function send_mail(type = null, datas = null) {
    if(type == null || typeof type != "string") {
        return false;
    }
    
    if(datas == null || typeof datas != "object" || Array.isArray(datas)) {
        return false;
    }
    
    /* let mailOptions = {
        from: process.env.MAILER_USER,
        to: datas.to,
        subject: "",
        // text: "", // for only text content
        html: "",
    }; */
    
    switch(type) {
        case "sepa":
        case "soge":
            // mailOptions.subject = "Votre commande Inmode";
            // mailOptions.html = MailSOGEPayment(datas.order);
            return MailPayment(datas, type);
        default:
            return false;
    }
    
    /* transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            return false;
        }
        else {
            return true;
        }
    }); */
}

async function get_strapi_jwt() {
    try {
        const { data } = await axios.post(`${process.env.STRAPI_URL}/auth/local`, {
            identifier: process.env.STRAPI_ID,
            password: process.env.STRAPI_PASS,
        })
        .catch((err) => {
            throw err;
        });
        return data.jwt;
    }
    catch(err) {
        console.log(err);
        return err;
    }
}

//////////////////////////////

// app.get('/back/orders/insta', async (req, res) => {
//     return await InstagramPosts();
// });

app.get('/back/orders/', (req, res) => {
    res.status(200).send("It works !");
});

app.get('/back/orders/jwt'/*, auth*/, async (req, res) => {

    const jwt = await get_strapi_jwt();

    res.status(200).send(jwt);
});

app.get('/back/orders/test/create'/*, auth*/, async (req, res) => {
    ////const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _post = await create_test_object(test_create, token);
    if(!_post) {
        res.status(400).send('create did not work');
        return false;
    }
    if(_post.data == undefined || _post.data.length == 0) {
        res.status(400).send('create.data is empty');
        return false;
    }
    res.status(200).send('create worked');
    return false;
});
app.get('/back/orders/test/update'/*, auth*/, async (req, res) => {
    //const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _update = await update_test_object(test_update.reference, test_update, token);
    if(!_update) {
        res.status(400).send('update did not work');
        return false;
    }
    if(_update.data == undefined || _update.data.length == 0) {
        res.status(400).send('update.data is empty');
        return false;
    }
    res.status(200).send('update worked');
    return false;
});
app.get('/back/orders/test/load'/*, auth*/, async (req, res) => {
    //const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _get = await load_test_object(test_load, token);
    if(!_get) {
        res.status(400).send('load did not work');
        return false;
    }
    if(_get.data == undefined || _get.data.length == 0) {
        res.status(400).send('load.data is empty');
        return false;
    }
    res.status(200).send('load worked');
    return false;
});
app.get('/back/orders/test/delete'/*, auth*/, async (req, res) => {
    //const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _delete = await delete_test_object(test_delete, token);
    if(!_delete) {
        res.status(400).send('delete did not work');
        return false;
    }
    if(_delete.data == undefined || _delete.data.length == 0) {
        res.status(400).send('delete.data is empty');
        return false;
    }
    res.status(200).send('delete worked');
    return false;
});

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

app.get('/back/orders/test/order-create'/*, auth*/, async (req, res) => {
    //const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _post = await create_order_object(order_create, token);
    if(!_post) {
        res.status(400).send('create did not work');
        return false;
    }
    if(_post.data == undefined || _post.data.length == 0) {
        res.status(400).send('create.data is empty');
        return false;
    }
    res.status(200).send('create worked');
    return false;
});
app.get('/back/orders/test/order-update'/*, auth*/, async (req, res) => {
    //const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _update = await update_order_object(order_update.OrderId, order_update, token);
    if(!_update) {
        res.status(400).send('update did not work');
        return false;
    }
    if(_update.data == undefined || _update.data.length == 0) {
        res.status(400).send('update.data is empty');
        return false;
    }
    res.status(200).send('update worked');
    return false;
});
app.get('/back/orders/test/order-load'/*, auth*/, async (req, res) => {
    ////const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _get = await load_order_object(order_load, token);
    if(!_get) {
        res.status(400).send('load did not work');
        return false;
    }
    if(_get.data == undefined || _get.data.length == 0) {
        res.status(400).send('load.data is empty');
        return false;
    }
    res.status(200).send('load worked');
    return false;
});
app.get('/back/orders/test/order-delete'/*, auth*/, async (req, res) => {
    //const token = process.env.BEARER;
    const token = await get_strapi_jwt();
    const _delete = await delete_order_object(order_delete, token);
    if(!_delete) {
        res.status(400).send('delete did not work');
        return false;
    }
    if(_delete.data == undefined || _delete.data.length == 0) {
        res.status(400).send('delete.data is empty');
        return false;
    }
    res.status(200).send('delete worked');
    return false;
});

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

app.post('/back/orders/order-create'/*, auth*/, async (req, res) => {
    console.log('/back/orders/order-create');
    if(!req.body || req.body.length == 0) {
        res.sendStatus(400).send('Form empty');
    }
    try {
        //const token = process.env.BEARER;
        const token = await get_strapi_jwt();
        try {
            const _post = await create_order_object(req.body, token);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // console.log(_post);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // if(_post.error != undefined) {
            //     throw _post.error;
            // }
            if(!_post) {
                res.status(400).send('create did not work');
                return false;
            }
            else if(_post.data == undefined || _post.data.length == 0) {
                res.status(400).send('create.data is empty');
                return false;
            }
            else {
                if(req.body.SEPA && _post.data) {
                    // TODO mail order
                    // DONE mail order
                    send_mail('sepa' , _post.data);
                }
                else if(_post.data) {
                    // TODO mail order
                    // DONE mail order
                    if(!keep_mail('soge', _post.data.Reference, _post.data)) {
                        send_mail('soge' , _post.data);
                    }
                }
                res.status(200).send({
                    status: 'success',
                    order: _post.data,
                });
            }
            return false;
        }
        catch(error) {
            console.log('/order-create error');
            console.log(error);
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: 'Error during order create',
                error: error,
            }));
        }
    }
    catch(error) {
        console.log('/order-create jwt token error');
        // console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            message: 'Error during jwt fetch',
            error: error,
        }));
    }
});
app.post('/back/orders/order-payment-update'/*, auth*/, async (req, res) => {
    console.log('/back/orders/order-payment-update');
    if(!req.body || req.body.length == 0) {
        res.sendStatus(400).send('Form empty');
    }
    if(!is_secured(req.body)) {
        res.status(400).send();
    }
    try {
        //const token = process.env.BEARER;
        const token = await get_strapi_jwt();
        try {
            const _post = await update_order_payment_status(req.body.vads_order_id, req.body.vads_trans_status, token);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // console.log(_post);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // if(_post.error != undefined) {
            //     throw _post.error;
            // }
            if(!_post) {
                res.status(400).send('update payment status did not work');
                return false;
            }
            if(_post.data == undefined || _post.data.length == 0) {
                res.status(400).send('update_payment.data is empty');
                return false;
            }
            console.log(`Checking if order '${req.body.vads_order_id}' has awainting mails`);
            try {
                console.log(Object.keys(awaiting_mails));
                if(awaiting_mails[req.body.vads_order_id] != undefined) {
                    console.log('Order ' + req.body.vads_order_id + ' got awaiting mails');
                    pursue_mail(req.body.vads_order_id, req.body.vads_trans_status);
                }
                else {
                    console.log('There had not any awaiting mail for order ' + req.body.vads_order_id);
                }
            }
            catch(error) {
                console.log(`An error happened during mail pursuing for order '${req.body.vads_order_id}'`);
                console.log(error);
            }
            res.status(200).send({
                status: 'success',
                order: _post.data,
            });
            return true;
        }
        catch(error) {
            console.log('/order-payment-update error');
            // console.log(error);
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: 'Error during order payment update',
                error: error,
            }));
        }
    }
    catch(error) {
        console.log('/order-payment-update jwt token error');
        // console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            message: 'Error during jwt fetch',
            error: error,
        }));
    }
});
app.post('/back/orders/order-update'/*, auth*/, async (req, res) => {
    console.log('/back/orders/order-update');
    if(!req.body || req.body.length == 0) {
        console.log('Form empty. Error 400');
        res.sendStatus(400).send('Form empty');
    }
    if(!is_secured(req.body)) {
        res.status(400).send();
    }
    try {
        //const token = process.env.BEARER;
        const token = await get_strapi_jwt();
        try {
            const _update = await update_order_object(req.body.OrderId, req.body, token);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // console.log(_update);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // if(_update.error != undefined) {
            //     throw _update.error;
            // }
            if(!_update) {
                console.log('Update did not work');
                res.status(500).send('update did not work');
                return false;
            }
            if(_update.data == undefined || _update.data.length == 0) {
                res.status(500).send('update.data is empty');
                return false;
            }
            // res.status(200).send({
            //     'status': 'success',
            //     order: _update.data,
            // });
            res.status(200).send();
            return false;
        }
        catch(error) {
            console.log('/order-update error');
            // console.log(error);
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: 'Error during order update',
                error: error,
            }));
        }
    }
    catch(error) {
        console.log('/order-update jwt token error');
        // console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            message: 'Error during jwt fetch',
            error: error,
        }));
    }
});
app.post('/back/orders/order-load'/*, auth*/, async (req, res) => {
    console.log('/back/orders/order-load');
    if(!req.body || req.body.length == 0) {
        res.sendStatus(400).send('Form empty');
    }
    try {
        //const token = process.env.BEARER;
        const token = await get_strapi_jwt();
        try {
            const _get = await load_order_object(req.body.reference, token);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // console.log(_get);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // if(_get.error != undefined) {
            //     throw _get.error;
            // }
            if(!_get) {
                res.status(400).send('load did not work');
                return false;
            }
            if(_get.data == undefined || _get.data.length == 0) {
                res.status(400).send('load.data is empty');
                return false;
            }
            res.status(200).send(JSON.stringify({
                status: 'success',
                order: _get.data[0]
            }));
            return false;
        }
        catch(error) {
            console.log('/order-load error');
            // console.log(error);
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: 'Error during order load',
                error: error,
            }));
        }
    }
    catch(error) {
        console.log('/order-load jwt token error');
        // console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            message: 'Error during jwt fetch',
            error: error,
        }));
    }
});
app.post('/back/orders/order-delete'/*, auth*/, async (req, res) => {
    console.log('/back/orders/order-delete');
    if(!req.body || req.body.length == 0) {
        res.sendStatus(400).send('Form empty');
    }
    try {
        //const token = process.env.BEARER;
        const token = await get_strapi_jwt();
        try {
            const _delete = await delete_order_object(req.body.reference, token);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // console.log(_delete);
            // console.log('///////////////////////');
            // console.log('///////////////////////');
            // if(_delete.error != undefined) {
            //     throw _delete.error;
            // }
            if(!_delete) {
                res.status(400).send('delete did not work');
                return false;
            }
            if(_delete.data == undefined || _delete.data.length == 0) {
                res.status(400).send('delete.data is empty');
                return false;
            }
            res.status(200).send(JSON.stringify({
                'status': 'success',
                reference: re.body.reference
            }));
            return false;
        }
        catch(error) {
            console.log('/order-delete error');
            // console.log(error);
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: 'Error during order delete',
                error: error,
            }));
        }
    }
    catch(error) {
        console.log('/order-delete jwt token error');
        // console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            message: 'Error during jwt fetch',
            error: error,
        }));
    }
});
app.post('/back/orders/order-signature'/*, auth*/, async (req, res) => {
    console.log('/back/orders/order-signature');
    // console.log(JSON.stringify(req.body));
    console.log('req.body', req.body);
    console.log('req.body.string', req.body.string);
    try {
        console.log('try');
        console.log(`BO_KEY : ${process.env.BO_KEY}`);
        const signature = Base64.stringify(hmacSHA256(req.body.string + `+${process.env.BO_KEY}`, process.env.BO_KEY));
        console.log(`signature : ${signature}`);
        res.status(200).send(JSON.stringify({'signature': signature}));
    }
    catch(error) {
        console.log('catch');
        console.log(`signature : `);
        res.status(400).send(JSON.stringify({'signature': ''}));
    }
})

app.get('/fill/clinics', async (req, res) => {
    console.log('/fill/clinics');
    try {
        //const token = process.env.BEARER;
        const token = await get_strapi_jwt();
        try {
            let error = false;
            clinics.forEach(async (clinic) => {
                // console.log(clinic.Clinic);
                const _post = await create_clinic_object(clinic.Clinic, token);
                // if(!_post && error == false) {
                    // error = true;
                // }
            })
            if(error == false) {
                res.status(400).send('create did not work');
                return false;
            }
            else {
                res.status(200).send({
                    status: 'success',
                    order: _post.data,
                });
            }
            return false;
        }
        catch(error) {
            console.log('/fill/clinics');
            // console.log(error);
            res.status(500).send(JSON.stringify({
                status: 'error',
                message: 'Error during clinic create',
                error: error,
            }));
        }
    }
    catch(error) {
        console.log('/fill/clinics jwt token error');
        // console.log(error);
        res.status(500).send(JSON.stringify({
            status: 'error',
            message: 'Error during jwt fetch',
            error: error,
        }));
    }
})

//////////////////////////////

http.listen(3000, () => {
    console.log('listening on *:3000');
    console.log(`Environment : ${process.env.NODE_ENV}`);
    // console.log(`BO_KEY : ${process.env.BO_KEY}`);
    console.log(`BACK_URL : ${process.env.STRAPI_URL}`);
    // console.log(`STRAPI_ID : ${process.env.STRAPI_ID}`);
    // console.log(`STRAPI_PASS : ${process.env.STRAPI_PASS}`);
    // console.log(`BEARER : ${process.env.BEARER}`);
    // console.log(`MAILER_USER : ${process.env.MAILER_USER}`);
    // console.log(`MAILER_PASS : ${process.env.MAILER_PASS}`);
});