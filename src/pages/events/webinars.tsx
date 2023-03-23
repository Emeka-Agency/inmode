import { graphql } from "gatsby";
import React from "react";
import EventsLayout from "../../components/events/events-layout";
import { InmodePanel_Event_Interface } from "../../components/interfaces";
import Layout from "../../components/Layout"
import SEO from "../../components/seo";

const WebinarsPage = ({ data }:WebinarsPage) =>  {
    return (
        <Layout title="webinars">
            <SEO title="Webinars"/>
            <EventsLayout
                current_page="webinars"
                upcoming_events={!data ? [] : data.incoming.nodes}
                // past_events={!data ? [] : data.past.nodes}
            />
        </Layout>
    );
};

interface WebinarsPage {
    data: {
        incoming: {
            nodes: InmodePanel_Event_Interface[],
        },
        past: {
            nodes: InmodePanel_Event_Interface[],
        },
    },
};

export default WebinarsPage;

export const query = graphql`
    query WebinarsPage($today_string: Date!) {
        incoming: allStrapiEvent(filter: {begin: {gte: $today_string}, type: {eq: "webinar"}}, sort: {fields: begin, order: ASC}) {
            nodes {
                address
                begin(formatString: "DD MMM. YY, HH:MM")
                finish(formatString: "DD MMM. YY, HH:MM")
                maps_link
                picture {
                    localFile {
                        childImageSharp {
                            fluid {
                                srcWebp
                                srcSetWebp
                            }
                        }
                    }
                }
                place
                short_descr
                title
                type
                video_url
            }
        }
    }
`;

    // past: allStrapiEvent(filter: {begin: {lt: $today_string}, type: {eq: "webinar"}}, sort: {fields: begin, order: DESC}) {
    //     nodes {
    //         address
    //         begin(formatString: "DD MMM. YY, HH:MM")
    //         finish(formatString: "DD MMM. YY, HH:MM")
    //         maps_link
    //         picture {
    //             localFile {
    //                 childImageSharp {
    //                     fluid {
    //                         srcWebp
    //                         srcSetWebp
    //                     }
    //                 }
    //             }
    //         }
    //         place
    //         place_url
    //         short_descr
    //         title
    //         type
    //         video_url
    //         addons {
    //             Name
    //         }
    //     }
    // }