import { graphql } from "gatsby";
import React from "react";
import { InmodePanel_BlogArticle_Interface } from "../components/interfaces";
import Article from "../components/Article";

import Layout from "../components/Layout"
import SEO from "../components/seo"

const BlogTemplates = ({ data }:BlogArticleTemplates) => {

    const [datas]:[InmodePanel_BlogArticle_Interface, React.Dispatch<InmodePanel_BlogArticle_Interface>] = React.useState(data.strapiArticle);

    return (
      <Layout title="article">
        <SEO title="Article"/>
        <Article id={datas.strapiId}/>
      </Layout>
    );
};

interface BlogArticleTemplates {
    data: {
        strapiArticle: InmodePanel_BlogArticle_Interface;
    };
};

export default BlogTemplates;

export const query = graphql`
    query BlogPress($id: String!) {
        strapiArticle(id: { eq: $id }) {
            strapiId
        }
    }
`;