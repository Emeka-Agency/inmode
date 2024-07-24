import React from "react";
import { Link } from "gatsby";

import { useWindowSize } from "../../functions/window-size";
import InmodeEvent from "./event";
import NoEvents from "./no-events";
import { Airtable_Event_Interface, InmodePanel_Event_Interface } from "../interfaces";
import randomString from "../../functions/randString";
import LoadingGIF from "../LoadingGIF";
// import { useLocalStorage } from "../../functions/use-localstorage";
import "moment/min/locales.min";

const EventsLayout = ({ children, current_page, events = undefined, loading = false }:EventsLayout) =>
{

    // TODO localstorage cookie for last event saw vignette si jamais visité

    const fr = (_d?:string) => typeof _d == "string" ? `${_d.slice(3, 6)}${_d.slice(0, 3)}${_d.slice(6)}` : '';
    const ms = (_d?:string) => typeof _d == "string" ? new Date(fr(_d)).getTime() : Date.now();

    const past_events = (events:Airtable_Event_Interface[], sorted = false) => {
        if(sorted) {
            return events
            .filter(event => ms(event.Start) < ms())
            .sort((a, b) => ms(b.Start) - ms(a.Start));
        }
        return events.filter(event => ms(event.Start) < ms());
    }
    
    const incoming_events = (events:Airtable_Event_Interface[], sorted = false) => {
        if(sorted) {
            return events
            .filter(event => ms(event.Start) >= ms())
            .sort((a, b) => ms(a.Start) - ms(b.Start));
        }
        return events.filter(event => ms(event.Start) >= ms());
    }

    const accordion_width = 760;

    const size = useWindowSize();

    const tabs = [
        {
            'name': 'à venir',
            'url': '/events'
        },
        {
            'name': 'congrès',
            'url': '/events/congress'
        },
        {
            'name': 'workshops',
            'url': '/events/workshops'
        },
        {
            'name': 'webinars',
            'url': '/events/webinars'
        },
    ];

    const [maxHeight, setMaxHeight] = React.useState(0);
    const [openedAccordion, setOpenedAccordion] = React.useState(false);

    const resolveAccordion = (e:React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.currentTarget.classList.toggle('opened');
        var panel = e.currentTarget.nextElementSibling;
        if(!panel) {
            return <></>;
        }
        panel.classList.toggle('opened');
        if (maxHeight) {
            setMaxHeight(0);
        }
        else {
            panel.classList.contains("opened") && setMaxHeight(parseInt(`${panel.children.length * 60}px`));
        }
        setOpenedAccordion(true);
    }

    return (
        <div className="events-layout">
            <div className="main-container">
                <div className="tab-navigation transition">
                {size.width < accordion_width && tabs.map((tab, key)=> {
                    if(tab.name === current_page) {
                        return (
                            <span id="title-accordion" className="title-accordion title transition" onClick={(e)=>{resolveAccordion(e);}} key={key}>
                            {tab.name}
                            </span>
                        );
                    }
                    return <></>;
                })}
                <div id="accordion" className="accordion transition" style={{maxHeight: size.width < accordion_width ? openedAccordion ? maxHeight : 0 : 'unset', width: '100%'}}>
                        {tabs.map((tab, key) => {
                            if(tab.name !== current_page || size.width >= accordion_width) {
                                return (
                                    <Link className={`user-select-none tab-link${tab.name===current_page ? ' current' : '' }`} to={tab.url} key={key} title={tab.name}>
                                        {tab.name}
                                    </Link>
                                );
                            }
                        })}
                </div>
                </div>
                <div className="events-content">
                    {incoming_events(events ?? [], true).map((event, key) => {
                        let is_past = new Date(event?.Start || Date()) < new Date();
                        return (
                            <>
                                <InmodeEvent isPast={is_past} key={key} event={{...event, Start: fr(event.Start), End: fr(event.End)}} prop_key={key} current_page={current_page} givenId={randomString(8, true, false)}/>
                            </>
                        )
                    })}
                    {current_page != "upcoming events" && events && incoming_events(events).length > 0 && past_events(events, true).length > 0 && <hr className="events-past-divider"/>}
                    {current_page != "upcoming events" && past_events(events ?? [], true).map((event, key) => {
                        let is_past = new Date(event?.Start || Date()) < new Date();
                        return (
                            <>
                                <InmodeEvent isPast={is_past} key={key} event={{...event, Start: fr(event.Start), End: fr(event.End)}} prop_key={key} current_page={current_page} givenId={randomString(8, true, false)}/>
                            </>
                        )
                    })}
                    {(!events || (events && events.length == 0)) && loading == false && <NoEvents/>}
                    {(!events || (events && events.length == 0)) && loading == true && <LoadingGIF customStyle={{margin: "0 auto"}}/>}
                </div>
            </div>
        </div>
    );
};

interface EventsLayout {
    children?: React.ReactNode;
    loading: boolean;
    current_page: string;
    events?: Airtable_Event_Interface[];
};

export default EventsLayout;