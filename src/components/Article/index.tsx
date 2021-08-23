import { Link } from "gatsby";
import React from "react";
import { useArticle } from "../contexts/article-provider";
import { useImages } from "../contexts/images-provider";
import { InmodePanel_BlogArticle_Interface, InmodePanel_BlogArticleElement_Interface } from "../interfaces";

import "./index.css";

const Article = ({id, customURL}:Article) => {

    if(id == null) {
        return <></>;
    }

    const articles = useArticle();
    const [article]:[InmodePanel_BlogArticle_Interface, React.Dispatch<InmodePanel_BlogArticle_Interface>] = React.useState(articles.articles[customURL || id]);

    if(!article) {
        return <></>;
    }

    const images = useImages();

    const renderArticleTextElement = (text:InmodePanel_BlogArticleElement_Interface["Text"]) => {
        if(!text) {
            return <></>;
        }

        if(text.type == "quote") {
            return (
                <blockquote className={`article-element-text ${text.type}`}>
                    {text.text}
                </blockquote>
            )
        }

        return (
            <div className={`article-element-text ${text.type}`}>
                {text.text}
            </div>
        );
    }

    const renderArticleImageElement = (image:InmodePanel_BlogArticleElement_Interface["Image"]) => {
        if(!image) {
            return <></>;
        }

        return (
            <div className="article-element-image">
                <img
                    src={image.childImageSharp ? image.childImageSharp.fluid.srcWebp ||image.publicURL : image.publicURL}
                    srcSet={image.childImageSharp ? image.childImageSharp.fluid.srcSetWebp ||image.publicURL : image.publicURL}
                />
            </div>
        );
    }

    return (
        <div className="article container">
            <a className="back-to-articles" href="/blog" title="Go back to articles">
                <img
                    className="back-to-articles-icon"
                    src={images.getOne('arrowRightIcon') && images.getOne('arrowRightIcon').childImageSharp.fluid.srcWebp}
                    srcSet={images.getOne('arrowRightIcon') && images.getOne('arrowRightIcon').childImageSharp.fluid.srcSetWebp}
                    alt={article.Title}
                />
                <span className="back-to-articles-text">Articles</span>
            </a>
            <h1 className="article-title">{article.Title}</h1>
            <div className="article-main-pic">
                {
                    article.Thumbnail ?
                    <img
                        className="article-list-elem-thumbnail"
                        src={article.Thumbnail.childImageSharp.fluid ? article.Thumbnail.childImageSharp.fluid.srcWebp : article.Thumbnail.publicURL}
                        srcSet={article.Thumbnail.childImageSharp.fluid ? article.Thumbnail.childImageSharp.fluid.srcSetWebp : article.Thumbnail.publicURL}
                        alt={article.Title}
                    />
                    :
                    <img
                        className="article-list-elem-thumbnail default"
                        src={images.getOne('learnIcon') && images.getOne('learnIcon').childImageSharp.fluid.srcWebp}
                        srcSet={images.getOne('learnIcon') && images.getOne('learnIcon').childImageSharp.fluid.srcSetWebp}
                        alt={article.Title}
                    />
                }
            </div>
            <div className="article-elements">
                {article.Element && article.Element.length && article.Element.map((element:InmodePanel_BlogArticleElement_Interface) => {
                    if(element.Text && element.Image) {
                        return (
                            <div className="article-element">
                                <div className="article-element-multiple-text">
                                    {renderArticleTextElement(element.Text)}
                                </div>
                                <div className="article-element-multiple-image">
                                    {renderArticleImageElement(element.Image)}
                                </div>
                            </div>
                        );
                    }
                    else if(element.Text) {
                        return (
                            <div className="article-element">
                                {renderArticleTextElement(element.Text)}
                            </div>
                        );
                    }
                    else if(element.Image) {
                        return (
                            <div className="article-element">
                                {renderArticleImageElement(element.Image)}
                            </div>
                        );
                    }
                    else {
                        return "";
                    }
                })}
            </div>
        </div>
    );
};

interface Article {
    id: number | string | null;
    customURL: string | null;
}

export default Article;