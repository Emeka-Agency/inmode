import React, { MouseEventHandler } from "react";
import { useImages } from '../contexts/images-provider';
import { Airtable_Event_Interface, Airtable_Picture_Interface, InmodePanel_Addon_Interface, InmodePanel_Event_Interface } from "../interfaces";
import randomString from "../../functions/randString";
import { closeModale, openModale, signupEvent } from "../../functions/modale";
import { useWindowSize } from "../../functions/window-size";
import { _log } from "../../functions/logger";
import { handlePromise, resolveImg } from "../../functions/tools";
import { getById, selectOne } from "../../functions/selectors";

const InmodeEvent = ({ givenId = undefined, event = undefined, prop_key, current_page, isPast = false }:InmodeEvent) => {

    if(event === undefined) {
        return <></>;
    }
    
    const size = useWindowSize();

    function get_day(day:number):string {
        try {
            return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][day];
        }
        catch(err) {
            return 'unknown';
        }
    }
    
    function get_month(month:number):string {
        try {
            return ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][month]
        }
        catch(err) {
            return 'unknown';
        }
    }
    
    function _getDate(_date:Date) {return (_date.getDate() < 10 ? `0${_date.getDate()}` : _date.getDate());}
    function _getMonth(_date:Date) {return (_date.getMonth() + 1 < 10 ? `0${_date.getMonth() + 1}` : _date.getMonth() + 1);}
    function _getFull_year(_date:Date) {return _date.getFullYear();}
    function _getHour(_date:Date) {return (_date.getHours() < 10 ? `0${_date.getHours()}` : _date.getHours());}
    function _getMinute(_date:Date) {return (_date.getMinutes() < 10 ? `0${_date.getMinutes()}` : _date.getMinutes());}
    
    function getDay(date:string|null):string {
        if(date == null) {return "";}
        const _date = new Date(date);
        let _temp = "";
        _temp += _getDate(_date) + "/";
        _temp += _getMonth(_date) + "/";
        _temp += _getFull_year(_date) + " ";
        return _temp;
    }

    function getTime(date:string|null):string {
        if(date == null) {return "";}
        const _date = new Date(date);
        let _temp = "";
        _temp += _getHour(_date) + ":";
        _temp += _getMinute(_date);
        return _temp;
    }

    function getDate(start:string|null = null, stop:string|null = null):string {
        if(!stop || stop == undefined || stop == null) {
            return getDay(start) + " " + getTime(start);
        }
        else {
            if(getDay(start) == getDay(stop)) {
                return getDay(start) + " | " + getTime(start) + " - " + getTime(stop);
            }
            else {
                return getDay(start) + " - " + getDay(stop);
            }
        }
    }

    const records = {
        salutation: {element: '#event-participate-salutation', field_name: "Salutation", value: "value"},
        firstname: {element: '#event-participate-firstname', field_name: "Firstname", value: "value"},
        surname: {element: '#event-participate-surname', field_name: "Surname", value: "value"},
        speciality: {element: '#event-participate-speciality', field_name: "Speciality", value: "value"},
        clinic_name: {element: '#event-participate-clinic-name', field_name: "Clinic Name", value: "value"},
        clinic_location: {element: '#event-participate-clinic-location', field_name: "Clinic Location", value: "value"},
        email: {element: '#event-participate-email', field_name: "Email", value: "value"},
        contact_number: {element: '#event-participate-contact-number', field_name: "Contact number", value: "value"},
        is_doctor: {element: '#event-participate-is-doctor', field_name: "Doctor", value: "checked"},
    };

    function signup_body() {
        return [
            selectOne(`#${selectOne('#event-participate-event-name')?.value.split('_')[0]}_title`)?.innerText,
            selectOne(records["salutation"].element)[records["salutation"].value],
            selectOne(records["firstname"].element)[records["firstname"].value],
            selectOne(records["surname"].element)[records["surname"].value],
            selectOne(records["email"].element)[records["email"].value],
            selectOne(records["contact_number"].element)[records["contact_number"].value],
            selectOne(records["speciality"].element)[records["speciality"].value],
            selectOne(records["clinic_name"].element)[records["clinic_name"].value],
            "",
            selectOne(records["clinic_location"].element)[records["clinic_location"].value],
            selectOne(records["is_doctor"].element)[records["is_doctor"].value] ? "y" : "n",
            "",
            "n",
            selectOne('#event-participate-event-slug')?.value,
        ];
    }

    // TODO - Ajouter un loading gif et un retour
    async function save_signup() {
        await fetch(
            `${process.env.INMODE_BACK}/api/set-datas`,
            {
                method: "POST",
                body: JSON.stringify({
                    "type": "events_signup",
                    "values": [signup_body()]
                })
            }
        )
        .then(promise => handlePromise(promise))
        .then(res => _log(res))
        .catch(err => _log(err))
    }

    function signup_all_required() {
        if(typeof document == "undefined") {return false;}
        let container = document.querySelector(".event-participate-modale-container");
        if(container == null) {return false;}

        return Array.from(container.querySelectorAll('.form-field'))
        .map(elem => {
            if(elem instanceof HTMLInputElement && elem.required == false) {
                return true;
            }
            if(elem instanceof HTMLInputElement && elem.required == true && elem.value != null && elem.value != "") {
                return true;
            }
            if(elem instanceof HTMLSelectElement && elem.required == false) {
                return true;
            }
            if(elem instanceof HTMLSelectElement && elem.required == true && elem.value != null && elem.value.length > 0) {
                return true;
            }
            if(typeof document != undefined) {
                let status = document.getElementById(`${elem.id}-status`);
                if(status instanceof HTMLSpanElement) {
                    status.innerHTML = "Must enter datas";
                    status.style.removeProperty('display');
                }
            }
            return false;
        })
        .filter(value => value == false).length == 0;
    }

    function handle_signup_form_change(e:any, duo:any, form:any , button:any) {
        _log(e);
        if((e.key ?? null) == "Enter") {
            _log(1);
            if((duo.elem instanceof HTMLInputElement || duo.elem instanceof HTMLSelectElement) && duo.elem.value != "" && duo.status) {
                _log(2);
                if(signup_all_required())
                {
                    // TODO
                    save_signup();
                    closeModale();
                }
                else {
                    form instanceof HTMLFormElement && form.reportValidity();
                }
            }
            else if(duo.status instanceof HTMLSpanElement && (duo.elem instanceof HTMLInputElement || duo.elem instanceof HTMLSelectElement) && duo.elem.required) {
                _log(4);
                duo.status.innerHTML = "Must enter datas";
                duo.status.style.removeProperty('display');
            }
        }
        else {
            if(signup_all_required()) {
                button && button.classList.add('able');
                duo.status && duo.status.style.setProperty('display', 'none');
            }
            else {
                button && button.classList.remove('able');
            }
        }
    }

    function join_event(e:React.MouseEvent<HTMLDivElement, MouseEvent>, event_name?:string, event_slug?:string) {
        openModale(signupEvent({
            event_name: event_name,
            event_slug: event_slug,
            onOpen: () => {
                // CONTAINER
                let form = document.querySelector('#event-signup');
                let container = document.querySelector(".event-participate-modale-container");
                // MODALE CONTENT
                let salutation:HTMLElement|HTMLInputElement|null = getById('event-participate-salutation');
                let salutation_status:HTMLSpanElement|null = getById('event-participate-salutation-status');
                let firstname:HTMLElement|HTMLInputElement|null = getById('event-participate-firstname');
                let firstname_status:HTMLSpanElement|null = getById('event-participate-firstname-status');
                let surname:HTMLElement|HTMLInputElement|null = getById('event-participate-surname');
                let surname_status:HTMLSpanElement|null = getById('event-participate-surname-status');
                let email:HTMLElement|HTMLInputElement|null = getById('event-participate-email');
                let email_status:HTMLSpanElement|null = getById('event-participate-email-status');
                let contact_number:HTMLElement|HTMLInputElement|null = getById('event-participate-contact-number');
                let contact_number_status:HTMLSpanElement|null = getById('event-participate-contact-number-status');
                let speciality:HTMLElement|HTMLSelectElement|null = getById('event-participate-speciality');
                let speciality_status:HTMLSpanElement|null = getById('event-participate-speciality-status');
                let clinic_name:HTMLElement|HTMLInputElement|null = getById('event-participate-clinic-name');
                let clinic_name_status:HTMLSpanElement|null = getById('event-participate-clinic-name-status');
                let clinic_location:HTMLElement|HTMLInputElement|null = getById('event-participate-clinic-location');
                let clinic_location_status:HTMLSpanElement|null = getById('event-participate-clinic-location-status');
                let is_doctor:HTMLElement|HTMLInputElement|null = getById('event-participate-is-doctor');
                let is_doctor_status:HTMLSpanElement|null = getById('event-participate-is-doctor-status');
                let button:HTMLElement|HTMLButtonElement|null = getById('event-participate-submit');

                if(
                    form == null ||
                    container == null ||
                    salutation == null || salutation_status == null ||
                    firstname == null || firstname_status == null ||
                    surname == null || surname_status == null ||
                    speciality == null || speciality_status == null ||
                    clinic_name == null || clinic_name_status == null ||
                    clinic_location == null || clinic_location_status == null ||
                    email == null || email_status == null ||
                    contact_number == null || contact_number_status == null ||
                    is_doctor == null || is_doctor_status == null ||
                    button == null
                ) {
                    return false;
                }

                is_doctor.addEventListener('click', function(e) {
                    document.querySelectorAll('.specialist-zone').forEach(elem => {
                        if(elem instanceof HTMLElement && e.target instanceof HTMLInputElement && e.target.checked) {
                            elem.style.removeProperty('display');
                            (elem.querySelector('input') ?? elem.querySelector('select'))?.setAttribute('required', 'true');
                        }
                        else if(elem instanceof HTMLElement) {
                            elem.style.setProperty('display', 'none');
                            (elem.querySelector('input') ?? elem.querySelector('select'))?.removeAttribute('required');
                        }
                    });
                    if(signup_all_required()) {
                        button && button.classList.add('able');
                    }
                    else {
                        button && button.classList.remove('able');
                    }
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    closeModale();
                });
                
                // MODALE INPUT
                [
                    {elem: salutation, status: salutation_status},
                    {elem: firstname, status: firstname_status},
                    {elem: surname, status: surname_status},
                    {elem: email, status: email_status},
                    {elem: contact_number, status: contact_number_status},
                    {elem: is_doctor, status: is_doctor_status},
                    {elem: speciality, status: speciality_status},
                    {elem: clinic_name, status: clinic_name_status},
                    {elem: clinic_location, status: clinic_location_status},
                ].forEach((duo) => {
                    duo.elem instanceof HTMLInputElement && duo.elem.addEventListener('keyup', e => handle_signup_form_change(e, duo, form, button));
                    duo.elem instanceof HTMLSelectElement && duo.elem.addEventListener('change', e => handle_signup_form_change(e, duo, form, button));
                });

                // MODALE BUTTON
                button && button.addEventListener('click', (e) => {
                    e.preventDefault();
                    _log(e);
                    _log(5);
                    if(signup_all_required())
                    {
                        _log(6);
                        // TODO
                        save_signup();
                        closeModale();
                    }
                    else {
                        form instanceof HTMLFormElement && form.reportValidity();
                        _log(8);
                    }
                });

                salutation.focus();
            }
        }));
    }

    function resolve_picture_ratio(picture:Airtable_Picture_Interface|undefined) {
        if(picture == null) {return 1;}
        if(picture?.thumbnails?.large?.url) {return picture?.thumbnails?.large?.height / picture?.thumbnails?.large?.width;}
        if(picture?.thumbnails?.full?.url) {return picture?.thumbnails?.full?.height / picture?.thumbnails?.full?.width;}
        if(picture?.thumbnails?.small?.url) {return picture?.thumbnails?.small?.height / picture?.thumbnails?.small?.width;}
        if(picture?.url) {return picture?.height / picture?.width;}
        return 1;
    }

    function resolve_picture(picture:Airtable_Picture_Interface|undefined) {
        if(picture == null) {return undefined;}
        if(picture?.thumbnails?.large?.url) {return picture?.thumbnails?.large?.url;}
        if(picture?.thumbnails?.full?.url) {return picture?.thumbnails?.full?.url;}
        if(picture?.thumbnails?.small?.url) {return picture?.thumbnails?.small?.url;}
        if(picture?.url) {return picture?.url;}
        return undefined;
    }

    _log(event);
    _log(prop_key);
    _log(current_page);

    const images = useImages();

    const has_card = current_page === "upcoming events" || event.EventType === "webinar";

    return (
        <div id={givenId} className={`inmode-event ${event.EventType}${has_card ? ' has_card' : ''} ${has_card ? "event-page" : "not-event-page" }`}>
            <div className="event-topband">
                {has_card && event.EventType &&
                    <div title={((type) => {
                        if(type === "Conference") {return "Conferences";}
                        if(type === "Workshop") {return "Workshops";}
                        if(type === "Webinar") {return `Webinar : ${event.Addons}`;}
                        if(type === "Tradeshow") {return "Tradeshows";}
                    })(event.EventType)} className={`top-card ${prop_key === 0 ? 'left' : 'left'}`} style={["Workshop", "Webinar"].indexOf(event.EventType ?? "") > -1 ? {} : {borderRadius: "13px 13px 13px 0"}}>
                        {event.EventType === "Conference" ? "Conferences" : ''}
                        {event.EventType === "Workshop" ? "Workshops" : ''}
                        {event.EventType === "Webinar" ? "Webinar : " : ''}
                        {event.EventType === "Webinar" ? <span style={{fontSize: '20px'}}>{event.Addons}</span> : ''}
                        {event.EventType === "Tradeshow" ? "Tradeshows" : ''}
                    </div>
                }
                {["Workshop", "Webinar"].indexOf(event.EventType ?? "") > -1 && <div className="event-signup" onClick={e => join_event(e, givenId, event.Slug)}>
                    SIGN UP
                </div>}
            </div>
            <div className={`${givenId}-dates event-dates`}>
                {getDate(event.Start, event.End)}
            </div>
            <div className={`img-part ${prop_key === 0 ? 'right' : 'left'}`}>
                <img
                    className="event-pic"
                    src={event.Picture ? resolveImg(event.Picture) : images.resolve_img("footerLogo")}
                    srcSet={event.Picture ? resolveImg(event.Picture) : images.resolve_img("footerLogo")}
                    alt={`event-pic-'${event.EventName}`}
                />
            </div>
            <div
                className={`descr-part ${prop_key === 0 ? 'left' : 'right'} custom-scrollbar moz-scrollbar`}
                style={size.width > 760 ? {maxWidth: `calc((100% - (${event.Picture ? event.Picture.aspectRatio * 150 : (images.get_one("footerLogo")?.childImageSharp.fluid.aspectRatio || 1) * 150}px + 55px))`} : {}}
                // 15 du padding gauche, 15 du padding droit, 5 de la custom-scrollbar, 20 pour être sûr
            >
                <div id={`${givenId}_title`} className="title">
                    {event.EventName ?? "Incoming title"}
                </div>
                <div id={`${givenId}_short_descr`} className="short_descr">
                    {event.EventDescription ?? "No information right now"}
                </div>
                {event.Start && <div id={`${givenId}_dates`} className="dates">
                    {`${getDate(event.Start)}${event.End ? ` - ${getDate(event.End)}` : ''}`}
                </div>}
                {event.Address && <div id={`${givenId}_address_link`} className="address_link">
                    <a href={event.PlaceURL || "#"} target="_blank" rel="noreferrer" title="Place">{event.Address}</a>
                </div>}
                {event.Address && <div id={`${givenId}_address`} className="address">
                    {event.Address}
                </div>}
                {event.MapsLink && <div id={`${givenId}_maps_location`} className="maps_location">
                    <a href={event.MapsLink || "#"} target="_blank" rel="noreferrer" title="Google Maps localization">+ Google Maps</a>
                </div>}
            </div>
        </div>
    );
};

interface InmodeEvent {
    event: Airtable_Event_Interface | undefined;
    prop_key: string | number;
    current_page: string;
    isPast?: boolean;
    givenId?: string;
}

export default InmodeEvent;