import React from "react";
import { Link } from "gatsby";

import { useWindowSize } from "../../functions/window-size";
import InmodeEvent from "./event";
import NoEvents from "./no-events";
import { Airtable_Event_Interface, InmodePanel_Event_Interface } from "../interfaces";
import randomString from "../../functions/randString";
import LoadingGIF from "../LoadingGIF";
// import { useLocalStorage } from "../../functions/use-localstorage";

const EventsLayout = ({ children, current_page, events = undefined, loading = false }:EventsLayout) =>
{

   // TODO localstorage cookie for last event saw vignette si jamais visité

   const accordion_width = 760;

   const size = useWindowSize();

   const tabs = [
      {
         'name': 'upcoming events',
         'url': '/events'
      },
      {
         'name': 'conferences',
         'url': '/events/conferences'
      },
      {
         'name': 'workshops',
         'url': '/events/workshops'
      },
      {
         'name': 'webinars',
         'url': '/events/webinars'
      },
      {
         'name': 'tradeshows',
         'url': '/events/tradeshows'
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

   React.useEffect(() => {

   }, [loading]);

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
                                    <Link className={`tab-link${tab.name===current_page ? ' current' : '' }`} to={tab.url} key={key} title={tab.name}>
                                        {tab.name}
                                    </Link>
                                );
                            }
                        })}
                </div>
                </div>
                <div className="events-content">
                    {(events ?? []).filter(el => new Date(el.Start ?? Date.now()) >= new Date()).map((event, key) => {
                        let is_past = new Date(event?.Start || Date()) < new Date();
                        return (
                            <>
                                {document?.querySelector('.events-past-divider') == null && is_past && <div className="events-past-divider"></div>}
                                <InmodeEvent isPast={is_past} key={key} event={event} prop_key={key} current_page={current_page} givenId={randomString(8, true, false)}/>
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
}

export default EventsLayout;