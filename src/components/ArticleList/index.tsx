import React from 'react';
import { Link } from "gatsby";

import { InmodePanel_BlogArticle_Interface } from "../interfaces";
import { useArticle } from "../contexts/article-provider";
import { useImages } from "../contexts/images-provider";

import "./index.css";
import { _log } from '../../functions/logger';
import { resolveImg, resolveImgSet } from '../../functions/tools';

const ArticleList = ({}:ArticleList) => {

    const articleProvider = useArticle();
    const images = useImages();

    const videoFrame = (_url:string):JSX.Element => {
        if(_url.includes('youtube')) {
            _url = _url.replace('watch?v=', 'embed/') + '?autoplay=0&amp;&amp;autohide=1&amp;fs=0&amp;rel=0&amp;hd=1&amp;wmode=transparent&amp;enablejsapi=0&amp;html5=1';
        }
        else if(_url.includes('vimeo')) {
            _url = _url.replace('https://vimeo.com/', '//player.vimeo.com/video/') + '?autoplay=0&hd=1&show_title=1&show_byline=1&show_portrait=0&fullscreen=1';
        }
        return (
            <iframe
                className="article-list-elem-video"
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

    return (
        <div className="article-list container">
            {articleProvider.articles && articleProvider.articles.map((article:InmodePanel_BlogArticle_Interface, key:number) => {
                _log(article);
                return (
                    <div className="article-list-elem" key={key}>
                        <a className="article-list-elem-link zone-link" href={articleProvider.articleLink(article)} title={article.Title}></a>
                        <div className={`article-list-elem-thumb-container ${article.Thumbnail ? 'thumbnail' : article.VideoURL ? 'video' : 'default'}`}>
                            {
                                article.Thumbnail ?
                                (
                                    article.Thumbnail.localFile.ext == ".gif" ?
                                    <img
                                        className="article-list-elem-thumbnail"
                                        src={resolveImg(article.Thumbnail)}
                                        srcSet={resolveImgSet(article.Thumbnail)}
                                        alt={article.Title}
                                    />
                                    :
                                    <img
                                        className="article-list-elem-thumbnail"
                                        src={resolveImg(article.Thumbnail)}
                                        srcSet={resolveImgSet(article.Thumbnail)}
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
                                        src={images.resolve_img('learnIcon')}
                                        srcSet={images.resolve_img_set('learnIcon')}
                                        alt={article.Title}
                                    />
                                )
                            }
                        </div>
                        {
                            article.Title
                            &&
                            <div className="article-list-elem-title">
                                {article.Title.substring(0, 30)}
                                {article.Title.length > 30 ? '...' : ''}
                            </div>
                        }
                        {
                            article.ShortDescr
                            &&
                            <div className="article-list-elem-short">
                                {article.ShortDescr.substring(0, 70)}
                                {article.ShortDescr.length > 70 ? '...' : ''}
                            </div>
                        }
                        <div className="article-list-elem-readtime">~ {Math.ceil(articleProvider.readTime(article)/60)} min read</div>
                    </div>
                )
            })}
        </div>
    );
};

interface ArticleList {

};

export default ArticleList;