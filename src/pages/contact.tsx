import React from "react";

import ContactForm from "../components/Contact/contact-form";
import ProfessionalContact from "../components/Contact/professional-contact";
import Layout from "../components/Layout"
import SEO from "../components/seo"

const ContactPage = () => {
    return (
      <Layout title="contact-us">
        <SEO title="Contact us"/>
        <ContactForm from="contact-page"/>
        <ProfessionalContact from="contact-page"/>
        <div className="divide-next"></div>
      </Layout>
    );
};

export default ContactPage;