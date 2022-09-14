import { err_log } from "./logging";

function initTests() {
    console.log("initTests");

    // testSignature();
    // testContactUs();
    // testFullContact();
    // testOrder();
}

function testSignature() {
    console.log("testSignature");

    if(typeof window == "undefined" && typeof fetch == "undefined") {
        return false;
    }

    let str = "INTERACTIVE+70000+PRODUCTION+978+197 Boulevard National+0667630604+Marseille+FR+mael.fallet@gmail.com+Maël+FALLET+Emeka+13003+2+qtHoEq+PAYMENT+SINGLE+25000+5000+0+24 Pin Fractora tip+Ceintures de fixation Evolve+tva+1+9+1+AG602426A+AS608019A+TVA+GET+Marseille+BE+maël+FALLET+0667630604+197 Boulevard National+13003+53371535+20211125172259+qtHoEq+http://inmode.emeka.fr/back/payment/cancel+http://inmode.emeka.fr/back/payment/refused+http://inmode.emeka.fr/back/payment/paid+V2";
    let href = "https://inmode.emeka.fr/back/api/orders/order-signature";
    
    testPromise(href, {string: str});
}

function testContactUs() {
    console.log("testContactUs");

    if(typeof window == "undefined" && typeof fetch == "undefined") {
        return false;
    }

    let datas = {
        "lastname": "FALLET",
        "firstname": "Maël",
        "subject": "gynecologist",
        "mail": "mael.fallet@gmail.com",
        "phone": "0667630604",
        "zip": "13003",
        "city": "Marseille",
        "message": "Formulaire mini",
        "": "",
        "action": "contact-us"
    };
    let href = "https://inmode.emeka.fr/back/api/mails";

    testPromise(href, datas);
}

function testFullContact() {
    console.log("testFullContact");

    if(typeof window == "undefined" && typeof fetch == "undefined") {
        return false;
    }

    let datas = {
        "lastname": "FALLET",
        "firstname": "Maël",
        "company": "Emeka",
        "subject": "dermatologist",
        "mail": "mael.fallet@gmail.com",
        "phone_number": "0667630604",
        "address": "124 Rue de Crimée",
        "zip": "13003",
        "city": "Marseille",
        "country": "France",
        "message": "Test full-contact true/false",
        "morpheus8": false,
        "accutite": false,
        "bodyfx": false,
        "bodytite": false,
        "diolazexl": false,
        "embracerf": false,
        "evoke": false,
        "evolve": true,
        "forma": true,
        "fractora": false,
        "lumecca": true,
        "plus": false,
        "triton": false,
        "votiva": false,
        "policy": true,
        "": "",
        "action": "full-contact"
    };
    let href = "https://inmode.emeka.fr/back/api/mails";

    testPromise(href, datas);
}

function testOrder() {
    console.log("testOrder");

    if(typeof window == "undefined" && typeof fetch == "undefined") {
        return false;
    }

}

function testPromise(href, datas) {
    console.log("testPromise");

    if(typeof href !="string" || typeof datas != "object") {
        return false;
    }

    let vars = {
        method: "POST",
        headers: new Headers({
         'content-type': 'application/json',
         'Accept': 'application/json',
        }),
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(datas)
    };

    let promise = fetch(href, vars);
    promise
    .then((response) => {
        let retour = null;
        try {
            retour = response.json();
        }
        catch(err_json:any) {
            err_log(err_json, "functions/test.ts:testPromise catch promise.json() error");
            try {
                retour = response.text();
            }
            catch(err_text:any) {
                    err_log(err_text, "functions/test.ts:testPromise catch promise.text() error");
                try {
                    retour = response.blob();
                }
                catch(err_blob:any) {
                    err_log(err_blob, "functions/test.ts:testPromise catch promise.blob() error");
                    retour = "No way to get back the promise";
                }
            }
        }
        console.log(retour);
        return retour;
    })
    .then((datas) => {
        console.log(datas);
    })
    .catch((error:any) => {
        err_log(error, "functions/test.ts:testPromise main catch");
    });

    return true;
}