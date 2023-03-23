import React from "react";
import { InmodePanel_Addon_Interface, InmodePanel_Event_Interface } from "../interfaces";
import { resolveImg, resolveImgSet } from "../../functions/tools";

const InmodeEvent = ({ event = undefined, prop_key, current_page }:InmodeEvent) => {

    if(event === undefined) {
        return <></>;
    }

    const has_card = current_page === "upcoming events" || event.type === "webinar";

    return (
        <div className={`inmode-event ${event.type}${has_card ? ' has_card' : ''}`}>
            {has_card && <div className={`top-card ${prop_key === 0 ? 'left' : 'left'}`}>
                {event.type === "congres" && "Congrès"}
                {event.type === "workshop" && "Séminaire"}
                {event.type === "webinar" && event.addons.map((addon:InmodePanel_Addon_Interface) => addon.Name).join(', ')}
            </div>}
            <div className={`img-part ${prop_key === 0 ? 'right' : 'left'}`}>
                <img
                    className="event-pic"
                    src={resolveImg(event.Picture) || images.resolve_img("footerLogo")}
                    srcSet={resolveImgSet(event.Picture) || images.resolve_img_set("footerLogo")}
                    alt={`event-pic-'${event.EventName}`}
                />
            </div>
            <div className={`descr-part ${prop_key === 0 ? 'left' : 'right'}`}>
                <div className="title">
                    {event.title}
                </div>
                <div className="short_descr">
                    {event.short_descr}
                </div>
                {event.begin && <div className="dates">
                    {`${event.begin}${event.finish ? ` - ${event.finish}` : ''}`}
                </div>}
                {event.place && <div className="address_link">
                    <a href={event.place_url || "#"} target="_blank" rel="noreferrer" title="Lieu">{event.place}</a>
                </div>}
                {event.address && <div className="address">
                    {event.address}
                </div>}
                {event.maps_link && <div className="maps_location">
                    <a href={event.maps_link || "#"} target="_blank" rel="noreferrer" title="Localisation Google Maps">+ Google Map</a>
                </div>}
            </div>
        </div>
    );
};

interface InmodeEvent {
    event: InmodePanel_Event_Interface | undefined;
    prop_key: string | number;
    current_page: string;
}

export default InmodeEvent;