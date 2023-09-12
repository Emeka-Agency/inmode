import { graphql } from "gatsby";
import React from "react";
import EventsLayout from "../../components/events/events-layout";
import { Airtable_Event_Interface, InmodePanel_Event_Interface } from "../../components/interfaces";
import Layout from "../../components/Layout"
import SEO from "../../components/seo";

import "../../components/events/events.css";
import { _error, _group, _groupEnd, _log } from "../../functions/logger";
import { handlePromise } from "../../functions/tools";

const TradeshowsPage = (datas:TradeshowsPage) =>  {

    const [events, setEvents]:[Airtable_Event_Interface[]|[], React.Dispatch<Airtable_Event_Interface[]|[]>] = React.useState(Array());
    const [loading, setLoading]:[boolean, React.Dispatch<boolean>] = React.useState(true);

    const loadEvents = async function(__type:string|null = null) {
        await fetch(`${process.env.INMODE_BACK}/api/get-datas?type=events`)
        .then(p => handlePromise(p, "json"))
        .then((res:{status:string, datas:Airtable_Event_Interface[]}) => {
            if(res.datas.length == 0) {
                setLoading(false);
                return false;
            }
            else {
                setLoading(false);
                setEvents(res.datas.filter(event => event.EventType == __type));
                return true;
            }
        })
        .catch(err => {
            setLoading(false);
            _error(err);
        });
    }

    React.useEffect(() => {
        loading && loadEvents("Tradeshow");
    }, [events]);

    return (
        <Layout title="tradeshows">
            <SEO title="Tradeshows"/>
            <EventsLayout
                loading={loading}
                current_page="tradeshows"
                events={events}
            />
        </Layout>
    );
};

interface TradeshowsPage {
    
}

export default TradeshowsPage;
