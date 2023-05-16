import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { _log } from "../../functions/logger";
import { InmodePanel_Testimonial_Interface } from "../interfaces";

import './index.css';

const Testimonial = ({ __testimonials = null }:Testimonial_Params) => {
    
    const [datas] = React.useState(useStaticQuery(graphql`
    {
        allStrapiTestimonial(sort: {fields: from}) {
          nodes {
            strapiId
            Name
            from
            Picture {
              localFile {
                publicURL
                childImageSharp {
                  fluid {
                    srcWebp
                    srcSetWebp
                    aspectRatio
                  }
                }
              }
            }
            Clinic
            Content
          }
        }
      }
      
    `).allStrapiTestimonial.nodes);

    if(!datas && !__testimonials) {
        return <></>;
    }

    const testimonials = __testimonials ?? [
        {
            testimonial: "“Thank you so much for today, thanks for always being such a huge support and friend to me”",
            name: "Elaine Ny Skin",
            clinic: "Clinic Aberdeen",
        },
        {
            testimonial: "“Congratulations on a great event, a good balance of speaker line up and really good turnout”",
            name: "Dr Rashpal",
            clinic: "Middlesborough",
        },
        {
            testimonial: "“Amazing idea to create this event, great suppliers, lots of innovations, iv seen you grow so much- so proud and thankyou for all your support”",
            name: "Sara Cheeney ",
            clinic: "Wrexham",
        },
        {
            testimonial: "“Thank you so much for having us, we were delighted be there, a great event well done”",
            name: "Valerie ",
            clinic: "The Delforge Group",
        },
    ];

    return (
        <section id="testimonials">
            <div id="testimonials-zone">
                <div id="testimonials-head">
                    <h2 id="testimonials-title">Testimonials</h2>
                </div>
                <ul
                    id="testimonials-list"
                    role="list"
                >
                    {testimonials.map((testimonial, key) => (
                        <li id="testimonial" key={key}>
                            <div id="testimonial-text">{testimonial.testimonial}</div>
                            <h3 id="testimonial-name">{testimonial.name}{testimonial.clinic && ', '}</h3>
                            <p id="testimonial-clinic">{testimonial.clinic}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
      )
};

interface Testimonial_Params {
    // datas: any;
    __testimonials?: {
        testimonial: string;
        name: string;
        clinic: string;
    }[] | null;
}

export default Testimonial;