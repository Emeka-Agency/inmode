import React from "react";

const Workshop = ({ event = {} }) => {
    
    return (
        <div className="seminar">
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
                    <a href={event.place_url || "#"} target="_blank" rel="noreferrer">
                        {event.place}
                    </a>
                </div>}
                {event.address && <div className="address">
                    {event.address}
                </div>}
                {event.map_link && <div className="maps_location">
                    <a href={event.map_link || "#"} target="_blank" rel="noreferrer">+ Google Map</a>
                </div>}
            </div>
        </div>
    );
}

Workshop.propTypes = {

};

Workshop.defaultProps = {

};

export default Workshop;