import React from "react";
import { InmodePanel_Addon_Interface, InmodePanel_Event_Interface } from "../interfaces";

const InmodeEvent = ({ event = undefined, prop_key, current_page }:InmodeEvent) => {

    if(event === undefined) {
        return <></>;
    }

    const has_card = current_page === "upcoming events" || event.type === "webinar";

    return (
        <div className={`inmode-event ${event.type}${has_card ? ' has_card' : ''}`}>
            {has_card && <div className={`top-card ${prop_key === 0 ? 'left' : 'left'}`}>
                {event.type === "conference" && "Conferences"}
                {event.type === "workshop" && "Workshops"}
                {event.type === "webinar" && event.addons.map((addon:InmodePanel_Addon_Interface) => addon.Name).join(', ')}
            </div>}
            <div className={`img-part ${prop_key === 0 ? 'right' : 'left'}`}>
                <img
                    className="event-pic"
                    src={event.picture.localFile.childImageSharp.fluid.srcWebp}
                    srcSet={event.picture.localFile.childImageSharp.fluid.srcSetWebp}
                    alt={`event-pic-'${event.title}`}
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
                    <a href={event.place_url || "#"} target="_blank" rel="noreferrer" title="Place">{event.place}</a>
                </div>}
                {event.address && <div className="address">
                    {event.address}
                </div>}
                {event.maps_link && <div className="maps_location">
                    <a href={event.maps_link || "#"} target="_blank" rel="noreferrer" title="Google Maps localization">+ Google Maps</a>
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