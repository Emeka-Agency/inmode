import { _error, _log, _slog } from "../../functions/logger";
import { err_log } from "../../functions/logging";
import { selectOne } from "../../functions/selectors";

export const send_form_mini = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>) {
    // console.log("send_form_mini");
    e.preventDefault();
    try {

        let _temp:any = selectOne('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', true);
        _temp = selectOne('#mini-contact-gif');
        if(_temp) {_temp.style.display = 'inline-block';}
        let _form = document.forms.namedItem('contact-mini');
        let body:any = {
            "lastname": document?.querySelector('#contact-mini [name="lastname"]')?.value,
            "firstname": document?.querySelector('#contact-mini [name="firstname"]')?.value,
            "subject": document?.querySelector('#contact-mini [name="subject"]')?.value,
            "mail": document?.querySelector('#contact-mini [name="mail"]')?.value,
            "phone_number": document?.querySelector('#contact-mini [name="phone"]')?.value,
            "zip": document?.querySelector('#contact-mini [name="zip"]')?.value,
            "city": document?.querySelector('#contact-mini [name="city"]')?.value,
            "message": document?.querySelector('#contact-mini [name="message"]')?.value,
        };
        body.type = "contact-us";

        _slog("send_form_mini ", "background: #222; color: #bada55; font-size: 20px; font-weight: bold; padding: 5px;")

        _log(body);
        _log([
            `${process.env.PARDOT_POINT?.replace('#date#', get_now_time())}`,
            translate_fields_names(to_get_line(body, "contact"))
        ].join('?'));

        const request_init:RequestInit = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.AIRTABLE_KEY}`,
                "content-type": "application/json"
            },
            mode: 'cors',
            cache: 'default',
            "body": JSON.stringify({
                "records": [
                    {
                        "fields": body
                    }
                ]
            }),
        };
        _temp = selectOne("#contact-mini .req-return.success");
        if(_temp) {_temp.innerHTML = "";}
        _temp = selectOne("#contact-mini .req-return.error");
        if(_temp) {_temp.innerHTML = "";}
        let response = await (
            await fetch(
                `${process.env.AIRTABLE_MAILS}`,
                // `https://localhost:8000/api/mails`,
                request_init
            )
            .then((promise) => {
                // console.log(promise);
                return handlePromise(promise);
            })
            // .then(res => res.text())
            .then((response) => {
                _log(response);
                let _temp:any = selectOne('#mini-contact-gif');
                if(_temp) {_temp.style.display = 'none';}
                if(response.records || (response.status === 'success' && response.type === 'client')) {
                    _temp = selectOne('#contact-mini .submit');
                    _temp.removeAttribute('disabled');
                    _temp = selectOne('#contact-mini .req-return.success');
                    if(_temp) {_temp.innerHTML = response.message ?? "Le mail a été envoyé avec succès";}
                    let _form = document.forms.namedItem('contact-mini');
                    _form && _form.reset();
                }
                if(response.status === 'fail' && response.type === 'client') {
                    setSubmitText(response.message);
                    _temp = selectOne('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = selectOne('#contact-mini .req-return.success');
                    if(_temp) {_temp.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;}
                }
                if(response.status === 'fail' && response.type === 'server') {
                    _temp = selectOne('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = selectOne('#contact-mini .req-return.error');
                    if(_temp) {_temp.innerHTML = response.message;}
                }
            })
            .catch(function(error) {
                let _temp:any = selectOne('#mini-contact-gif');
                if(_temp) {_temp.style.display = 'none';}
                setSubmitText("Erreur d'envoi");
                _temp = selectOne('#contact-mini .submit');
                _temp && _temp.setAttribute('disabled', "true");
                _temp = selectOne('#contact-mini .req-return.success');
                if(_temp) {
                    _temp.style.setProperty('white-space', 'normal');
                    _temp.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
                }
            })
        );
        // console.log(response);
        // ).json()

        return click_pardot(body);
    }
    catch(err:any) {
        err_log(err, "components/contact.ts:send_form_mini main catch");
        let _temp = selectOne('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', "true");
        _temp = selectOne('#contact-mini .req-return.error');
        if(_temp) {_temp.innerHTML = "Erreur d'envoi du message.";}
        return false;
    }
}

export const send_form_large = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>, on_success:Function|null = null, on_error:Function|null = null) {
    // console.log("send_form_large");
    e.preventDefault();
    try {
        let _temp1:HTMLElement|null = document.querySelector('#full-contact-form .req-return.success');
        if(_temp1) _temp1.innerHTML = "";
        let _temp2:HTMLElement|null = document.querySelector('#full-contact-form .req-return.error');
        if(_temp2) _temp2.innerHTML = "";
        let _temp3:HTMLInputElement|null = document.querySelector('#full-contact-form .submit');
        if(_temp3) _temp3.disabled = true;
        if(document.forms.namedItem("full-contact-form") == null) {
            return false;
        }
        let _form:HTMLFormElement|null = document.forms.namedItem("full-contact-form");
        let body:any = {
            "lastname": _form?.querySelector('#lastname')?.value,
            "firstname": _form?.querySelector('#firstname')?.value,
            "company": _form?.querySelector('#company')?.value,
            "subject": _form?.querySelector('#subject')?.value,
            "mail": _form?.querySelector('#mail')?.value,
            "phone_number": _form?.querySelector('#phone_number')?.value,
            "address": _form?.querySelector('#address')?.value,
            "zip": _form?.querySelector('#zip')?.value,
            "city": _form?.querySelector('#city')?.value,
            "country": _form?.querySelector('select[name="country"]')?.value,
            "message": _form?.querySelector('#contact-message')?.value,
            "machines": Array.from(_form?.querySelectorAll('.tech-list input[type="checkbox"]')).map(el => el.checked ? el.name : null).filter(el => el),
            "type": "full-contact"
        };

        _slog("send_form_large ", "background: #222; color: #bada55; font-size: 20px; font-weight: bold; padding: 5px;")

        _log(body);
        _log([
            `${process.env.PARDOT_POINT?.replace('#date#', get_now_time())}`,
            translate_fields_names(to_get_line(body, "contact"))
        ].join('?'));

        const request_init:RequestInit = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.AIRTABLE_KEY}`,
                "content-type": "application/json"
            },
            mode: 'cors',
            cache: 'default',
            "body": JSON.stringify({
                "records": [
                    {
                        "fields": body
                    }
                ]
            }),
        };
        let response = await (
            await fetch(
                `${process.env.AIRTABLE_MAILS}`,
                // `https://localhost:8000/api/mails`,
                request_init,
            )
            .then((promise) => {
                // console.log(promise);
                return handlePromise(promise);
            })
            // .then(res => res.text())
            .then((response) => {
                _log(response);
                if(response.status === 'success' && response.type === 'client') {
                    let _temp = document.querySelector('#event-signup .submit');
                    _temp && _temp.removeAttribute('disabled');
                    _temp = document.querySelector('#event-signup .req-return.success');
                    if(_temp) _temp.innerHTML = response.message;
                    let _form:HTMLFormElement | null = document.forms.namedItem('event-signup')
                    _form && _form.reset();
                }
                if(response.status === 'fail' && response.type === 'client') {
                    setSubmitText(response.message);
                    let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
                    if(_temp1) _temp1.disabled = true;
                    let _temp2:HTMLElement | null = document.querySelector('#event-signup .req-return.success');
                    if(_temp2) _temp2.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
                }
                if(response.status === 'fail' && response.type === 'server') {
                    let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
                    if(_temp1) _temp1.disabled = true;
                    let _temp2 = document.querySelector('#event-signup .req-return.error');
                    if(_temp2) _temp2.innerHTML = response.message;
                }
            })
            .catch(function(error) {
                let _temp;
                setSubmitText("Erreur d'envoi");
                let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
                if(_temp1) _temp1.disabled = true;
                let _temp2:HTMLElement | null = document.querySelector('#event-signup .req-return.success');
                if(_temp2) {
                    _temp2.style.setProperty('white-space', 'normal');
                    _temp2.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
                }
            })
        );
        // console.log(response);
        // ).json()
        
        return click_pardot(body);
    }
    catch(err:any) {
        // setSubmitText(error.message);
        on_error instanceof Function && on_error("error");
        err_log(err, "components/contact.ts:send_form_large main catch");
        let _temp1:HTMLInputElement|null = document.querySelector('#full-contact-form .submit');
        if(_temp1) _temp1.disabled = true;
        let _temp2:HTMLElement|null = document.querySelector('#full-contact-form .req-return.error');
        if(_temp2) _temp2.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
        // if(_temp2) _temp2.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
        return false;
    }
}

function handlePromise(promise:Response) {
    // console.log("handlePromise");
    let retour = null;
    try {
        // console.log("Try json()");
        retour = promise.json();
    }
    catch(err_json:any) {
        err_log(err_json, "components/contact.ts:handlePromise catch promise.json() error");
        _log(err_json);
        try {
            // console.log("Try text()");
            retour = promise.text();
        }
        catch(err_text:any) {
            err_log(err_text, "components/contact.ts:handlePromise catch promise.text() error");
            _log(err_text);
            try {
                // console.log("Try blob()");
                retour = promise.blob();
            }
            catch(err_blob:any) {
                err_log(err_blob, "components/contact.ts:handlePromise catch promise.blob() error");
                _log(err_blob);
                retour = null;
            }
        }
    }
    return retour;
}

function click_pardot(body) {
    try {
        let a:HTMLLinkElement = Object.assign(document.createElement('a'), {
            id: 'send-mail',
            target: '_self',
            href: [
                `${process.env.PARDOT_POINT?.replace('#date#', get_now_time())}`,
                translate_fields_names(to_get_line(body, "contact"))
            ].join('?'),
        }).click();
        a.click();
        a.remove();
        return true;
    }
    catch(err) {
        _log(err);
        return false;
    }
}

function get_now_time() {
    return "2023-02-02";
    return `${new Date(Date.now()).getUTCFullYear()}-${new Date(Date.now()).getUTCMonth() + 1 < 10 ? "0" : ""}${new Date(Date.now()).getUTCMonth() + 1}-${new Date(Date.now()).getUTCDate() + 1 < 10 ? "0" : ""}${new Date(Date.now()).getUTCDate() + 1}`;
}

const fields = {
    contact: [
        "mail",
        "firstname",
        "lastname",
        "phone_number",
        "subject",
        "country",
        "zip",
        "message",
        "address",
        "machines",
        "company"
    ],
    signup_event: [

    ]
};

function to_get_line(_body = {}, _type:string|null = null) {
    if(_body instanceof Object && typeof _type == "string" && _type in fields) {
        return Object.keys(_body).map((key) => {
            if(key == "machines" && fields[_type].indexOf(key) > -1) {
                return `machines=${_body[key].map((val) => {
                    return front_to_pardot_machines(val) ?? '';
                }).join(';')}`;
            }
            else {
                return fields[_type].indexOf(key) > -1 ? `${key}=${encodeURI(_body[key] ?? '')}` : null
            }
        }).filter(val => val).join('&')
    }
    return "";
}

// ACTUAL - morpheus8
// ACTUAL - accutite
// ACTUAL - bodyfx
// ACTUAL - bodytite
// ACTUAL - diolazexl
// ACTUAL - embracerf
// ACTUAL - evoke
// ACTUAL - evolve
// ACTUAL - forma
// ACTUAL - fractora
// ACTUAL - lumecca
// ACTUAL - plus
// ACTUAL - triton
// ACTUAL - votiva
// MISSING - contoura
// MISSING - facetite
// MISSING - morpheuspro
// MISSING - evolvex
// MISSING - empowerrf
// MISSING - transformx

function front_to_pardot_machines(val?:string) {
    switch(val) {
        case "morpheus8": return "Morpheus8 | Facial and Body Fractional Remodeling";
        case "accutite": return "AccuTite | Precision Contouring";
        case "bodyfx": return "BodyFX & MiniFX | Non-Invasive Body Treatment";
        case "bodytite": return "BodyTite | Minimally Invasive Procedure";
        case "diolazexl": return "DiolazeXL | Hair Removal";
        case "embracerf": return "EmbraceRF | Facial Refinement";
        case "evoke": return "Evoke | Hands-Free Facial Remodeling";
        case "evolve": return "Evolve | Hands-Free Skin and Body Remodeling";
        case "forma": return "Forma | Skin Remodeling";
        case "fractora": return "Fractora | Fractional Resurfacing";
        case "lumecca": return "Lumecca | Pigment & Vascular";
        case "plus": return "Plus | Skin Remodeling For Larger Areas";
        case "triton": return "Triton | DuoLight/DuoDark | Hair Removal";
        case "votiva": return "Votiva | Aviva | Feminine Wellness";
        
        case "contoura": return "Contoura";
        case "facetite": return "FaceTite | Minimally Invasive Procedure";
        case "morpheuspro": return "MorpheusPro";
        case "evolvex": return "EvolveX | Hands-Free Skin and Body Remodeling";
        case "empowerrf": return "EmpowerRF | Aviva | Feminine Wellness";
        case "transformx": return "TransformX";
        default: return val;
    }
}

function translate_fields_names(_string:string|null = null) {
    if(typeof _string != "string") {return _string;}
    try {
        _string = _string.replace("lastname=", "your-lname=");
        _string = _string.replace("firstname=", "your-fname=");
        _string = _string.replace("subject=", "your-specialty=");
        _string = _string.replace("mail=", "your-email=");
        _string = _string.replace("phone_number=", "your-phone=");
        _string = _string.replace("zip=", "your-zip=");
        _string = _string.replace("message=", "your-message=");
        _string = _string.replace("country=", "your-country=");
        _string = _string.replace("address=", "your-Address=");
        _string = _string.replace("machines=", "your-machines[]=");
    }
    catch(err) {
        _error(err);
    }
    _log(_string);
    return _string;
}