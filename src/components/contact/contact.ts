import { _log, _trace } from "../../functions/logger";
import { selectOne } from "../../functions/selectors";

export const send_form_mini = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>) {
    _log("send_form_mini");
    try {
        e.preventDefault();
        let _temp:any = selectOne('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', true);
        _temp = selectOne('#mini-contact-gif');
        if(_temp) {_temp.style.display = 'inline-block';}
        let _form = document.forms.namedItem('contact-mini');
        let body:any = {
            "lastname": _form?.querySelector('[name="lastname"]')?.value,
            "firstname": _form?.querySelector('[name="firstname"]')?.value,
            "subject": _form?.querySelector('[name="subject"]')?.value,
            "mail": _form?.querySelector('[name="mail"]')?.value,
            "phone_number": _form?.querySelector('[name="phone"]')?.value,
            "zip": _form?.querySelector('[name="zip"]')?.value,
            "city": _form?.querySelector('[name="city"]')?.value,
            "message": _form?.querySelector('#contact-message-mini')?.value,
            "type": "contact-us"
        };

        _log(create_pardot_url(body));

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
        
        // fetch([
        //     `${process.env.PARDOT_POINT?.replace('#date#', get_now_time())}`,
        //     translate_fields_names(to_get_line(body, "contact"))
        // ].join('?'))
        // .catch(err => console.log(err));
        
        let response = await (
            await fetch(
                `${process.env.AIRTABLE_MAILS}`,
                request_init
            )
            .then((promise) => {
                _log(promise);
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
                    if(_temp) {_temp.innerHTML = response.message ?? "Email was sent successfully";}
                    let _form = document.forms.namedItem('contact-mini');
                    _form && _form.reset();
                }
                if(response.status === 'fail' && response.type === 'client') {
                    setSubmitText(response.message);
                    _temp = selectOne('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = selectOne('#contact-mini .req-return.success');
                    if(_temp) {_temp.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";}
                }
                if(response.status === 'fail' && response.type === 'server') {
                    _temp = selectOne('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = selectOne('#contact-mini .req-return.error');
                    if(_temp) {_temp.innerHTML = response.message;}
                }
            })
            .catch(function(error) {
                _trace(error);
                let _temp:any = selectOne('#mini-contact-gif');
                if(_temp) {_temp.style.display = 'none';}
                setSubmitText("Contact issue");
                _temp = selectOne('#contact-mini .submit');
                _temp && _temp.setAttribute('disabled', "true");
                _temp = selectOne('#contact-mini .req-return.success');
                if(_temp) {
                    _temp.style.setProperty('white-space', 'normal');
                    _temp.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
                }
            })
        );
        _log(response);
        // ).json()

        click_pardot(body);
    }
    catch(err) {
        _trace(err);
        let _temp:any = selectOne('#mini-contact-gif');
        if(_temp) {_temp.style.display = 'none';}
        setSubmitText("Contact issue");
        _temp = selectOne('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', "true");
        _temp = selectOne('#contact-mini .req-return.success');
        if(_temp) {
            _temp.style.setProperty('white-space', 'normal');
            _temp.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
        }
    }
}

export const send_form_large = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>, on_success:Function|null = null, on_error:Function|null = null) {
    _log("send_form_large");
    try {
        e.preventDefault();
        let _success:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
        if(_success) _success.innerHTML = "";
        let _error:HTMLElement | null = document.querySelector('#full-contact-form .req-return.error');
        if(_error) _error.innerHTML = "";
        let _submit:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
        if(_submit) _submit.disabled = true;
        if(document.forms.namedItem("full-contact-form") == null) {
            return false;
        }
        let _form:HTMLFormElement | null = document.forms.namedItem("full-contact-form");
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

        _log(create_pardot_url(body));
        
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
        
        // fetch([
        //     `${process.env.PARDOT_POINT?.replace('#date#', get_now_time())}`,
        //     translate_fields_names(to_get_line(body, "contact"))
        // ].join('?'))
        // .catch(err => console.log(err));
        
        let response = await (
            await fetch(
                `${process.env.AIRTABLE_MAILS}`,
                request_init,
            )
            .then((promise) => {
                _log(promise);
                return handlePromise(promise);
            })
            // .then(res => res.text())
            .then((response) => {
                _log(response);
                on_success instanceof Function && on_success(response.status);
                if(response.records || (response.status === 'success' && response.type === 'client')) {
                    _submit && _submit.removeAttribute('disabled');
                    _submit = document.querySelector('#full-contact-form .req-return.success');
                    if(_submit) _submit.innerHTML = response.message ?? "Email was sent successfully";
                    let _form:HTMLFormElement | null = document.forms.namedItem('full-contact-form')
                    _form && _form.reset();
                }
                if(response.status === 'fail' && response.type === 'client') {
                    setSubmitText(response.message);
                    let _success:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
                    if(_success) _success.disabled = true;
                    let _error:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
                    if(_error) _error.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
                }
                if(response.status === 'fail' && response.type === 'server') {
                    let _success:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
                    if(_success) _success.disabled = true;
                    let _error = document.querySelector('#full-contact-form .req-return.error');
                    if(_error) _error.innerHTML = response.message;
                }
                document?.getElementById("large_contact_submit_spinner")?.classList.remove('active');
            })
            .catch(function(error) {
                _trace(error);
                on_error instanceof Function && on_error("error");
                setSubmitText("Contact issue");
                let _success:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
                if(_success) _success.disabled = true;
                let _error:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
                if(_error) {
                    _error.style.setProperty('white-space', 'normal');
                    _error.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
                }
                document?.getElementById("large_contact_submit_spinner")?.classList.remove('active');
            })
        );
        _log(response);
        // ).json()
        
        click_pardot(body);
    }
    catch(err) {
        _trace(err);
        on_error instanceof Function && on_error("error");
        setSubmitText("Contact issue");
        let _success:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
        if(_success) _success.disabled = true;
        let _error:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
        if(_error) {
            _error.style.setProperty('white-space', 'normal');
            _error.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
        }
    }
}

export const send_sign_up = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>) {
    _log("send_sign_up");
    try {
        e.preventDefault();
        let _temp1:HTMLElement | null = document.querySelector('#event-signup .req-return.success');
        if(_temp1) _temp1.innerHTML = "";
        let _temp2:HTMLElement | null = document.querySelector('#event-signup .req-return.error');
        if(_temp2) _temp2.innerHTML = "";
        let _temp3:HTMLInputElement | null = document.querySelector('#event-signup .submit');
        if(_temp3) _temp3.disabled = true;
        let body:any = new Object({});
        if(document.forms.namedItem("event-signup") == null) {
            return false;
        }
        let _form:HTMLFormElement | null = document.forms.namedItem("event-signup")
        Array.from(_form ? _form.elements : []).map((elem:HTMLInputElement | any) => {
            body[elem.name] = ["checkbox", "radio"].indexOf(elem.type) >= 0 ? elem.checked : elem.value;
        });

        body.action = "full-contact";
        var myHeaders = new Headers();
        const request_init:RequestInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body),
        };
        let response = await (
            await fetch(
                `${process.env.INMODE_BACK}/api/mails`,
                // `https://localhost:8000/api/mails`,
                request_init,
            )
            .then((promise) => {
                _log(promise);
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
                    if(_temp2) _temp2.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
                }
                if(response.status === 'fail' && response.type === 'server') {
                    let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
                    if(_temp1) _temp1.disabled = true;
                    let _temp2 = document.querySelector('#event-signup .req-return.error');
                    if(_temp2) _temp2.innerHTML = response.message;
                }
            })
            .catch(function(error) {
                _trace(error);
                let _temp;
                setSubmitText("Contact issue");
                let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
                if(_temp1) _temp1.disabled = true;
                let _temp2:HTMLElement | null = document.querySelector('#event-signup .req-return.success');
                if(_temp2) {
                    _temp2.style.setProperty('white-space', 'normal');
                    _temp2.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
                }
            })
        );
        _log(response);
        // ).json()
    }
    catch(err) {
        _trace(err);
        let _temp;
        setSubmitText("Contact issue");
        let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
        if(_temp1) _temp1.disabled = true;
        let _temp2:HTMLElement | null = document.querySelector('#event-signup .req-return.success');
        if(_temp2) {
            _temp2.style.setProperty('white-space', 'normal');
            _temp2.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
        }
    }
}

export const send_form_landing = async function(e:React.FormEvent<HTMLFormElement>, from:string, setSubmitText:React.Dispatch<React.SetStateAction<string>>, on_success:Function|null = null, on_error:Function|null = null) {
    _log("send_form_large");
    try {
        e.preventDefault();
        let _success:HTMLElement | null = document.querySelector(`#${from}-landing-contact-form .req-return.success`);
        if(_success) _success.innerHTML = "";
        let _error:HTMLElement | null = document.querySelector(`#${from}-landing-contact-form .req-return.error`);
        if(_error) _error.innerHTML = "";
        let _submit:HTMLInputElement | null = document.querySelector(`#${from}-landing-contact-form .submit`);
        if(_submit) _submit.disabled = true;
        if(document.forms.namedItem(`${from}-landing-contact-form`) == null) {
            return false;
        }
        let _form:HTMLFormElement | null = document.forms.namedItem(`${from}-landing-contact-form`);
        let body:any = {
            "Name": _form?.querySelector('#Name')?.value,
            "Email": _form?.querySelector('#Email')?.value,
            "Phone": _form?.querySelector('#Phone')?.value,
            "Company": _form?.querySelector('#Company')?.value,
            "From": _form?.querySelector('#From')?.value,
        };

        // _log(create_pardot_url(body));
        
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
        
        // fetch([
        //     `${process.env.PARDOT_POINT?.replace('#date#', get_now_time())}`,
        //     translate_fields_names(to_get_line(body, "contact"))
        // ].join('?'))
        // .catch(err => console.log(err));
        
        let response = await (
            await fetch(
                `${process.env.AIRTABLE_LANDING}`,
                request_init,
            )
            .then((promise) => {
                _log(promise);
                return handlePromise(promise);
            })
            // .then(res => res.text())
            .then((response) => {
                _log(response);
                if(response.records || (response.status === 'success' && response.type === 'client')) {
                    on_success instanceof Function && on_success("success");
                    _submit && _submit.removeAttribute('disabled');
                    _submit = document.querySelector(`#${from}-landing-contact-form .req-return.success`);
                    if(_submit) _submit.innerHTML = response.message ?? "Email was sent successfully";
                    let _form:HTMLFormElement | null = document.forms.namedItem(`${from}-landing-contact-form`)
                    _form && _form.reset();
                }
                if(response.status === 'fail' && response.type === 'client') {
                    setSubmitText(response.message);
                    on_success instanceof Function && on_success("fail");
                    let _success:HTMLInputElement | null = document.querySelector(`#${from}-landing-contact-form .submit`);
                    if(_success) _success.disabled = true;
                    let _error:HTMLElement | null = document.querySelector(`#${from}-landing-contact-form .req-return.success`);
                    if(_error) _error.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
                }
                if(response.status === 'fail' && response.type === 'server') {
                    on_success instanceof Function && on_success("fail");
                    let _success:HTMLInputElement | null = document.querySelector(`#${from}-landing-contact-form .submit`);
                    if(_success) _success.disabled = true;
                    let _error = document.querySelector(`#${from}-landing-contact-form .req-return.error`);
                    if(_error) _error.innerHTML = response.message;
                }
                document?.getElementById("large_contact_submit_spinner")?.classList.remove('active');
            })
            .catch(function(error) {
                _trace(error);
                on_error instanceof Function && on_error("error");
                setSubmitText("Contact issue");
                let _success:HTMLInputElement | null = document.querySelector(`#${from}-landing-contact-form .submit`);
                if(_success) _success.disabled = true;
                let _error:HTMLElement | null = document.querySelector(`#${from}-landing-contact-form .req-return.success`);
                if(_error) {
                    _error.style.setProperty('white-space', 'normal');
                    _error.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
                }
                document?.getElementById("large_contact_submit_spinner")?.classList.remove('active');
            })
        );
        _log(response);
        // ).json()
        
        // click_pardot(body);
    }
    catch(err) {
        _trace(err);
        on_error instanceof Function && on_error("error");
        setSubmitText("Contact issue");
        let _success:HTMLInputElement | null = document.querySelector(`#${from}-landing-contact-form .submit`);
        if(_success) _success.disabled = true;
        let _error:HTMLElement | null = document.querySelector(`#${from}-landing-contact-form .req-return.success`);
        if(_error) {
            _error.style.setProperty('white-space', 'normal');
            _error.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
        }
    }
}

function handlePromise(promise:Response) {
    _log("handlePromise");
    let retour = null;
    try {
        _log("Try json()");
        retour = promise.json();
    }
    catch(err_json) {
        _log(err_json);
        try {
            _log("Try text()");
            retour = promise.text();
        }
        catch(err_text) {
            _log(err_text);
            try {
                _log("Try blob()");
                retour = promise.blob();
            }
            catch(err_blob) {
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
            href: create_pardot_url(body),
        }).click();
        a.click();
        a.remove();
    }
    catch(err) {
        
    }
    return true;
}

function strToDom(str:string) {
    try {
        return document.createRange().createContextualFragment(str);
    }
    catch(err) {
        return null;
    }
}

function create_pardot_url(body) {
    try {
        return [
            `${process.env.PARDOT_POINT?.replace('#date#', get_now_time())}`,
            translate_fields_names(to_get_line(body, "contact"))
        ].join('?');
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
                return encodeURI(_body[key].map((val:string) => {
                    return front_to_pardot_machines(val) ?? '';
                }).join(';'));
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
        _string = _string.replace("addres=", "your-Address=");
        _string = _string.replace("addres=", "your-Address=");
        _string = _string.replace("machines=", "your-machines[]=");
    }
    catch(err) {
        console.error(err);
    }
    _log(_string);
    return _string;
}