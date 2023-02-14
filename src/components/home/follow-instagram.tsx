import axios from "axios";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
// import { scrapingInstagramPosts } from "../../functions/instagram";
// import { InstagramPosts } from "../../functions/instagram";
import { InstaPost } from "../../functions/instagram";
import { GatsbyImage_Interface } from "../interfaces";

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

    // const [datas]:[GatsbyImage_Interface[], React.Dispatch<GatsbyImage_Interface[]>] = React.useState(Object.values(useStaticQuery(graphql`
    //     {
    //         _1: file(relativePath: {eq: "instagram/1.jpg"}) {
    //             childImageSharp {
    //                 fluid {
    //                     srcWebp
    //                     srcSetWebp
    //                 }
    //             }
    //             publicURL
    //         }
    //         _2: file(relativePath: {eq: "instagram/2.jpg"}) {
    //             childImageSharp {
    //                 fluid {
    //                     srcWebp
    //                     srcSetWebp
    //                 }
    //             }
    //             publicURL
    //         }
    //         _3: file(relativePath: {eq: "instagram/3.jpg"}) {
    //             childImageSharp {
    //                 fluid {
    //                     srcWebp
    //                     srcSetWebp
    //                 }
    //             }
    //             publicURL
    //         }
    //         _4: file(relativePath: {eq: "instagram/4.jpg"}) {
    //             childImageSharp {
    //                 fluid {
    //                     srcWebp
    //                     srcSetWebp
    //                 }
    //             }
    //             publicURL
    //         }
    //     }
    // `)));

    return (
        <div className="follow-instagram">
            {/* <div className="container"> */}
                <h2>
                    <a href="https://www.instagram.com/inmode.france" target="_blank" rel="noreferrer" title="Suivez-nous sur Instagram">
                        Suivez nous sur Instagram
                    </a>
                </h2>
                <div className="wrapper">
                    {/* {datas && datas.map((post:{node : {localFile: GatsbyImage_Interface}}, key:number) => {
                        return(
                            <div key={key} className="elem">
                                <img
                                    className="background-image"
                                    src={post.node.localFile.childImageSharp?.fluid.srcWebp}
                                    srcSet={post.node.localFile.childImageSharp?.fluid.srcSetWebp}
                                    alt={`insta-${key + 1}`}
                                />
                                <a href="https://www.instagram.com/inmodeaesthetics/" className="zone-link" target="_blank" rel="noreferrer" title="Suivez Inmode sur Instagram"></a>
                            </div>
                        );
                    })} */}
                    {/* {datas && datas.map((post:GatsbyImage_Interface, key) => { */}
                    {[1, 2, 3, 4].map((index:number, key) => {
                        return(
                            <div key={key} className="elem">
                                <img
                                    className="background-image"
                                    // src={`https://back.infr2333.odns.fr/assets/instagram/${index}.jpg`}
                                    src={`https://back.inmode.emeka.fr/assets/instagram/${index}.jpg`}
                                    // src={post.childImageSharp?.fluid.srcWebp}
                                    // srcSet={post.childImageSharp?.fluid.srcSetWebp}
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