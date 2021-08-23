import React from "react";
import { Link } from "gatsby";

import { useWindowSize } from "../../functions/window-size";
import InmodeEvent from "./event";
import NoEvents from "./no-events";
import { InmodePanel_Event_Interface } from "../interfaces";
// import { useLocalStorage } from "../../functions/use-localstorage";

const EventsLayout = ({ children = null, current_page, upcoming_events = undefined, past_events = undefined }:EventsLayout) => {

    // TODO localstorage cookie for last event saw vignette si jamais visité

    // const LocalStorage = useLocalStorage;
    // console.log(upcoming_events);

    // LocalStorage.getItem('last-event-visit') === null && LocalStorage.setItem('last-event-visit', );
    

    // const sortBy = (function(){
    //     if (typeof Object.defineProperty === 'function'){
    //       try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
    //     }
    //     if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
      
    //     function sb(f){
    //       for (var i=this.length;i;){
    //         var o = this[--i];
    //         this[i] = [].concat(f.call(o,o,i),o);
    //       }
    //       this.sort(function(a,b){
    //         for (var i=0,len=a.length;i<len;++i){
    //           if (a[i]!=b[i]) return a[i]>b[i]?-1:1;
    //         }
    //         return 0;
    //       });
    //       for (var i=this.length;i;){
    //         this[--i]=this[i][this[i].length-1];
    //       }
    //       return this;
    //     }
    //   })();
    
    const accordion_width = 760;

    const size = useWindowSize();

    const tabs = [
        {
            'name': 'upcoming events',
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
            return false;
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
                    {size.width < accordion_width && tabs.map((tab, key) => {
                        if(tab.name === current_page) {
                            return (
                                <span
                                    id="title-accordion"
                                    className="title-accordion title transition"
                                    onClick={(e) => {resolveAccordion(e);}}
                                    key={key}
                                >
                                    {tab.name}
                                </span>
                            );
                        }
                        return <></>;
                    })}
                    <div
                        id="accordion"
                        className="accordion transition"
                        style={{
                            maxHeight: size.width < accordion_width ? openedAccordion ? maxHeight : 0 : 'unset',
                            width: '100%'
                        }}
                    >
                        {tabs.map((tab, key) => {
                            if(tab.name !== current_page || size.width >= accordion_width) {
                                return (
                                    <Link
                                        className={`tab-link${tab.name === current_page ? ' current' : ''}`}
                                        to={tab.url}
                                        key={key}
                                        title={tab.name}
                                    >
                                        {tab.name}
                                    </Link>
                                );
                            }
                        })}
                    </div>
                </div>
                <div className="events-content">
                    {upcoming_events && upcoming_events.length > 0 && upcoming_events.map((event, key) => {
                        return (
                            <InmodeEvent key={key} event={event} prop_key={key} current_page={current_page}/>
                        )
                    })}
                    {(!upcoming_events || (upcoming_events && upcoming_events.length == 0)) && <NoEvents/>}
                    {past_events && past_events.length > 0 && past_events.map((event, key) => {
                        return (
                            <InmodeEvent key={key} event={event} prop_key={key + (upcoming_events ? upcoming_events.length : 0)} current_page={current_page}/>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

interface EventsLayout {
    children?: React.ReactNode;
    current_page: string;
    upcoming_events: InmodePanel_Event_Interface[] | undefined;
    past_events: InmodePanel_Event_Interface[] | undefined;
}

export default EventsLayout;