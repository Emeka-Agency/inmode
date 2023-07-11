import { _log, _trace } from "../../functions/logger";
import { selectOne } from "../../functions/selectors";
import { go_to, handlePromise } from "../../functions/tools";
import { useLocalStorage } from "../../functions/use-localstorage";
import { Airtable_Event_Interface, Airtable_Register_Interface } from "../interfaces";

export async function manage_event_register(e:any, event:Airtable_Event_Interface, set_register:Function) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const button = selectOne('form button[type="submit"]');
    const error = selectOne('form .req-return.error');

    if(!(form instanceof HTMLFormElement)) return;
    if(!(button instanceof HTMLButtonElement)) return;
    if(!(error instanceof HTMLElement)) return;

    error.innerText = "";
    
    if(!form.firstname.value || !form.surname.value || !form.email.value || !form.number.value || !form.clinic.value || !form.postcode.value) {
        button.innerText = "Missing requireds fields";
        return;
    }
    
    if(!form.checkValidity()) {
        button.innerText = "Invalid fields";
        form.reportValidity();
        return;
    }

    button.classList.add('loading');

    fetch(
        `${process.env.AIRTABLE_EVENT_SIGNUP}?filterByFormula=AND({Email}="${form.email.value}")&fields%5B%5D=Event`,
        {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${process.env.AIRTABLE_KEY}`,
                "content-type": "application/json"
            },
            mode: 'cors',
            cache: 'default',
        }
    )
    .then((promise) => handlePromise(promise))
    .then((response) => {
        _log(response);
        if(response.records.filter((rec:{fields: Airtable_Register_Interface}) => rec.fields.Event.indexOf(event.id) > -1).length > 0) {
            go_to("/thanks");
            return;
            button.classList.remove('loading');
            error.innerText = "You have already registered to this event.";
            return false;
        }
        event_register(form, event, set_register)
        return true;
    })
    .catch(function(error) {
        _trace(error);
        button.classList.remove('loading');
    });
}

function event_register(form:HTMLFormElement, event:Airtable_Event_Interface, set_register:Function) {
    
    const button = selectOne('form button[type="submit"]');
    const error = selectOne('form .req-return.error');

    if(!(form instanceof HTMLFormElement)) return;
    if(!(button instanceof HTMLButtonElement)) return;
    if(!(error instanceof HTMLElement)) return;

    if(!form.firstname.value || !form.surname.value || !form.email.value || !form.number.value || !form.clinic.value || !form.postcode.value) {
        button.innerText = "Missing requireds fields";
        return;
    }
    
    if(!form.checkValidity()) {
        button.innerText = "Invalid fields";
        form.reportValidity();
        return;
    }
    
    const body = {
        Event: [event?.id],
        Firstname: form.firstname.value,
        Surname: form.surname.value,
        Email: form.email.value,
        "Contact number": form.number.value,
        "Clinic Name": form.clinic.value,
        Postcode: form.postcode.value,
        Comment: form.comment.value,
        Machines: event.DisplayMachines ? Array.from(form.machines).filter((input:any) => input.checked).map((input:any) => input.id) : [],
    }
    
    const request_init:RequestInit = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${process.env.AIRTABLE_KEY}`,
            "content-type": "application/json"
        },
        mode: 'cors',
        cache: 'default',
        "body": JSON.stringify({"records": [{"fields": body}]}),
    };

    fetch(
        `${process.env.AIRTABLE_EVENT_SIGNUP}`,
        request_init
    )
    .then((promise) => handlePromise(promise))
    .then((response) => {
        _log(response);
        button.classList.remove('loading');
        let _temp:any = selectOne('#mini-contact-gif');
        if(_temp) {_temp.style.display = 'none';}
        if(response.records || (response.status === 'success' && response.type === 'client')) {
            useLocalStorage.setItem(`inuk_${event?.id}_register`, true);
            error.innerText = "";
            go_to("/thanks");
        }
        if(response.status === 'fail' && response.type === 'client') {
            error.innerText = "An error sending the message has occurred. Try refreshing the page or contacting an administrator.";
        }
        if(response.status === 'fail' && response.type === 'server') {
            error.innerText = response.message;
        }
    })
    .catch(function(error) {
        _trace(error);
        button.classList.remove('loading');
        error.innerText = "There had an issue during the mailing process. Please reload the page or use our mail : <a style=\"font-size: 15px; color: white; display: inline-block; font-weight: bold;\" href=\"mailto:neil.wolfenden@inmodemd.com\">neil.wolfenden@inmodemd.com</a>";
    });
}