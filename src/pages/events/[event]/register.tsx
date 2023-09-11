// event parameter available to the page query as $event_id (e.g. $event_id: String!)
import { graphql } from "gatsby";
import React from "react";
import { Airtable_Event_Interface } from "../../../components/interfaces";
import EventRegister from "../../../components/EventRegister";
import ImagesProvider from "../../../components/contexts/images-provider";
import SEO from "../../../components/seo";

const EventRegisterPage = (datas:EventRegisterPage) =>  {

    const [event, setEvent]:[Airtable_Event_Interface|undefined, React.Dispatch<Airtable_Event_Interface|undefined>] = React.useState();
    const [loading, setLoading]:[boolean, React.Dispatch<boolean>] = React.useState(true);

    const loadEvent = async function(offset:string|null = null, records:Airtable_Event_Interface[]|[] = [], __type:string|null = null) {
        await fetch(
            `${process.env.AIRTABLE_EVENTS}?filterByFormula=AND({Slug}="${datas.event}")`,
            {headers: new Headers({"Authorization" : `Bearer ${process.env.AIRTABLE_KEY}`})}
        )
        .then(res => res.json())
        .then((res:{records: {id: string, fields: Airtable_Event_Interface}[]}) => {
            if(res.records.length == 0) {
                setLoading(false);
                return false;
            }
            setLoading(false);
            setEvent({...res.records[0].fields, id: res.records[0].id});
        })
        .catch(err => console.log(err));
    }

    React.useEffect(() => {
        
    }, [event]);

    React.useEffect(() => {
        if(datas.event != undefined) {
            loadEvent(datas.event);
        }
    }, []);

    function searchConsole() {
        if(typeof window == "undefined") {
            return false;
        }
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-JFS1WVR7JQ');
    }

    return (
        <ImagesProvider>
            <noscript>
                <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WVWLZ2L" height="0" width="0" style={{display: "none", visibility: "hidden"}}>
                </iframe>
            </noscript>
            {/* // <!-- End Google Tag Manager (noscript) --> */}
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Muli" />

            {/* <!-- Google tag (gtag.js) --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-JFS1WVR7JQ"></script>
            <script>{searchConsole()}</script>
            {/* <!-- End Google tag (gtag.js) --> */}
            {/* <!-- LEAD FORENSICS --> */}
            <noscript><img alt="" src="https://secure.intelligentdataintuition.com/780395.png" style={{display:"none"}}/></noscript>
            {/* <!-- End LEAD FORENSICS --> */}
            <SEO forceTitle={event ? `${event.EventName} - Register` : "Event Register"}/>
            <EventRegister event={event} loading={loading}/>
        </ImagesProvider>
    );
};

interface EventRegisterPage {
    event: string;
}

export default EventRegisterPage;