import React from "react";
import EventsLayout from "../../components/events/events-layout";
import Layout from "../../components/Layout"
import SEO from "../../components/seo";

const WebinarsPage = ({ data }) =>  {
    return (
        <Layout title="webinars">
            <SEO title="Webinars"/>
            <EventsLayout
                current_page="webinars"
                upcoming_events={!data ? {} : data.incoming.nodes}
                // past_events={!data ? {} : data.past.nodes}
            />
        </Layout>
    );
};

export default WebinarsPage;

// export const query = graphql`
//     query WebinarsPage($today_string: Date!) {
//         incoming: allStrapiEvent(filter: {begin: {gte: $today_string}, type: {eq: "webinar"}}, sort: {fields: begin, order: ASC}) {
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
//         past: allStrapiEvent(filter: {begin: {lt: $today_string}, type: {eq: "webinar"}}, sort: {fields: begin, order: DESC}) {
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