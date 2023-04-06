import React from "react";
import { InmodePanel_Event_Interface } from "../interfaces";
import { resolveImg, resolveImgSet } from "../../functions/tools";

const Conferences = ({ event = undefined }:Conferences) => {

    if(event == undefined) {
        return <></>;
    }

    return (
        <div className="conference">
            <div className="img-part">
                <img
                    className="event-pic"
                    src={resolveImg(event.picture)}
                    srcSet={resolveImgSet(event.picture)}
                />
            </div>
            <div className="descr-part custom-scrollbar moz-scrollbar">
                {event.title && <div className="title">
                    {event.title}
                </div>}
                {event.short_descr && <div className="short_descr">
                    {event.short_descr}
                </div>}
                {event.begin && <div className="dates">
                    {`${event.begin}${event.finish ? ` - ${event.finish}` : ''}`}
                </div>}
                {event.place && <div className="address_link">
                    <a href={event.place_url || "#"} target="_blank" rel="noreferrer" title="Place">
                        {event.place}
                    </a>
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

interface Conferences {
    event: InmodePanel_Event_Interface | undefined;
};

export default Conferences;