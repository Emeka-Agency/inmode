import { graphql } from "gatsby";
import React from "react";
import EventsLayout from "../../components/events/events-layout";
import { Airtable_Event_Interface, InmodePanel_Event_Interface } from "../../components/interfaces";
import Layout from "../../components/Layout"
import SEO from "../../components/seo";

import "../../components/events/events.css";
import { _group, _groupEnd, _log } from "../../functions/logger";

const CongressPage = (datas:CongressPage) =>  {

    const [events, setEvents]:[Airtable_Event_Interface[]|[], React.Dispatch<Airtable_Event_Interface[]|[]>] = React.useState(Array());
    const [loading, setLoading]:[boolean, React.Dispatch<boolean>] = React.useState(true);

    const loadEvents = async function(offset:string|null = null, records:Airtable_Event_Interface[]|[] = [], __type:string|null = null) {
        const fields = ["EventName", "Start", "End", "Practitioner", "Address", "Place", "PlaceURL", "Addons", "EventType", "EventDescription", "MapsLink", "VideoURL", "Picture"];
        const sortCriteres = ['Start'];
        const sortDirections = ['desc'];
        const sortBy = Array(sortCriteres).map((el, index) => 
            `sort%5B0%5D%5Bfield%5D=${sortCriteres[index]}&sort%5B0%5D%5Bdirection%5D=${sortDirections[index] ?? 'desc'}`
        ).join('&');
        var filterBy = '';
        if(typeof __type == "string") {
            filterBy = `&filterByFormula={EventType}='${__type}'`;
        }
    
        _group(fields);
        _log(sortBy);
        _log(filterBy);
        _log(`${process.env.AIRTABLE_EVENTS}?${sortBy}&${fields.map(el => "fields%5B%5D="+el).join("&")}&maxRecords${offset == null ? '' : `&offset=${offset}`}${filterBy}`);
        _groupEnd();
        
        await fetch(
            `${process.env.AIRTABLE_EVENTS}?${sortBy}&${fields.map(el => "fields%5B%5D="+el).join("&")}&maxRecords${offset == null ? '' : `&offset=${offset}`}${filterBy}`,
            {headers: new Headers({"Authorization" : `Bearer ${process.env.AIRTABLE_KEY}`})}
        )
        .then(res => res.json())
        .then((res:{offset:string|null, records:{fields: Airtable_Event_Interface}[]}) => {
            _log(res.offset != undefined);
            _log(res.records.length == 0);
            if(res.records.length == 0) {
                setLoading(false);
                return false;
            }
            if(res.offset != undefined) {
                // let news = res.records.map(rec => rec.fields && rec.id ? {id: rec.id, ...rec.fields} : rec);
                // loadEvents(res.offset, [...records]);
                loadEvents(res.offset, records.concat(res.records.map(rec => rec.fields && rec.id ? {id: rec.id, ...rec.fields} : rec)));
                return true;
            }
            else {
                setLoading(false);
                setEvents(records.concat(res.records.map(rec => rec.fields && rec.id ? {id: rec.id, ...rec.fields} : rec)));
                return true;
            }
        })
        .catch(err => _log(err));
    }

    React.useEffect(() => {
        loading && loadEvents(null, [], "Congres");
    }, [events]);

    return (
        <Layout title="congrès">
            <SEO title="Congrès"/>
            <EventsLayout
                loading={loading}
                current_page="congrès"
                events={events}
            />
        </Layout>
    );
};

interface CongressPage {
    
}

export default CongressPage;
