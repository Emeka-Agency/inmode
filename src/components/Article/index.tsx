import { Link } from "gatsby";
import React from "react";
import { useArticle } from "../contexts/article-provider";
import { useImages } from "../contexts/images-provider";
import { InmodePanel_BlogArticle_Interface, InmodePanel_BlogArticleElement_Interface } from "../interfaces";

import { _log } from "../../functions/logger";

import "./index.css";

const Article = ({id, customURL}:Article) => {

    if(id == null) {
        return <></>;
    }

    const articles = useArticle();
    const [article]:[InmodePanel_BlogArticle_Interface | null | undefined, React.Dispatch<InmodePanel_BlogArticle_Interface | null | undefined>] = React.useState(articles.find_in_articles(customURL ?? (id).toString()));

    if(!article) {
        return <></>;
    }

    React.useEffect(() => {
        if(typeof window != "undefined") {
            resizeIFrame();
            window?.addEventListener('resize', resizeIFrame);
        }
    }, []);

    const resizeIFrame = () => {
        if(typeof document != "undefined") {
            Array.from(document.getElementsByClassName('article-element-video')).forEach((videoElem:HTMLElement) => {
                _log(videoElem);
                _log(`${videoElem.offsetWidth * (9/16)}px`);
                videoElem.style.setProperty('height', `${videoElem.offsetWidth * (9/16)}px`);
            });
            return true;
        }
        return false;
    }

    const videoFrame = (_url:string):JSX.Element => {
        if(_url.includes('youtube')) {
            _url = _url.replace('watch?v=', 'embed/') + '?autoplay=0&amp;&amp;autohide=1&amp;fs=1&amp;rel=0&amp;hd=1&amp;wmode=transparent&amp;enablejsapi=1&amp;html5=1';
        }
        else if(_url.includes('vimeo')) {
            _url = _url.replace('https://vimeo.com/', '//player.vimeo.com/video/') + '?autoplay=1&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1';
        }
        return (
            <iframe
                className="article-element-video"
                // allowFullScreen="allowfullscreen" 
                allowFullScreen={true} 
                allow="fullscreen" 
                src={_url} 
                scrolling="no"
                frameBorder={0}
            >
            </iframe>
        );
    };

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

        if(text.type == "video") {
            return videoFrame(text.text);
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
                    src={image.localFile.ext == '.gif' ? image.localFile.publicURL : image.localFile.childImageSharp ? image.localFile.childImageSharp.fluid.srcWebp || image.localFile.publicURL : image.localFile.publicURL}
                    srcSet={image.localFile.ext == '.gif' ? image.localFile.publicURL : image.localFile.childImageSharp ? image.localFile.childImageSharp.fluid.srcSetWebp || image.localFile.publicURL : image.localFile.publicURL}
                />
            </div>
        );
    }

    const renderArticleCarouselElement = (carousel:InmodePanel_BlogArticleElement_Interface["Carousel"]) => {
        if(!carousel) {
            return <></>;
        }

        return (
            <div className="article-element-carousel">
                {carousel.length && carousel.map((image, key) => {
                    <img
                        key={key}
                        src={image.localFile.ext == '.gif' ? image.localFile.publicURL : image.localFile.childImageSharp ? image.localFile.childImageSharp.fluid.srcWebp || image.localFile.publicURL : image.localFile.publicURL}
                        srcSet={image.localFile.ext == '.gif' ? image.localFile.publicURL : image.localFile.childImageSharp ? image.localFile.childImageSharp.fluid.srcSetWebp || image.localFile.publicURL : image.localFile.publicURL}
                    />
                })}
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
                    (
                        article.Thumbnail.localFile.ext == ".gif" ?
                        <img
                            className="article-list-elem-thumbnail"
                            src={article.Thumbnail.localFile.publicURL}
                            srcSet={article.Thumbnail.localFile.publicURL}
                            alt={article.Title}
                        />
                        :
                        <img
                            className="article-list-elem-thumbnail"
                            src={article.Thumbnail.localFile.childImageSharp.fluid ? article.Thumbnail.localFile.childImageSharp.fluid.srcWebp : article.Thumbnail.localFile.publicURL}
                            srcSet={article.Thumbnail.localFile.childImageSharp.fluid ? article.Thumbnail.localFile.childImageSharp.fluid.srcSetWebp : article.Thumbnail.localFile.publicURL}
                            alt={article.Title}
                        />
                    )
                    :
                    (
                        article.VideoURL ?
                        // videoFrame(article.VideoURL)
                        <img
                            className="article-list-elem-thumbnail"
                            src={`https://img.youtube.com/vi/${article.VideoURL.replace("https://www.youtube.com/watch?v=", "")}/maxresdefault.jpg`}
                            alt={article.Title}
                        />
                        :
                        <img
                            className="article-list-elem-thumbnail default"
                            src={images.getOne('learnIcon') && images.getOne('learnIcon').childImageSharp.fluid.srcWebp}
                            srcSet={images.getOne('learnIcon') && images.getOne('learnIcon').childImageSharp.fluid.srcSetWebp}
                            alt={article.Title}
                        />
                    )
                }
            </div>
            <div className="article-elements">
                {article.Element && article.Element.length && article.Element.map((element:InmodePanel_BlogArticleElement_Interface, key:number) => {
                    if(element.Text && element.Image && element.Carousel) {
                        return (
                            <div className="article-element" key={key}>
                                <div className="article-element-multiple-text">
                                    {renderArticleTextElement(element.Text)}
                                </div>
                                <div className="article-element-multiple-carousel">
                                    {renderArticleCarouselElement([element.Image, ...element.Carousel])}
                                </div>
                            </div>
                        );
                    }
                    else if(element.Text && element.Image) {
                        return (
                            <div className="article-element" key={key}>
                                <div className="article-element-multiple-text">
                                    {renderArticleTextElement(element.Text)}
                                </div>
                                <div className="article-element-multiple-image">
                                    {renderArticleImageElement(element.Image)}
                                </div>
                            </div>
                        );
                    }
                    else if(element.Text && element.Carousel) {
                        return (
                            <div className="article-element" key={key}>
                                <div className="article-element-multiple-text">
                                    {renderArticleTextElement(element.Text)}
                                </div>
                                <div className="article-element-multiple-carousel">
                                    {renderArticleCarouselElement(element.Carousel)}
                                </div>
                            </div>
                        );
                    }
                    else if(element.Text) {
                        return (
                            <div className="article-element" key={key}>
                                {renderArticleTextElement(element.Text)}
                            </div>
                        );
                    }
                    else if(element.Image && element.Carousel) {
                        return (
                            <div className="article-element" key={key}>
                                <div className="article-element-multiple-text">
                                    {renderArticleImageElement(element.Image)}
                                </div>
                                <div className="article-element-multiple-carousel">
                                    {renderArticleCarouselElement(element.Carousel)}
                                </div>
                            </div>
                        );
                    }
                    else if(element.Image) {
                        return (
                            <div className="article-element" key={key}>
                                {renderArticleImageElement(element.Image)}
                            </div>
                        );
                    }
                    else if(element.Carousel) {
                        return (
                            <div className="article-element" key={key}>
                                {renderArticleCarouselElement(element.Carousel)}
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
    customURL?: string;
}

export default Article;