import React, { ReactChild, useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { _sort_html_list, _sort_object } from '../../functions/sort';

import {
    hashString,
} from 'react-hash-string';

import '../interfaces';
import {
    InmodePanel_BlogArticle_Interface,
    BlogArticleContext_Interface,
    BlogArticle_Interface,
    InmodePanel_BlogArticleElement_Interface,
} from '../interfaces';
import ArticleContext from './article-context';
import { crc32 } from 'crc';

export const useArticle = ():BlogArticleContext_Interface => {
    return useContext(ArticleContext);
}

const ArticleProvider = ({ requested = "", children }:{requested:string, children:ReactChild}):React.Provider<BlogArticleContext_Interface> => {

    const [articles] = React.useState(
        useStaticQuery(graphql`
            {
                allStrapiArticle(sort: {fields: strapiId, order: DESC}) {
                    nodes {
                        strapiId
                        Title
                        Thumbnail {
                            localFile {
                                ext
                                publicURL
                                childImageSharp {
                                    fluid {
                                        srcWebp
                                        srcSetWebp
                                        aspectRatio
                                    }
                                }
                            }
                        }
                        ShortDescr
                        VideoURL
                        Element {
                            Text {
                                text
                                type
                            }
                            Image {
                                localFile {
                                    ext
                                    publicURL
                                    childImageSharp {
                                        fluid {
                                            srcWebp
                                            srcSetWebp
                                            aspectRatio
                                        }
                                    }
                                }
                            }
                        }
                        created_at
                        published_at
                        updated_at
                    }
                }
            }
        `).allStrapiArticle.nodes
    );

    const [articles_length]:[number, React.Dispatch<number>] = React.useState(articles.length);

    const article_base = (hashid:string, qnt:number):BlogArticle_Interface => {
        return {
            id: articles[hashid].strapiId,
            hashid: createHashid(articles[hashid].strapiId),
            ShortDescr: articles[hashid].ShortDescr,
            title: articles[hashid].Title,
            customUrl: articles[hashid].CustomUrl,
            content: articles[hashid].Content,
            Thumbnail: articles[hashid].Thumbnail,
            is_ref(hashid:string):boolean {return hashid === this.hashid;},
            // 'delete': (function() {
            //     // console.log("HARA KIRI KIRI !")
            //     delete this;
            // })
        };
    }

    const article_index = (hashid:string):number => {
        return articles.map((item:BlogArticle_Interface, key:number) => {
            return item.is_ref(hashid) ? key : 0;
        }).reduce((a:number, b:number) => {return a + b;});
    }

    const find_in_articles = (hashid:string):BlogArticle_Interface | undefined | null => {
        if(!hashid) {
            return null;
        }
        if(typeof hashid != 'string') {
            return null;
        }
        return articles[articleMap["/blog/" + (typeof hashid == "number" ? crc32((hashid).toString()).toString(16) : crc32(hashid).toString(16))]];
    }

    const nb_articles = ():number => {
        return articles_length;
    }

    const createHashid = (_id:string):string => {
        return hashString(_id).toString();
    };

    const readTime = (article:InmodePanel_BlogArticle_Interface):number => {
        if(article == null) {return 0;}
        if(article == null || article == undefined) {return 0;}
        if(article.Element == null || article.Element == undefined) {return 0;}
        if(article.Element.length == 0) {return 0;}
        let imgSeconds = article.Element.map((elem:InmodePanel_BlogArticleElement_Interface) => 
            elem.Image ? 5 : 0                                  // Each image counts for 5 seconds
        ).reduce((a:number, b:number) => a + b);
        return ((article.Element.map((elem:InmodePanel_BlogArticleElement_Interface) => 
            elem.Text ? elem.Text.text : null                   // Get text or null
        )
        .filter((str:any) => typeof str == "string")            // Remove nulls
        .join(' ')                                              // Join strings
        .replace('  ', ' ')                                     // Remove double spaces
        .split(/[,'’ \n]/).filter((elem:string) => elem != "")  // Cut the string in words
        .length) / 4) + imgSeconds;                                           // Get the seconds
        // 240 words per minute => 4 words per second => divide by 4 give the seconds
    };

    const articleLink = (article:InmodePanel_BlogArticle_Interface):string => {
        return "/blog/" + (typeof article.strapiId == "number" ? crc32((article.strapiId).toString()).toString(16) : crc32(article.strapiId).toString(16));
    };

    const [articleMap]:[Object, React.Dispatch<Object>] = React.useState(Object.fromEntries(articles.map((article:InmodePanel_BlogArticle_Interface, key:number) => {
        return [articleLink(article), key];
    })));

    return (
        <ArticleContext.Provider
            value={{
                articles: articles,
                article_index: article_index,
                find_in_articles: find_in_articles,
                nb_articles: nb_articles,
                readTime: readTime,
                articleLink: articleLink,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
}

export default ArticleProvider;

