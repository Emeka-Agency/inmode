import React from "react";

import Layout from "../../components/Layout";
import SEO from "../../components/seo";

import EnvisionBanner from "../../components/Pages/Envision/Banner";
import EnvisionWhatIs from "../../components/Pages/Envision/WhatIs";
import EnvisionTechs from "../../components/Pages/Envision/Techs";
import EnvisionBeforeAfter from "../../components/Pages/Envision/BeforeAfter";
import ClinicalStudies from '../../components/Clinical/clinical-studies';

// EnvisionEnvisionBlack

const _Envision_Studies = [
    {
        addons_nolink: [
            {Name: "Forma-I",},
            {Name: "Lumecca-I",},
            {Name: "Morpheus8",},
        ],
        author: "MIVISION",
        picture: "EnvisionMivision",
        publication: "MiVision, The Ophtalmic Journal",
        published_date: "May 2023",
        title: "Radiofrequency DED Treatment May Expand Scope",
        url: "https://inmodemd.fr/public/studies/envision/Journal_Mivision_DEDEnvision_BD.pdf",
    },
    {
        addons_nolink: [
            {Name: "Forma-I",},
        ],
        author: "Sean Paul, Alex Cohen, Kami Parsa, Edward Jaccoma, Kim Burrell, Jean Carruthers",
        picture: "EnvisionOphtalmo",
        publication: "The Open Ophthalmology Journal",
        published_date: "February 2023",
        title: "Transcutaneous Radiofrequency-mediated Meibomian Gland Expression is an Effective Treatment for Dry Eye: A Prospective Cohort Trial",
        url: "https://inmodemd.fr/public/studies/envision/PeerRev_OJ_Envision_SPEnvisionFormaI_ACKPEJKBJC.pdf",
    }
];

const EnvisionPage = () => {
    
    return (
      <Layout title="envision">
        <SEO lang="fr" title="Envision"/>
        <EnvisionBanner/>
        <EnvisionWhatIs/>
        <EnvisionTechs/>
        <EnvisionBeforeAfter/>
        <ClinicalStudies variant={"envision-blue"} datas={_Envision_Studies}/>
      </Layout>
    );
};

export default EnvisionPage;