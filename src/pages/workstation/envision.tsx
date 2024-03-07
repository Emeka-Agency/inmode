import React from "react";

import Layout from "../../components/Layout";
import SEO from "../../components/seo";

import EnvisionBanner from "../../components/Pages/Envision/Banner";
import EnvisionWhatIs from "../../components/Pages/Envision/WhatIs";
import EnvisionTechs from "../../components/Pages/Envision/Techs";
import EnvisionBeforeAfter from "../../components/Pages/Envision/BeforeAfter";

// EnvisionEnvisionBlack

const EnvisionPage = () => {

    return (
      <Layout title="envision">
        <SEO lang="fr" title="Envision"/>
        <EnvisionBanner/>
        <EnvisionWhatIs/>
        <EnvisionTechs/>
        <EnvisionBeforeAfter/>
      </Layout>
    );
};

export default EnvisionPage;