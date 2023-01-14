import { _log } from "../../functions/logger";
import { oneBySelector } from "../../functions/selectors";

export const send_form_mini = async function(e:React.FormEvent<HTMLFormElement>, setSubmitText:React.Dispatch<React.SetStateAction<string>>) {
    _log("send_form_mini");
    try {
        e.preventDefault();
        let _temp:any = oneBySelector('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', true);
        _temp = oneBySelector('#mini-contact-gif');
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
        _temp = oneBySelector("#contact-mini .req-return.success");
        if(_temp) {_temp.innerHTML = "";}
        _temp = oneBySelector("#contact-mini .req-return.error");
        if(_temp) {_temp.innerHTML = "";}
        let response = await (
            await fetch(
                `${process.env.INMODE_BACK}/api/mails`,
                // `https://localhost:8000/api/mails`,
                request_init
            )
            .then((promise) => {
                _log(promise);
                return handlePromise(promise);
            })
            // .then(res => res.text())
            .then((response) => {
                _log(response);
                let _temp:any = oneBySelector('#mini-contact-gif');
                if(_temp) {_temp.style.display = 'none';}
                if(response.status === 'success' && response.type === 'client') {
                    _temp = oneBySelector('#contact-mini .submit');
                    _temp.removeAttribute('disabled');
                    _temp = oneBySelector('#contact-mini .req-return.success');
                    if(_temp) {_temp.innerHTML = response.message;}
                    let _form = document.forms.namedItem('contact-mini');
                    _form && _form.reset();
                }
                if(response.status === 'fail' && response.type === 'client') {
                    setSubmitText(response.message);
                    _temp = oneBySelector('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = oneBySelector('#contact-mini .req-return.success');
                    if(_temp) {_temp.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";}
                }
                if(response.status === 'fail' && response.type === 'server') {
                    _temp = oneBySelector('#contact-mini .submit');
                    _temp.setAttribute('disabled', true);
                    _temp = oneBySelector('#contact-mini .req-return.error');
                    if(_temp) {_temp.innerHTML = response.message;}
                }
            })
            .catch(function(error) {
                let _temp:any = oneBySelector('#mini-contact-gif');
                if(_temp) {_temp.style.display = 'none';}
                setSubmitText("Contact issue");
                _temp = oneBySelector('#contact-mini .submit');
                _temp && _temp.setAttribute('disabled', "true");
                _temp = oneBySelector('#contact-mini .req-return.success');
                if(_temp) {
                    _temp.style.setProperty('white-space', 'normal');
                    _temp.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:info@inmodemd.co.uk\">info@inmodemd.co.uk</a>";
                }
            })
        );
        _log(response);
        // ).json()
    }
    catch(err) {
        let _temp:any = oneBySelector('#mini-contact-gif');
        if(_temp) {_temp.style.display = 'none';}
        setSubmitText("Contact issue");
        _temp = oneBySelector('#contact-mini .submit');
        _temp && _temp.setAttribute('disabled', "true");
        _temp = oneBySelector('#contact-mini .req-return.success');
        if(_temp) {
            _temp.style.setProperty('white-space', 'normal');
            _temp.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:info@inmodemd.co.uk\">info@inmodemd.co.uk</a>";
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
                on_success instanceof Function && on_success(response.status);
                if(response.status === 'success' && response.type === 'client') {
                    _submit && _submit.removeAttribute('disabled');
                    _submit = document.querySelector('#full-contact-form .req-return.success');
                    if(_submit) _submit.innerHTML = response.message;
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
                on_error instanceof Function && on_error("error");
                setSubmitText("Contact issue");
                let _success:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
                if(_success) _success.disabled = true;
                let _error:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
                if(_error) {
                    _error.style.setProperty('white-space', 'normal');
                    _error.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:info@inmodemd.co.uk\">info@inmodemd.co.uk</a>";
                }
                document?.getElementById("large_contact_submit_spinner")?.classList.remove('active');
            })
        );
        _log(response);
        // ).json()
    }
    catch(err) {
        on_error instanceof Function && on_error("error");
        setSubmitText("Contact issue");
        let _success:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
        if(_success) _success.disabled = true;
        let _error:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
        if(_error) {
            _error.style.setProperty('white-space', 'normal');
            _error.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:info@inmodemd.co.uk\">info@inmodemd.co.uk</a>";
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
                let _temp;
                setSubmitText("Contact issue");
                let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
                if(_temp1) _temp1.disabled = true;
                let _temp2:HTMLElement | null = document.querySelector('#event-signup .req-return.success');
                if(_temp2) {
                    _temp2.style.setProperty('white-space', 'normal');
                    _temp2.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:info@inmodemd.co.uk\">info@inmodemd.co.uk</a>";
                }
            })
        );
        _log(response);
        // ).json()
    }
    catch(err) {
        let _temp;
        setSubmitText("Contact issue");
        let _temp1:HTMLInputElement | null = document.querySelector('#event-signup .submit');
        if(_temp1) _temp1.disabled = true;
        let _temp2:HTMLElement | null = document.querySelector('#event-signup .req-return.success');
        if(_temp2) {
            _temp2.style.setProperty('white-space', 'normal');
            _temp2.innerHTML = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:info@inmodemd.co.uk\">info@inmodemd.co.uk</a>";
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