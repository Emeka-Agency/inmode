import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import ClinicalFinder from "../components/ClinicFinder";

const ClinicFinder = () => {

  return (
    <Layout title="clinic-finder">
      <SEO title="Clinic Finder"/>
      <ClinicalFinder/>
    </Layout>
  );
}

export default ClinicFinder