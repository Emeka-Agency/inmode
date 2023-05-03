import { Link } from "gatsby";
import React from "react";
var imageToGradient = require('image-to-gradient');
import { useArticle } from "../contexts/article-provider";
import { useImages } from "../contexts/images-provider";
import { ColorExtractor_Interface, InmodePanel_BlogArticle_Interface, InmodePanel_BlogArticleElement_Interface } from "../interfaces";

import { _log } from "../../functions/logger";

import "./index.css";
import { resolveImg, resolveImgSet } from "../../functions/tools";
import Video from "../Video";

const Article = ({id, customURL}:Article) => {

    if(id == null) {
        return <></>;
    }

    const articles = useArticle();
    const [article]:[InmodePanel_BlogArticle_Interface | null | undefined, React.Dispatch<InmodePanel_BlogArticle_Interface | null | undefined>] = React.useState(articles.find_in_articles(customURL ?? (id).toString()));
    const [mainPicColors, setMainPicColors]:[{hex:string, percent:number}[], React.Dispatch<{hex:string, percent:number}[]>] = React.useState([]);

    if(!article) {
        return <></>;
    }

    const [cssGradient, setCSSGradient]:[string, React.Dispatch<string>] = React.useState("");

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
            _url = _url.replace('watch?v=', 'embed/') + '?autoplay=1&amp;cc_load_policy=1&amp;color=turquoise&amp;controls=0&amp;disablekb=1&amp;autohide=1&amp;hl=en&amp;iv_load_policy=3&amp;loop=1&amp;modestbranding=1&amp;fs=1&amp;rel=0&amp;hd=1&amp;wmode=transparent&amp;enablejsapi=0&amp;html5=1';
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
                    src={resolveImg(image)}
                    srcSet={resolveImgSet(image)}
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
                        src={resolveImg(image)}
                        srcSet={resolveImgSet(image)}
                    />
                })}
            </div>
        );
    }

    React.useEffect(() => {
        if(typeof window != "undefined") {
            window.scrollTo(0, 0);
        }
        // if(article.Thumbnail) {
        //     imageToGradient(
        //         resolveImg(article.Thumbnail),
        //         {
        //             angle: 10,
        //             steps: 64
        //         },
        //         (err:any, gradient:string) => {
        //             if(err) {
        //                 _log(err);
        //                 return;
        //             }
        //             setCSSGradient(gradient);
        //         }
        //     );
        // }
    }, [article]);

    return (
        <div className="article container">
            <a className="back-to-articles" href="/blog" title="Go back to articles">
                <img
                    className="back-to-articles-icon"
                    src={images.resolve_img('arrowRightIcon')}
                    srcSet={images.resolve_img_set('arrowRightIcon')}
                    alt={article.Title}
                />
                <span className="back-to-articles-text">Articles</span>
            </a>
            <h1 className="article-title">{article.Title}</h1>
            <div className="article-main-pic" style={{background: cssGradient}}>
                {
                    article.VideoURL && !article.Thumbnail ?
                    (
                        <div className="article-list-elem-video">
                            <Video
                                video={{
                                    url: article.VideoURL,
                                    poster: `https://img.youtube.com/vi/${article.VideoURL.replace("https://www.youtube.com/watch?v=", "")}/maxresdefault.jpg`,
                                    poster_link: "external",
                                }}
                            />
                        </div> 
                    )
                    :
                    article.VideoURL && article.Thumbnail ?
                    (
                        <div className="article-list-elem-video">
                            <Video
                                video={{
                                    url: article.VideoURL,
                                    poster: article.Thumbnail,
                                    poster_link: "internal",
                                }}
                            />
                        </div> 
                    )
                    :
                    article.Thumbnail ?
                    (
                        article.Thumbnail.localFile.ext == ".gif" ?
                        <img
                            className="article-list-elem-thumbnail"
                            // style={{backgroundImage: `url("${resolveImg(article.Thumbnail)}")`}}
                            // title={article.Title}
                            src={resolveImg(article.Thumbnail)}
                            alt={article.Title}
                        // ></div>
                        />
                        :
                        <img
                            className="article-list-elem-thumbnail"
                            // style={{backgroundImage: `url("${resolveImg(article.Thumbnail)}")`}}
                            // title={article.Title}
                            src={resolveImg(article.Thumbnail)}
                            alt={article.Title}
                        // ></div>
                        />
                    )
                    :
                    (
                        article.VideoURL ?
                        // videoFrame(article.VideoURL)
                        <img
                            className="article-list-elem-thumbnail"
                            // style={{backgroundImage: `url(https://img.youtube.com/vi/${article.VideoURL.replace("https://www.youtube.com/watch?v=", "")}/maxresdefault.jpg`}}
                            // title={article.Title}
                            src={`https://img.youtube.com/vi/${article.VideoURL.replace("https://www.youtube.com/watch?v=", "")}/maxresdefault.jpg`}
                            alt={article.Title}
                        // ></div>
                        />
                        :
                        <img
                            className="article-list-elem-thumbnail default"
                            // style={{backgroundImage: `url(${images.resolve_img('learnIcon')})`}}
                            // title={article.Title}
                            src={images.resolve_img('learnIcon')}
                            alt={article.Title}
                        // ></div>
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