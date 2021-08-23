import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Hero from "../components/home/hero";
import ClinicalStudies from "../components/home/clinical-studies";
import FollowInstagram from "../components/home/follow-instagram";
import Newsletter from "../components/newsletter";
import Slides from "../components/home/slides";
import Alveoles from "../components/home/alveoles";
import { useWindowSize } from "../functions/window-size";
import SlidesMini from "../components/home/slides-mini";
import OurSpecialist from "../components/OurSpecialists";
import { graphql, useStaticQuery } from "gatsby";

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
        {size.width > 999 ? <Slides from='home'/> : <SlidesMini from="home"/>}
        <Alveoles />
        <ClinicalStudies/>
        <OurSpecialist/>
        <FollowInstagram insta_id={instagram_id}/>
        <Newsletter />
      </Layout>
  );
}

export default IndexPage
