import axios from 'axios';

export async function InstaPost():Promise<string[] | null> {
    var myHeaders = new Headers();
    myHeaders.append('Allow-Origin', '*');
    const fetch_get:RequestInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'no-cors',
        cache: 'default'
    };
    return fetch(
        'http://instagram.com/inmodeuk',
        {
            ...fetch_get
        }
    )
    .then((response:Insta_Response_Interface):string[] => {
        const photos:string[] = [];
        try {
            let _current:Insta_ThumbnailRessource_Interface | undefined;
            response.graphql.user.edge_owner_to_timeline_media.edges.forEach((edge:Insta_Edge_Interface, index) => {
                if(index >= 4) {
                    return null;
                }
                if (edge.node && edge.node.thumbnail_resources.length > 0) {
                    _current = edge.node.thumbnail_resources.pop();
                    _current != undefined && photos.push(_current.src);
                }
            });
            return photos.filter(e => e);
        }
        catch(err:any) {
            console.log(err);
            return [];
        }
    }).catch((err:any):null => {
        console.log(`\nCould not fetch instagram posts. Error status ${err}`);
        return null;
    });
}

export async function InstagramPosts(insta_id:string | number):Promise<string[] | null> {
    var myHeaders = new Headers();
    myHeaders.append('Allow-Origin', '*');
    const fetch_get:RequestInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'no-cors',
        cache: 'default'
    };
    // 1317505554
    return fetch(
        `https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${insta_id}","first":4,"after":null}`,
        {
            ...fetch_get
        }
    )
    .then((response:Insta_Response_Interface):string[] => {
        const photos:string[] = [];
        try {
            let _current:Insta_ThumbnailRessource_Interface | undefined;
            response.data.user.edge_owner_to_timeline_media.edges.forEach((edge:Insta_Edge_Interface) => {
                if (edge.node && edge.node.thumbnail_resources.length > 0) {
                    _current = edge.node.thumbnail_resources.pop();
                    _current != undefined && photos.push(_current.src);
                }
            });
            return photos.filter(e => e);
        }
        catch(err:any) {
            console.log(err);
            return [];
        }
    }).catch((err:any):null => {
        console.log(`\nCould not fetch instagram posts. Error status ${err}`);
        return null;
    });
}

export async function scrapingInstagramPosts(username:string | number) {
    return axios.get(`https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${username}","first":4,"after":null}`).then(response => {
        const photos = [];
        response.data.data.user.edge_owner_to_timeline_media.edges.forEach(edge => {
            if (edge.node) {
                photos.push(edge.node);
            }
        });
        console.log(photos);
        return photos;
    }).catch(err => {
        console.warn(`\nCould not fetch instagram posts. Error status ${err}`);
        return null;
    });
}

interface Insta_Response_Interface {
    data: {
        user: {
            edge_owner_to_timeline_media: {
                edges: Insta_Edge_Interface[];
            };
        };
    };
    graphql: {
        user: {
            edge_owner_to_timeline_media: {
                edges: Insta_Edge_Interface[];
            };
        };
    };
};

interface Insta_Edge_Interface {
    node: {
        id: string;
        __typename: string;
        edge_media_to_caption: {
            edges: [
                {
                    node: {
                        text: string;
                    };
                }
            ];
        };
        shortcode: string;
        edge_media_to_comment: {
            count: number;
        };
        comments_disabled: boolean;
        taken_at_timestamp: number;
        dimensions: {
            height: number;
            width: number;
        };
        display_url: string;
        edge_media_preview_like: {
            count: number;
        };
        owner: {
            id: number;
        };
        thumbnail_src: string;
        thumbnail_resources: Insta_ThumbnailRessource_Interface[];
        is_video: boolean;
        video_view_count: number;
    }
};

interface Insta_ThumbnailRessource_Interface {
    src: string;
    config_width: number;
    config_height: number;
};

// async function scrapingInstagramPosts({
//     username
// }) {
//     return axios.get(`https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${username}","first":100,"after":null}`).then(response => {
//         const photos = [];
//         response.data.data.user.edge_owner_to_timeline_media.edges.forEach(edge => {
//             if (edge.node) {
//                 photos.push(edge.node);
//             }
//         });
//         return photos;
//     }).catch(err => {
//         console.warn(`\nCould not fetch instagram posts. Error status ${err}`);
//         return null;
//     });
// }

// async function scrapingInstagramHashtags({
//     hashtag
// }) {
//     return axios.get(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1`).then(response => {
//         const photos = [];
//         response.data.graphql.hashtag.edge_hashtag_to_media.edges.forEach(edge => {
//             if (edge.node) {
//                 photos.push(edge.node);
//             }
//         });
//         return photos;
//     }).catch(err => {
//         console.warn(`\nCould not fetch instagram posts from hashtag. Error status ${err}`);
//         return null;
//     });
// }

// async function scrapingInstagramUser({
//     username
// }) {
//     return axios.get(`https://www.instagram.com/${username}/?__a=1`).then(response => {
//         const {
//             user
//         } = response.data.graphql;
//         const infos = {
//             id: user.id,
//             full_name: user.full_name,
//             biography: user.biography,
//             edge_followed_by: user.edge_followed_by,
//             edge_follow: user.edge_follow,
//             profile_pic_url: user.profile_pic_url,
//             profile_pic_url_hd: user.profile_pic_url_hd,
//             username: user.username
//         };
//         return infos;
//     }).catch(err => {
//         console.warn(`\nCould not fetch instagram user. Error status ${err}`);
//         return null;
//     });
// }

// function getHashtags(data) {
//     return data.map(datum => {
//         var _datum$caption, _ref, _datum$comments, _datum$comments$data, _ref2;

//         // matches non url hashtags
//         const hashtagMatch = /(^|\s)(#[a-z\d-_]+)/gi;
//         const caption = (_datum$caption = datum === null || datum === void 0 ? void 0 : datum.caption) !== null && _datum$caption !== void 0 ? _datum$caption : ``; // combine all comments into one string

//         const comments = ((_ref = ((_datum$comments = datum.comments) === null || _datum$comments === void 0 ? void 0 : (_datum$comments$data = _datum$comments.data) === null || _datum$comments$data === void 0 ? void 0 : _datum$comments$data.length) > 0) !== null && _ref !== void 0 ? _ref : false) ? datum.comments.data.map(comment => comment && comment.text ? comment.text : ``).filter(comment => comment && comment.length > 0).join(` `) : ``; // combine caption and comment strings, then run match

//         const captionHashtags = (caption + ` ` + comments).match(hashtagMatch);
//         const hashtags = ((_ref2 = (captionHashtags === null || captionHashtags === void 0 ? void 0 : captionHashtags.length) > 0) !== null && _ref2 !== void 0 ? _ref2 : false) ? // remove whitespace from beginning of each hashtag
//             captionHashtags.map(item => item.trim()) : [];
//         return {
//             ...datum,
//             // remove duplicate hashtags
//             hashtags: [...new Set(hashtags)]
//         };
//     });
// }

// async function apiInstagramPosts({
//     access_token,
//     instagram_id,
//     username,
//     paginate = `100`,
//     maxPosts,
//     hashtags = null
// }) {
//     var _hashtags$commentDept;

//     const hashtagsEnabled = hashtags === true || (hashtags === null || hashtags === void 0 ? void 0 : hashtags.enabled);
//     const hashtagsCommentDepth = (_hashtags$commentDept = hashtags === null || hashtags === void 0 ? void 0 : hashtags.commentDepth) !== null && _hashtags$commentDept !== void 0 ? _hashtags$commentDept : 3;
//     const commentsParam = hashtagsEnabled ? `,comments.limit(${hashtagsCommentDepth}){text}` : ``;
//     return axios.get(`https://graph.facebook.com/v7.0/${instagram_id}/media?fields=media_url,thumbnail_url,caption,media_type,like_count,shortcode,timestamp,comments_count,username,children{media_url},permalink${commentsParam}&limit=${paginate}&access_token=${access_token}`).then(async response => {
//         const results = [];
//         results.push(...response.data.data);
//         /**
//          * If maxPosts option specified, then check if there is a next field in the response data and the results' length <= maxPosts
//          * otherwise, fetch as more as it can.
//          */

//         while (maxPosts ? response.data.paging.next && results.length <= maxPosts : response.data.paging.next) {
//             response = await axios(response.data.paging.next);
//             results.push(...response.data.data);
//         } // if hashtags are true extract hashtags from captions and comments


//         const posts = hashtagsEnabled && results ? getHashtags(results) : results;
//         return maxPosts ? posts.slice(0, maxPosts) : posts;
//     }).catch(async err => {
//         console.warn(`\nCould not get instagram posts using the Graph API. Error status ${err}`);
//         console.warn(`Falling back to public scraping... with ${username}`);

//         if (username) {
//             const photos = await scrapingInstagramPosts({
//                 username
//             });
//             return photos;
//         }

//         return null;
//     });
// }