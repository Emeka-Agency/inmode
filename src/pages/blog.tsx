import React from "react";

import Layout from "../components/Layout"
import SEO from "../components/seo"
import ArticleList from "../components/ArticleList"

const ArticlePage = ({  }:Articlepage_Interface) => {

    return (
      <Layout title="articles">
        <SEO title="Articles"/>
        <ArticleList/>
      </Layout>
    );
};

interface Articlepage_Interface {
    
};

export default ArticlePage;