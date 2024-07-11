import React from "react";

import Layout from "../../components/Layout";
import SEO from "../../components/seo";

import IgniteRFBanner from "../../components/Pages/IgniteRF/Banner";
import IgniteRFWhatIs from "../../components/Pages/IgniteRF/WhatIs";
import IgniteRFTechs from "../../components/Pages/IgniteRF/Techs";
import IgniteRFBeforeAfter from "../../components/Pages/IgniteRF/BeforeAfter";

// IgniteRFIgniteRFBlack

const IgniteRFPage = () => {

    return (
      <Layout title="igniterf">
        <SEO lang="fr" title="IgniteRF"/>
        <IgniteRFBanner/>
        <IgniteRFWhatIs/>
        <IgniteRFTechs/>
        <IgniteRFBeforeAfter/>
      </Layout>
    );
};

export default IgniteRFPage;