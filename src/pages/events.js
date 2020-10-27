import { graphql } from "gatsby";
import React from "react"
import EventsLayout from "../components/events/events-layout";
import Layout from "../components/layout"

const EventsPage = ({ data }) =>  {
    return (
        <Layout>
            <EventsLayout
                current_page="upcoming events"
                events={data.allStrapiEvent.nodes}
            />
        </Layout>
    );
};

export default EventsPage;

export const query = graphql`
    {
        allStrapiEvent(sort: {order: DESC, fields: begin}) {
            nodes {
                address
                begin(formatString: "DD MMM. YY, HH:MM")
                finish(formatString: "DD MMM. YY, HH:MM")
                maps_link
                picture {
                    childImageSharp {
                        fluid {
                            srcWebp
                            srcSetWebp
                        }
                    }
                }
                place
                place_url
                short_descr
                title
                type
                video_url
                addons {
                    Name
                }
            }
        }
    }
`;

// TODO list
// faire un seul component event qui prenne key en param_tre pour afficher le premier élément différement (class right or left avec flex order 1 2)
// faire la requête pour les incoming et les pasts
//      - from now to last
//      - <hr/>
//      - from now to first