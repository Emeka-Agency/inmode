import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Hero from "../components/home/hero";
import ClinicalStudies from "../components/home/clinical-studies";
import WhyInmode from "../components/home/why-inmode";
import VideoTestimonials from "../components/home/video-testimonials";
import FollowInstagram from "../components/home/follow-instagram";
import Newsletter from "../components/newsletter";
import Slides from "../components/home/slides";
import Alveoles from "../components/home/alveoles";
import { useWindowSize } from "../functions/window-size";
import SlidesMini from "../components/home/slides-mini";
import OurSpecialist from "../components/OurSpecialists";
import AwardsSection from "../components/AwardsSection";
import { graphql, useStaticQuery } from "gatsby";
import ContactForm from "../components/contact/contact-form";

const IndexPage = () => {

  const [instagram_id]:[string | number, React.Dispatch<string | number>] = React.useState(useStaticQuery(
    graphql`
      {
          site {
              siteMetadata {
                  instagram_id
              }
          }
      }
    `
  ).site.siteMetadata.instagram_id);

  const size = useWindowSize();

  return (
      <Layout title="home">
        <SEO/>
        <Hero/>
        <WhyInmode/>
        {size.width > 999 ? <Slides from='home'/> : <SlidesMini from="home"/>}
        <Alveoles />
        {/* <ClinicalStudies/> */}
        <VideoTestimonials testimonials={[
            {
                name: "Dr Karim",
                type: "Practitioner",
                origin: "Morpheus8 workshop",
                url :"https://www.youtube.com/watch?v=3EADAqeaRik",
                poster: "https://i.ytimg.com/vi/3EADAqeaRik/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhfIGUoWDAP&rs=AOn4CLDSfHWVmVVQVT9SrqVEiOpQf3hVAQ"
            },
            {
                name: "Dr Ashana Guppa",
                type: "Pratictionner",
                origin: "Morpheus8 workshop",
                url :"https://www.youtube.com/watch?v=09fgqaayw2A",
                poster: "https://i.ytimg.com/vi/09fgqaayw2A/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIGUoZTAP&rs=AOn4CLBQ9RrVNqYbdrEAh1fI-kRrmCEutg"
            },
            {
                name: "Sara Cheeney",
                type: "Pure Perfection Clinic Director",
                origin: "InMode UK Symposium",
                url :"https://www.youtube.com/watch?v=Ss0A_Sjxa2w",
                poster: "https://i.ytimg.com/vi/Ss0A_Sjxa2w/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhjIGUoVzAP&rs=AOn4CLDTaFziA0j3bf5SfSeJKUyaiO1sAg"
            },
        ]}/>
        {/* <OurSpecialist/> */}
        <AwardsSection/>
        {/* <FollowInstagram insta_id={instagram_id}/> */}
        <Newsletter />
        {/* <ContactForm from="home"/> */}
      </Layout>
  );
}

export default IndexPage
