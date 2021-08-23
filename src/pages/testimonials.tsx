import React from "react";

import { useTestimonial } from "../components/contexts/testimonial-provider";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Testimonial from "../components/Testimonial";
import OnProductTestimonial from "../components/Testimonial/product";
import { graphql, useStaticQuery } from "gatsby";

const TestimonialsPage = () => {

    const [presentation] = React.useState(useStaticQuery(graphql`
        {
            allStrapiTestimonial(filter: {from: {eq: "practitioner"}}, limit: 1) {
                nodes {
                    strapiId
                    Name
                    from
                    Picture {
                        publicURL
                        childImageSharp {
                            fluid {
                                srcWebp
                                srcSetWebp
                            }
                        }
                    }
                    Clinic
                    Content
                }
            }
        }
    `).allStrapiTestimonial.nodes[0]);

    const testimonials = useTestimonial();

    return (
      <Layout from="testimonials">
        <SEO title="Testimonials"/>
        {/* {testimonials && testimonials.testimonials && testimonials.testimonials.map(testimonial => <Testimonial datas={testimonial}/>)} */}
        <Testimonial/>
        {presentation && <OnProductTestimonial datas={presentation}/>}
      </Layout>
    );
};

export default TestimonialsPage;