import React from "react";

const NoEvents = ({type}:NoEvents) => {
    return (
        <div className="no-events">
            Il n'y a actuellement aucun {type ?? "évènement"} à venir
        </div>
    );
};

interface NoEvents {
    type: string;
};

export default NoEvents;