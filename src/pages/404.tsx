import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Unknown404 from "../components/404/unknown-404";

const NotFoundPage = () => {

  return (
    <Layout title="404">
      <SEO lang="fr" title="404"/>
      <Unknown404/>
      {/* <Slides from="404"/> */}
    </Layout>
  );
};

export default NotFoundPage