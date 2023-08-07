import React, { MouseEventHandler } from "react";
import { useImages } from '../contexts/images-provider';
import { Airtable_Event_Interface, Airtable_Picture_Interface, InmodePanel_Addon_Interface, InmodePanel_Event_Interface } from "../interfaces";
import randomString from "../../functions/randString";
import { closeModale, openModale, signupEvent } from "../../functions/modale";
import { useWindowSize } from "../../functions/window-size";
import { _log } from "../../functions/logger";
import { getById, selectOne } from "../../functions/selectors";
import { resolveImg, resolveImgSet } from "../../functions/tools";

const InmodeEvent = ({ givenId = undefined, event = undefined, prop_key, current_page, isPast = false }:InmodeEvent) => {

    if(event === undefined) {
        return <></>;
    }
    
    const size = useWindowSize();

    function get_day(day:number):string {
        try {
            return ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'][day];
        }
        catch(err) {
            return 'inconnu';
        }
    }
    
    function get_month(month:number):string {
        try {
            return ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'][month]
        }
        catch(err) {
            return 'inconnu';
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
                    <div className={`user-select-none top-card ${prop_key === 0 ? 'left' : 'left'}`} style={["Workshop", "Webinar"].indexOf(event.EventType ?? "") > -1 ? {} : {borderRadius: "13px 13px 13px 0"}}>
                        {event.EventType === "Congres" && "Congrès"}
                        {event.EventType === "Workshop" && "Séminaire"}
                        {event.EventType === "Webinar" && (event.Addons || []).join(', ')}
                    </div>
                }
                {/* {["Workshop", "Webinar"].indexOf(event.EventType ?? "") > -1 && <div className="event-signup" onClick={e => join_event(e, event?.id)}>
                    SIGN UP
                </div>} */}
            </div>
            <div className={`${event.id}-dates event-dates user-select-none`}>
                {getDate(event.Start, event.End)}
            </div>
            <div className={`img-part ${prop_key === 0 ? 'right' : 'left'}`}>
                <img
                    className="event-pic user-select-none"
                    src={resolve_picture(event.Picture ? event.Picture[0] : undefined) || images.resolve_img("footerLogo")}
                    srcSet={resolve_picture(event.Picture ? event.Picture[0] : undefined) || images.resolve_img_set("footerLogo")}
                    alt={`event-pic-'${event.EventName}`}
                />
            </div>
            <div
                className={`event-title user-select-none ellipsis ${prop_key === 0 && current_page != "upcoming events" ? 'left' : 'right'}`}
                style={size.width > 760 ? {maxWidth: `calc((100% - (${event.Picture ? resolve_picture_ratio(event.Picture ? event.Picture[0] : undefined) * 150 : (images.get_one("footerLogo")?.childImageSharp.fluid.aspectRatio || 1) * 150}px + 60px))`} : {}}
                title={event.EventName ?? "Nom à venir"}
            >
                {event.EventName ?? "Nom à venir"}
            </div>
            <div
                className={`descr-part ${prop_key === 0 ? 'left' : 'right'} custom-scrollbar moz-scrollbar`}
                style={size.width > 760 ? {maxWidth: `calc((100% - (${event.Picture ? resolve_picture_ratio(event.Picture ? event.Picture[0] : undefined) * 150 : (images.get_one("footerLogo")?.childImageSharp.fluid.aspectRatio || 1) * 150}px + 60px))`} : {}}
                // 15 du padding gauche, 15 du padding droit, 5 de la custom-scrollbar, 20 pour être sûr
            >
                <div className="short_descr user-select-none">
                    {event.EventDescription ?? "Aucune information actuellement"}
                </div>
                {event.Start && <div className="dates user-select-none">
                    {`${getDate(event.Start)}${event.End ? ` - ${getDate(event.End)}` : ''}`}
                </div>}
                {event.Address && <div className="address_link user-select-none">
                    <a href={event.PlaceURL || "#"} target="_blank" rel="noreferrer" title="Place">{event.Address}</a>
                </div>}
                {event.Address && <div className="address user-select-none">
                    {event.Address}
                </div>}
                {event.MapsLink && <div className="maps_location user-select-none">
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
};

export default InmodeEvent;