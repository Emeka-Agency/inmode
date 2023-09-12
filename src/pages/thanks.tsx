import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Newsletter from "../components/newsletter";
import { get_url_search } from "../functions/tools";

const ContainerStyle = {
    padding: '40px 32px',
    'text-align': 'center',
    backgroundColor: 'var(--pearl)',
};

const ThanksStyle = {
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: '40px',
    marginBottom: '16px',
    color: 'var(--teal)',
};

const SubtextStyle = {
    fontSize: '16px',
    lineHeight: '24px',
    marginBottom: '16px',
    color: 'var(--midnight)',
};

const ThanksPage = (datas:ThanksPage) => {

    return (
        <Layout title="Thank you">
            <SEO title="Thank you"/>
            <section style={ContainerStyle}>
                <div>
                    <p style={ThanksStyle}>Thank you for your interest in InMode.</p>
                    <p style={SubtextStyle}>We have{get_url_search().a == 1 ? " already" : ""} received your request and will be in touch shortly.</p>
                </div>
            </section>
            <Newsletter/>
        </Layout>
    );
}

interface ThanksPage {
    a?: any;
};

export default ThanksPage;