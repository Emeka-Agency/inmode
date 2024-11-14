import React from "react";

import Layout from "../../components/Layout";
import SEO from "../../components/seo";
import ExoCoBioAwards from "../../components/Pages/ExoCoBio/Awards";
import ExoCoBioExosoms from "../../components/Pages/ExoCoBio/Exosoms";
import ExoCoBioWeAre from "../../components/Pages/ExoCoBio/WeAre";
import ExoCoBioFutureMedecine from "../../components/Pages/ExoCoBio/FutureMedecine";
import ExoCoBioBenefits from "../../components/Pages/ExoCoBio/Benefits";
import ExoCoBioRecommended from "../../components/Pages/ExoCoBio/Recommended";
import ExoCoBioTutorial from "../../components/Pages/ExoCoBio/Tutorial";
import ExoCoBioAscePlusSRLV from "../../components/Pages/ExoCoBio/AscePlusSRLV";
import ExoCoBioAscePlusHRLV from "../../components/Pages/ExoCoBio/AscePlusHRLV";
import ExoCoBioAscePlusIRLV from "../../components/Pages/ExoCoBio/AscePlusIRLV";
import ExoCoBioExoBalm from "../../components/Pages/ExoCoBio/ExoBalm";
import ExoCoBioAscePlusGel from "../../components/Pages/ExoCoBio/AscePlusGel";
import ExoCoBioKeyBenefits from "../../components/Pages/ExoCoBio/KeyBenefits";
import ExoCoBioProtocols from "../../components/Pages/ExoCoBio/Protocols";
import ExoCoBioTestimonials from "../../components/Pages/ExoCoBio/Testimonials";

const NotFoundPage = () => {

  return (
    <Layout title="ExoCoBio">
      <SEO lang="fr" title="ExoCoBio"/>
      <ExoCoBioAwards/>         {/* DONE */}
      <ExoCoBioExosoms/>        {/* DONE */}
      <ExoCoBioWeAre/>          {/* DONE */}
      <ExoCoBioFutureMedecine/> {/* CURRENT */}
      <ExoCoBioBenefits/>       {/* DONE */}
      <ExoCoBioRecommended/>    {/* DONE */}
      <ExoCoBioTutorial/>       {/* DONE */}
      <ExoCoBioAscePlusSRLV/>   {/* DONE */}
      <ExoCoBioAscePlusHRLV/>   {/* DONE */}
      <ExoCoBioAscePlusIRLV/>   {/* DONE */}
      <ExoCoBioExoBalm/>        {/* DONE */}
      <ExoCoBioAscePlusGel/>    {/* DONE */}
      <ExoCoBioKeyBenefits/>    {/* DONE */}
      <ExoCoBioProtocols/>      {/* DONE */}
      <ExoCoBioTestimonials/>   {/* DONE */}
    </Layout>
  );
};
// I
// difficultés pour payer

// II
//  - j'ai une autre question
//      -à l'attention du service des impôts de 13008, expliquer situation, demande délai de paiement
export default NotFoundPage