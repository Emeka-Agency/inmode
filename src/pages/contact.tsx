import React from "react";

import ContactForm from "../components/Contact/contact-form";
import GetInTouch from "../components/Contact/get-in-touch";
import ProfessionalContact from "../components/Contact/professional-contact";
import Layout from "../components/Layout"
import SEO from "../components/seo"

const ContactPage = () => {
    return (
      <Layout title="contact-us">
        <SEO title="Contact us"/>
        <GetInTouch from="contact-page"/>
        <ContactForm from="contact-page"/>
        <ProfessionalContact from="contact-page"/>
        <div className="divide-next"></div>
      </Layout>
    );
};

export default ContactPage;