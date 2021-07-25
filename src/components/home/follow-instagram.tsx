import axios from "axios";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
// import { scrapingInstagramPosts } from "../../functions/instagram";
// import { InstagramPosts } from "../../functions/instagram";
import { InstaPost } from "../../functions/instagram";

const FollowInstagram = ({insta_id}:FollowInstagram) => {

    // const [datas] = React.useState(useStaticQuery(graphql`
    //     {
    //         allInstaNode(sort: {fields: timestamp, order: DESC}, limit: 4, filter: {username: {eq: "3114668836"}}) {
    //             edges {
    //                 node {
    //                     comments
    //                     likes
    //                     caption
    //                     localFile {
    //                         childImageSharp {
    //                             fluid {
    //                                 srcWebp
    //                                 srcSetWebp
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // `).allInstaNode.edges);

    const [datas] = React.useState(Object.values(useStaticQuery(graphql`
        {
            _1: file(relativePath: {eq: "insta/20210710/1.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
                publicURL
            }
            _2: file(relativePath: {eq: "insta/20210710/2.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
                publicURL
            }
            _3: file(relativePath: {eq: "insta/20210710/3.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
                publicURL
            }
            _4: file(relativePath: {eq: "insta/20210710/4.jpg"}) {
                childImageSharp {
                    fluid {
                        srcWebp
                        srcSetWebp
                    }
                }
                publicURL
            }
        }
    `)));

    return (
        <div className="follow-instagram">
            {/* <div className="container"> */}
                <h2>
                    <a href="http://instagram.com/inmodeuk" target="_blank" rel="noreferrer" title="Follow us on Instagram">
                        Follow us on Instagram
                    </a>
                </h2>
                <div className="wrapper">
                    {/* {datas && datas.map((post, key) => {
                        return(
                            <div key={key} className="elem">p
                                <img
                                    className="background-image"
                                    src={post.node.localFile.childImageSharp.fluid.srcWebp}
                                    srcSet={post.node.localFile.childImageSharp.fluid.srcSetWebp}
                                    alt={`insta-${key + 1}`}
                                />
                                <a href="https://www.instagram.com/inmodeaesthetics/" className="zone-link" target="_blank" rel="noreferrer" title="Suivez Inmode sur Instagram"></a>
                            </div>
                        );
                    })} */}
                    {datas && datas.map((post, key) => {
                        return(
                            <div key={key} className="elem">
                                <img
                                    className="background-image"
                                    src={post.childImageSharp.fluid.srcWebp}
                                    srcSet={post.childImageSharp.fluid.srcSetWebp}
                                    alt={`insta-${key + 1}`}
                                />
                                <a href="https://www.instagram.com/inmodeaesthetics/" className="zone-link" target="_blank" rel="noreferrer" title="Suivez Inmode sur Instagram"></a>
                            </div>
                        );
                    })}
                </div>
            {/* </div> */}
        </div>
    );
};

interface FollowInstagram {
    insta_id: string | number;
};

export default FollowInstagram;