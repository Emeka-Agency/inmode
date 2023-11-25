import { graphql } from "gatsby";
import React from "react";
import EventsLayout from "../../components/events/events-layout";
import { Airtable_Record_Interface, Airtable_Event_Interface, InmodePanel_Event_Interface } from "../../components/interfaces";
import Layout from "../../components/Layout";
import SEO from "../../components/seo";

import "../../components/events/events.css";
import { _group, _groupEnd, _log } from "../../functions/logger";
import { handlePromise } from "../../functions/tools";

const CongressPage = (datas:CongressPage) =>  {

    const [events, setEvents]:[Airtable_Event_Interface[]|[], React.Dispatch<Airtable_Event_Interface[]|[]>] = React.useState(Array());
    const [loading, setLoading]:[boolean, React.Dispatch<boolean>] = React.useState(true);

    const loadEvents = async function(__type:string|null = null) {
        await fetch(`${process.env.SYMF_BACK}/api/get-datas?type=events`)
        .then(p => handlePromise(p, "json"))
        .then((res:{status:string, datas:Airtable_Event_Interface[]}) => {
            if(res.datas.length == 0) {
                setLoading(false);
                return false;
            }
            else {
                setLoading(false);
                res.datas.forEach(event => {
                    if(!event.Start) return;
                    event.Start = [event.Start.slice(3, 5), event.Start.slice(0, 2), event.Start.slice(6)].join("/");
                });
                setEvents(
                    res.datas.filter(event => event.EventType == __type)
                    .filter(event => new Date(event.Start ?? "now").getTime() < new Date().getTime())
                    .map(event => {
                        if(!event.Start) return event;
                        event.Start = [event.Start.slice(3, 5), event.Start.slice(0, 2), event.Start.slice(6)].join("/");
                        return event;
                    })
                );
                return true;
            }
        })
        .catch(err => _log(err));
    }

    React.useEffect(() => {
        loading && loadEvents("Congres");
    }, [events]);

    return (
        <Layout title="congrès passés">
            <SEO lang="fr" title="Congrès passés"/>
            <EventsLayout
                loading={loading}
                current_page="congrès passés"
                events={events}
            />
        </Layout>
    );
};

interface CongressPage {
    
};

export default CongressPage;
