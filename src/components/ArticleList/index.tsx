import React from 'react';
import { Link } from "gatsby";

import { InmodePanel_BlogArticle_Interface } from "../interfaces";
import { useArticle } from "../contexts/article-provider";
import { useImages } from "../contexts/images-provider";

import "./index.css";

const ArticleList = ({}:ArticleList) => {

    const articleProvider = useArticle();
    const images = useImages();

    return (
        <div className="article-list container">
            {articleProvider.articles && Object.keys(articleProvider.articles).map((key:string) => {
                return (
                    <div className="article-list-elem">
                        <a className="article-list-elem-link zone-link" href={(`/blog/${key}`).replace('//', '/')} title={articleProvider.articles[key].Title}></a>
                        <div className="article-list-elem-thumb-container">
                            {
                                articleProvider.articles[key].Thumbnail ?
                                <img
                                    className="article-list-elem-thumbnail"
                                    src={articleProvider.articles[key].Thumbnail.childImageSharp.fluid ? articleProvider.articles[key].Thumbnail.childImageSharp.fluid.srcWebp : articleProvider.articles[key].Thumbnail.publicURL}
                                    srcSet={articleProvider.articles[key].Thumbnail.childImageSharp.fluid ? articleProvider.articles[key].Thumbnail.childImageSharp.fluid.srcSetWebp : articleProvider.articles[key].Thumbnail.publicURL}
                                    alt={articleProvider.articles[key].Title}
                                />
                                :
                                <img
                                    className="article-list-elem-thumbnail default"
                                    src={images.getOne('learnIcon') && images.getOne('learnIcon').childImageSharp.fluid.srcWebp}
                                    srcSet={images.getOne('learnIcon') && images.getOne('learnIcon').childImageSharp.fluid.srcSetWebp}
                                    alt={articleProvider.articles[key].Title}
                                />
                            }
                        </div>
                        {
                            articleProvider.articles[key].Title
                            &&
                            <div className="article-list-elem-title">
                                {articleProvider.articles[key].Title.substring(0, 30)}
                                {articleProvider.articles[key].Title.length > 30 ? '...' : ''}
                            </div>
                        }
                        {
                            articleProvider.articles[key].ShortDescr
                            &&
                            <div className="article-list-elem-short">
                                {articleProvider.articles[key].ShortDescr.substring(0, 70)}
                                {articleProvider.articles[key].ShortDescr.length > 70 ? '...' : ''}
                            </div>
                        }
                        <div className="article-list-elem-readtime">~ {Math.ceil(articleProvider.readTime(key)/60)} min read</div>
                    </div>
                )
            })}
        </div>
    );
};

interface ArticleList {

};

export default ArticleList;