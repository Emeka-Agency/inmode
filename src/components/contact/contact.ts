import { selectOne } from "../../functions/selectors";

export const send_form_mini = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>) {
    // console.log("send_form_mini");
    e.preventDefault();
    try {

        let _temp:any = selectOne('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', true);
        _temp = selectOne('#mini-contact-gif');
        if(_temp) {_temp.style.display = 'inline-block';}
        let body:any = {};
        let _form = document.forms.namedItem('contact-mini');
        Array.from(_form ? _form.elements : []).forEach((elem:any) => {
            body[elem.name] = ["checkbox", "radio"].indexOf(elem.type) >= 0 ? elem.checked : elem.value;
        });
        body.action = "contact-us";
        var myHeaders = new Headers();
        const request_init:RequestInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body),
        };
        _temp = selectOne("#contact-mini .req-return.success");
        if(_temp) {_temp.innerHTML = "";}
        _temp = selectOne("#contact-mini .req-return.error");
        if(_temp) {_temp.innerHTML = "";}
        let response = await (
            await fetch(
                `${process.env.INMODE_BACK}/api/mails`,
                // `https://localhost:8000/api/mails`,
                request_init
            )
            .then((promise) => {
                // console.log(promise);
                return handlePromise(promise);
            })
            // .then(res => res.text())
            .then((response) => {
                // console.log(response);
                let _temp:any = selectOne('#mini-contact-gif');
                if(_temp) {_temp.style.display = 'none';}
                if(response.status === 'success' && response.type === 'client') {
                    _temp = selectOne('#contact-mini .submit');
                    _temp.removeAttribute('disabled');
                    _temp = selectOne('#contact-mini .req-return.success');
                    if(_temp) {_temp.innerHTML = response.message;}
                    let _form = document.forms.namedItem('contact-mini');
                    _form && _form.reset();
                }
                if(response.status === "error" && response.type === 'client') {
                    setSubmitText(response.message);
                    _temp = selectOne('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = selectOne('#contact-mini .req-return.error');
                    if(_temp) {_temp.innerHTML = "Erreur d'envoi du message.";}
                    // if(_temp) {_temp.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";}
                }
                if(response.status === "error" && response.type === 'server') {
                    _temp = selectOne('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = selectOne('#contact-mini .req-return.error');
                    if(_temp) {_temp.innerHTML = response.message;}
                }
            })
            .catch(function(error) {
                console.log(error);
                _temp = selectOne('#contact-mini .submit');
                _temp.setAttribute('disabled', true);
                _temp = selectOne('#contact-mini .req-return.error');
                if(_temp) {_temp.innerHTML = "Erreur d'envoi du message.";}
            })
        );
        // console.log(response);
        // ).json()
    }
    catch(err) {
        let _temp = selectOne('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', "true");
        _temp = selectOne('#contact-mini .req-return.error');
        if(_temp) {_temp.innerHTML = "Erreur d'envoi du message.";}
    }
}

export const send_form_large = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>) {
    // console.log("send_form_large");
    e.preventDefault();
    try {
        let _temp1:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
        if(_temp1) _temp1.innerHTML = "";
        let _temp2:HTMLElement | null = document.querySelector('#full-contact-form .req-return.error');
        if(_temp2) _temp2.innerHTML = "";
        let _temp3:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
        if(_temp3) _temp3.disabled = true;
        let body:any = new Object({});
        if(document.forms.namedItem("full-contact-form") == null) {
            return false;
        }
        let _form:HTMLFormElement | null = document.forms.namedItem("full-contact-form")
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
                `${process.env.SYMF_BACK}/api/mails`,
                // `https://localhost:8000/api/mails`,
                request_init,
            )
            .then((promise) => {
                // console.log(promise);
                return handlePromise(promise);
            })
            // .then(res => res.text())
            .then((response) => {
                // console.log(response);
                if(response.status === 'success' && response.type === 'client') {
                    let _temp = document.querySelector('#full-contact-form .submit');
                    _temp && _temp.removeAttribute('disabled');
                    _temp = document.querySelector('#full-contact-form .req-return.success');
                    if(_temp) _temp.innerHTML = response.message;
                    let _form:HTMLFormElement | null = document.forms.namedItem('full-contact-form')
                    _form && _form.reset();
                }
                if(response.status === "error" && response.type === 'client') {
                    setSubmitText(response.message);
                    let _temp1:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
                    if(_temp1) _temp1.disabled = true;
                    let _temp2:HTMLElement | null = document.querySelector('#full-contact-form .req-return.error');
                    if(_temp2) _temp2.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
                    // if(_temp2) _temp2.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
                }
                if(response.status === "error" && response.type === 'server') {
                    let _temp1:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
                    if(_temp1) _temp1.disabled = true;
                    let _temp2 = document.querySelector('#full-contact-form .req-return.error');
                    if(_temp2) _temp2.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
                    // if(_temp2) _temp2.innerHTML = response.message;
                }
            })
            .catch(function(error) {
                console.log(error);
                // setSubmitText(error.message);
                let _temp1:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
                if(_temp1) _temp1.disabled = true;
                let _temp2:HTMLElement | null = document.querySelector('#full-contact-form .req-return.error');
                if(_temp2) _temp2.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
                // if(_temp2) _temp2.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
            })
        );
        // console.log(response);
        // ).json()
    }
    catch(err) {
        // setSubmitText(error.message);
        let _temp1:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
        if(_temp1) _temp1.disabled = true;
        let _temp2:HTMLElement | null = document.querySelector('#full-contact-form .req-return.error');
        if(_temp2) _temp2.innerHTML = `Erreur d'envoi du message. Essayez de rafraîchir la page ou <a href="mailto:contact.fr@inmodemd.com style="color:#59b7b3;font-weight:bold;">contactez-nous directement.</a>`;
        // if(_temp2) _temp2.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
    }
}

function handlePromise(promise:Response) {
    // console.log("handlePromise");
    let retour = null;
    try {
        // console.log("Try json()");
        retour = promise.json();
    }
    catch(err_json) {
        console.log(err_json);
        try {
            // console.log("Try text()");
            retour = promise.text();
        }
        catch(err_text) {
            console.log(err_text);
            try {
                // console.log("Try blob()");
                retour = promise.blob();
            }
            catch(err_blob) {
                console.log(err_blob);
                retour = null;
            }
        }
    }
    return retour;
}