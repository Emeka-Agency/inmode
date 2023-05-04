import React from "react";

import GetStarted from "../components/get-started";
import Layout from "../components/Layout";
import SEO from "../components/seo";

import Banner from "../components/about-us/banner";
import AboutUs from "../components/about-us/about-us";
import Learn from "../components/about-us/learn";
import Staff from "../components/about-us/staff";

const AboutUsPage = () => {
    return (
      <Layout title="about-us">
        <SEO title="Notre histoire"/>
        <Banner from="about-us"/>
        <AboutUs from="about-us"/>
        <Learn from="about-us"/>
        <Staff from="about-us"/>
        <GetStarted/>
      </Layout>
    );
};

export default AboutUsPage;