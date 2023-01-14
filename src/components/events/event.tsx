import React, { MouseEventHandler } from "react";
import { useImages } from '../contexts/images-provider';
import { Airtable_Event_Interface, InmodePanel_Addon_Interface, InmodePanel_Event_Interface } from "../interfaces";
import randomString from "../../functions/randString";
import { closeModale, openModale, signupEvent } from "../../functions/modale";
import { useWindowSize } from "../../functions/window-size";
import { _log } from "../../functions/logger";

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
    
    function _getDay(_date:Date) {return get_day(_date.getDay());}
    function _getDate(_date:Date) {return (_date.getDate() < 10 ? `0${_date.getDate()}` : _date.getDate());}
    function _getMonthName(_date:Date) {return get_month(_date.getMonth());}
    function _getMonth(_date:Date) {return (_date.getMonth() + 1 < 10 ? `0${_date.getMonth() + 1}` : _date.getMonth() + 1);}
    function _getFull_year(_date:Date) {return _date.getFullYear();}
    function _getHour(_date:Date) {return (_date.getHours() < 10 ? `0${_date.getHours()}` : _date.getHours());}
    function _getMinute(_date:Date) {return (_date.getMinutes() < 10 ? `0${_date.getMinutes()}` : _date.getMinutes());}
    function _getSecond(_date:Date) {return (_date.getSeconds() < 10 ? `0${_date.getSeconds()}` : _date.getSeconds());}
    
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

    function get_date(date:string|null):string {
        if(date == null) {return "";}
        const _date = new Date(date);
        let _temp = "";
        _temp += _getDate(_date) + "/";
        _temp += _getMonth(_date) + "/";
        _temp += _getFull_year(_date) + " ";
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

    function signupAllRequired() {
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

    function joinEvent(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        openModale(signupEvent({
            onOpen: () => {
                // CONTAINER
                let form = document.querySelector('#event-signup');
                let container = document.querySelector(".event-participate-modale-container");
                // MODALE CONTENT
                let salutation:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-salutation') : null;
                let salutation_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-salutation-status') : null;
                let firstname:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-firstname') : null;
                let firstname_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-firstname-status') : null;
                let surname:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-surname') : null;
                let surname_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-surname-status') : null;
                let email:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-email') : null;
                let email_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-email-status') : null;
                let contact_number:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-contact-number') : null;
                let contact_number_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-contact-number-status') : null;
                let speciality:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-speciality') : null;
                let speciality_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-speciality-status') : null;
                let clinic_name:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-clinic-name') : null;
                let clinic_name_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-clinic-name-status') : null;
                let clinic_location:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-clinic-location') : null;
                let clinic_location_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-clinic-location-status') : null;
                let is_doctor:HTMLElement|HTMLInputElement|null = typeof document != "undefined" ? document.getElementById('event-participate-is-doctor') : null;
                let is_doctor_status:HTMLSpanElement|null = typeof document != "undefined" ? document.getElementById('event-participate-is-doctor-status') : null;
                let button:HTMLElement|HTMLButtonElement|null = typeof document != "undefined" ? document.getElementById('event-participate-submit') : null;

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
                            elem.querySelector('input')?.setAttribute('required', 'true');
                        }
                        else if(elem instanceof HTMLElement) {
                            elem.style.setProperty('display', 'none');
                            elem.querySelector('input')?.removeAttribute('required');
                        }
                    });
                });

                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    closeModale();
                });
                
                // MODALE INPUT
                [
                    {input: salutation, status: salutation_status},
                    {input: firstname, status: firstname_status},
                    {input: surname, status: surname_status},
                    {input: speciality, status: speciality_status},
                    {input: clinic_name, status: clinic_name_status},
                    {input: clinic_location, status: clinic_location_status},
                    {input: email, status: email_status},
                    {input: contact_number, status: contact_number_status},
                    {input: is_doctor, status: is_doctor_status}
                ].forEach((duo) => {
                    duo.input && duo.input.addEventListener('keyup', (e) => {
                        _log(e);
                        if(e.key == "Enter") {
                            _log(1);
                            if(duo.input instanceof HTMLInputElement && duo.input.value != "" && duo.status) {
                                _log(2);
                                if(signupAllRequired())
                                {
                                    // TODO
                                    // saveSignup();
                                    closeModale();
                                }
                                // if(!verifyPassword(duo.input.value)) {
                                    _log(3);
                                //     duo.status.innerHTML = "Wrong password";
                                //    duo.status.style.setProperty('display', 'none');
                                // }
                            }
                            else if(duo.status instanceof HTMLSpanElement && duo.input instanceof HTMLInputElement && duo.input.required) {
                                _log(4);
                                duo.status.innerHTML = "Must enter datas";
                                duo.status.style.removeProperty('display');
                            }
                        }
                        else {
                            if(duo.input instanceof HTMLInputElement && duo.input.value != "") {
                                button && button.classList.add('able');
                                duo.status && duo.status.style.setProperty('display', 'none');
                            }
                            else {
                                button && button.classList.remove('able');
                            }
                        }
                    });
                });

                // MODALE BUTTON
                button && button.addEventListener('click', (e) => {
                    e.preventDefault();
                    _log(e);
                    _log(5);
                    if(signupAllRequired())
                    {
                        _log(6);
                        closeModale();
                        // if(!verifyPassword(duo.input.value)) {
                            _log(7);
                        //     duo.status.innerHTML = "Wrong password";
                        //    duo.status.style.setProperty('display', 'none');
                        // }
                    }
                    else {
                        _log(8);
                    }
                });

                salutation.focus();
            }
        }));
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
                    <div className={`top-card ${prop_key === 0 ? 'left' : 'left'}`} style={["Workshop", "Webinar"].indexOf(event.EventType ?? "") > -1 ? {} : {borderRadius: "13px 13px 13px 0"}}>
                        {event.EventType === "Conference" && "Conferences"}
                        {event.EventType === "Workshop" && "Workshops"}
                        {event.EventType === "Webinar" && (event.Addons || []).join(', ')}
                    </div>
                }
                {["Workshop", "Webinar"].indexOf(event.EventType ?? "") > -1 && <div className="event-signup" onClick={joinEvent}>
                    SIGN UP
                </div>}
            </div>
            <div className={`${event.id}-dates event-dates`}>
                {getDate(event.Start, event.End)}
            </div>
            <div className={`img-part ${prop_key === 0 ? 'right' : 'left'}`}>
                <img
                    className="event-pic"
                    src={event.Picture ? event.Picture.localFile.childImageSharp.fluid.srcWebp : images.getOne("footerLogo").childImageSharp.fluid.srcWebp}
                    srcSet={event.Picture ? event.Picture.localFile.childImageSharp.fluid.srcSetWebp : images.getOne("footerLogo").childImageSharp.fluid.srcSetWebp}
                    alt={`event-pic-'${event.EventName}`}
                />
            </div>
            <div
                className={`descr-part ${prop_key === 0 ? 'left' : 'right'} custom-scrollbar moz-scrollbar`}
                style={size.width > 760 ? {maxWidth: `calc((100% - (${event.Picture ? event.Picture.aspectRatio * 150 : (images.getOne("footerLogo")?.childImageSharp.fluid.aspectRatio || 1) * 150}px + 55px))`} : {}}
                // 15 du padding gauche, 15 du padding droit, 5 de la custom-scrollbar, 20 pour être sûr
            >
                <div className="title">
                    {event.EventName ?? "Incoming title"}
                </div>
                <div className="short_descr">
                    {event.EventDescription ?? "No information right now"}
                </div>
                {event.Start && <div className="dates">
                    {`${getDate(event.Start)}${event.End ? ` - ${getDate(event.End)}` : ''}`}
                </div>}
                {event.Address && <div className="address_link">
                    <a href={event.PlaceURL || "#"} target="_blank" rel="noreferrer" title="Place">{event.Address}</a>
                </div>}
                {event.Address && <div className="address">
                    {event.Address}
                </div>}
                {event.MapsLink && <div className="maps_location">
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