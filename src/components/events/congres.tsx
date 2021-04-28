import React from "react";
import { InmodePanel_Event_Interface } from "../interfaces";

const Congres = ({ event = undefined }:Congres) => {

    if(event == undefined) {
        return <></>;
    }

    return (
        <div className="conference">
            <div className="img-part">
                <img
                    className="event-pic"
                    src={event.picture.childImageSharp.fluid.srcWebp}
                    srcSet={event.picture.childImageSharp.fluid.srcSetWebp}
                />
            </div>
            <div className="descr-part">
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
                    <a href={event.place_url || "#"} target="_blank" rel="noreferrer" title="Lieu">
                        {event.place}
                    </a>
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

interface Congres {
    event: InmodePanel_Event_Interface | undefined;
};

export default Congres;