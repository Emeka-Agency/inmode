import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import OurSpecialist from "../components/OurSpecialists";

const OurSpecialists = () => {

  return (
    <Layout title="our-specialists">
      <SEO title="our-specialists"/>
        <OurSpecialist/>
    </Layout>
  );
}

export default OurSpecialists