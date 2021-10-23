import { oneBySelector } from "../../functions/selectors";

export const send_form_mini = async function( e:React.FormEvent<HTMLFormElement> ) {
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
        mode: 'no-cors',
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
            request_init
        )
    ).text()
    // .then((promise) => {
    //     console.log(promise);
    //     return promise.text();
    // })
    // .then(res => res.text())
    // .then((response) => {
    //     console.log(response);
    //     let _temp:any = oneBySelector('#mini-contact-gif');
    //     if(_temp) {_temp.style.display = 'none';}
    //     if(response.status === 'success' && response.type === 'client') {
    //         _temp = oneBySelector('#contact-mini .submit');
    //         _temp.removeAttribute('disabled');
    //         _temp = oneBySelector('#contact-mini .req-return.success');
    //         if(_temp) {_temp.innerHTML = response.message;}
    //         let _form = document.forms.namedItem('contact-mini');
    //         _form && _form.reset();
    //     }
    //     if(response.status === 'fail' && response.type === 'client') {
    //         setSubmitText(response.message);
    //         _temp = oneBySelector('#contact-mini .submit');
    //         _temp.setAttribute('disabled', true);
    //         _temp = oneBySelector('#contact-mini .req-return.success');
    //         if(_temp) {_temp.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";}
    //     }
    //     if(response.status === 'fail' && response.type === 'server') {
    //         _temp = oneBySelector('#contact-mini .submit');
    //         _temp.setAttribute('disabled', true);
    //         _temp = oneBySelector('#contact-mini .req-return.error');
    //         if(_temp) {_temp.innerHTML = response.message;}
    //     }
    // })
    .catch(function(error) {
        console.log(error);
    });
    console.log(response);
}

export const send_form_large = async function(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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

    body.action = "full-contact";
    var myHeaders = new Headers();
    const request_init:RequestInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'no-cors',
        cache: 'default',
        body: JSON.stringify(body),
    };
    let response = await (
        await fetch(
            `${process.env.INMODE_BACK}/api/mails`,
            request_init,
        )
    ).text()
    // .then((promise) => {
    //     console.log(promise);
    //     return promise.text();
    // })
    // .then(res => res.text())
    // .then((response) => {
    //     console.log(response);
    //     if(response.status === 'success' && response.type === 'client') {
    //         let _temp = document.querySelector('#full-contact-form .submit');
    //         _temp && _temp.removeAttribute('disabled');
    //         _temp = document.querySelector('#full-contact-form .req-return.success');
    //         if(_temp) _temp.innerHTML = response.message;
    //         let _form:HTMLFormElement | null = document.forms.namedItem('full-contact-form')
    //         _form && _form.reset();
    //     }
    //     if(response.status === 'fail' && response.type === 'client') {
    //         setSubmitText(response.message);
    //         let _temp1:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
    //         if(_temp1) _temp1.disabled = true;
    //         let _temp2:HTMLElement | null = document.querySelector('#full-contact-form .req-return.success');
    //         if(_temp2) _temp2.innerHTML = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
    //     }
    //     if(response.status === 'fail' && response.type === 'server') {
    //         let _temp1:HTMLInputElement | null = document.querySelector('#full-contact-form .submit');
    //         if(_temp1) _temp1.disabled = true;
    //         let _temp2 = document.querySelector('#full-contact-form .req-return.error');
    //         if(_temp2) _temp2.innerHTML = response.message;
    //     }
    // })
    .catch(function(error) {
        console.log(error);
    });
    console.log(response);
}