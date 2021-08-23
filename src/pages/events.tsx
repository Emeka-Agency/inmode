import React from "react";
import EventsLayout from "../components/events/events-layout";
import Layout from "../components/Layout"
import SEO from "../components/seo";

const EventsPage = ({ data }) =>  {

    return (
        <Layout title="events">
            <SEO title="Events"/>
            <EventsLayout
                current_page="upcoming events"
                upcoming_events={!data ? {} : data.incoming.nodes}
            />
        </Layout>
    );
};

export default EventsPage;

// export const query = graphql`
//     query EventsPage($today_string: Date!) {
//         incoming: allStrapiEvent(filter: {begin: {gte: $today_string}}, sort: {fields: begin, order: ASC}) {
//             nodes {
//                 address
//                 begin(formatString: "DD MMM. YY, HH:MM")
//                 finish(formatString: "DD MMM. YY, HH:MM")
//                 maps_link
//                 picture {
//                     childImageSharp {
//                         fluid {
//                             srcWebp
//                             srcSetWebp
//                         }
//                     }
//                 }
//                 place
//                 place_url
//                 short_descr
//                 title
//                 type
//                 video_url
//                 addons {
//                     Name
//                 }
//             }
//         }
//     }
// `;
