const active_env = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
    path: `.env.${active_env}`,
    // path: `.env.${process.env.NODE_ENV}`,
    // path: `.env`,
});

console.log('STRAPI_URL : ' + process.env.STRAPI_URL);
console.log('INMODE_BACK : ' + process.env.INMODE_BACK);
console.log('URL_SUCCESS : ' + process.env.URL_SUCCESS);
console.log('URL_CANCEL : ' + process.env.URL_CANCEL);
console.log('URL_REFUSED : ' + process.env.URL_REFUSED);
console.log('URL_ERROR : ' + process.env.URL_ERROR);
console.log('URL_ORDER_CREATE : ' + process.env.URL_ORDER_CREATE);
console.log('URL_ORDER_LOAD : ' + process.env.URL_ORDER_LOAD);
console.log('URL_ORDER_CANCEL : ' + process.env.URL_ORDER_CANCEL);
console.log('URL_ORDER_SIGNATURE : ' + process.env.URL_ORDER_SIGNATURE);
console.log('CLIENT_KEY : ' + process.env.CLIENT_KEY);
console.log('SECRET_KEY : ' + process.env.SECRET_KEY);
console.log('WP_DOMAIN : ' + process.env.WP_DOMAIN);
console.log('WP_URL : ' + process.env.WP_URL);
console.log('WP_USER : ' + process.env.WP_USER);
console.log('WP_PASS : ' + process.env.WP_PASS);

module.exports = {
    siteMetadata: {
        description: `InMode offers cutting edge medical devices for minimally-invasive & non-invasive procedures that provide amazing results for the patient and the practice.`,
        robots: `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`,
        og_locale: `fr_FR`,
        og_type: `website`,
        og_title: `InMode offers cutting edge medical devices for minimally-invasive & non-invasive procedures that provide amazing results for the patient and the practice.`,
        og_description: `InMode offers cutting edge medical devices for minimally-invasive & non-invasive procedures that provide amazing results for the patient and the practice.`,
        og_image: ``,
        og_url: `https://inmodemd.fr/`,
        og_site_name: `InModeMD FR`,
        twitter_card: `summary_large_image`,
        twitter_title: `InMode offers cutting edge medical devices for minimally-invasive & non-invasive procedures that provide amazing results for the patient and the practice.`,
        twitter_description: `InMode offers cutting edge medical devices for minimally-invasive & non-invasive procedures that provide amazing results for the patient and the practice.`,
        twitter_site: `@InModeMD_FR`,
        twitter_image: ``,
        twitter_creator: `@InModeMD_FR`,
        msapplication_TileImage: ``,
        shop_id: `${process.env.SHOP_ID}`,
        url_success: `${process.env.URL_SUCCESS}`,
        url_cancel: `${process.env.URL_CANCEL}`,
        url_refused: `${process.env.URL_REFUSED}`,
        url_error: `${process.env.URL_ERROR}`,
        url_order_create: `${process.env.URL_ORDER_CREATE}`,
        url_order_load: `${process.env.URL_ORDER_LOAD}`,
        url_order_cancel: `${process.env.URL_ORDER_CANCEL}`,
        url_order_signature: `${process.env.URL_ORDER_SIGNATURE}`,
        instagram_id: `${process.env.INSTA_ID}`,
        siteUrl: `https://inmodemd.fr`,
    },
    plugins: [
        // '@typescript-eslint/eslint-plugin',
        // 'react',
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                output: `/sitemap.xml`,
            }
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: "gatsby-plugin-anchor-links",
            options: {
                offset: -100
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: 'src/images/favicon.png',
            },
        },
        {
            resolve: "@pasdo501/gatsby-source-woocommerce",
            options: {
                // Base URL of WordPress site
                api: `shopinfr.emeka.fr`,
                // true if using https. false otherwise.
                https: true,
                api_version: 'wc/v3',
                encoding: 'utf8',
                api_keys: {
                    consumer_key: `${process.env.CLIENT_KEY}`,
                    consumer_secret: `${process.env.SECRET_KEY}`,
                },
                // Array of strings with fields you'd like to create nodes for...
                fields: ['products'],
            }
        },
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: `${process.env.STRAPI_URL}`,
                // apiURL: `https://inmode-content.emeka.fr`,
                collectionTypes: [ // List of the Collection Types you want to be able to request from Gatsby.
                    `addon`,
                    `product`,
                    `tag`,
                    `tag-family`,
                    `treatment`,
                    `menu`,
                    `shop`,
                    `event`,
                ],
                singleTypes: [
                    `footer`,
                    `about-us`,
                    `professional-contact`,
                    `hero-header`,
                    `seo-meta`
                ],
                queryLimit: 10000,
                loginData: {
                    identifier: process.env.STRAPI_ID,
                    password: process.env.STRAPI_PASS
                }
            },
        },
        // {
        //     resolve: "gatsby-source-wordpress",
        //     options: {
        //         url: `${process.env.WP_DOMAIN}`,
        //         baseUrl: `${process.env.WP_URL}`,
        //         protocol: "https",
        //         hostingWPCOM: false,
        //         useACF: true,
        //         acfOptionPageIds: [],
        //         auth: {
        //             htaccess_user: `${process.env.WP_USER}`,
        //             htaccess_pass: `${process.env.WP_PASS}`,
        //             htaccess_sendImmediately: false,
        //         },
        //         // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        //         // It can help you debug specific API Endpoints problems.
        //         verboseOutput: true,
        //         // Set how many pages are retrieved per API request.
        //         perPage: 100,
        //         // Set how many simultaneous requests are sent at once.
        //         concurrentRequests: 10,
        //         // Set WP REST API routes whitelists
        //         // and blacklists using glob patterns.
        //         // Defaults to whitelist the routes shown
        //         // in the example below.
        //         // See: https://github.com/isaacs/minimatch
        //         // Example:  `["/*/*/comments", "/yoast/**"]`
        //         // ` will either include or exclude routes ending in `comments` and
        //         // all routes that begin with `yoast` from fetch.
        //         // Whitelisted routes using glob patterns
        //         includedRoutes: [
        //             "**/categories",
        //             "**/posts",
        //             "**/pages",
        //             "**/media",
        //             "**/tags",
        //             "**/taxonomies",
        //             "**/users",
        //             "**/products",
        //             "**/product",
        //             "**/articles",
        //             "**/article",
        //         ],
        //         // Blacklisted routes using glob patterns
        //         excludedRoutes: ["**/posts/1456"],
        //         // use a custom normalizer which is applied after the built-in ones.
        //         normalizer: function({ entities }) {
        //             return entities
        //         },
        //     },
        // },
        // {
        //   resolve: `gatsby-source-instagram`,
        //   options: {
        //     username: `1317505554`,
        //     usernameId: `1317505554`,
        //   },
        // },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],

    // TYPESCRIPT PART
    // parser: '@typescript-eslint/parser',
    // extends: [
    //   'eslint:recommended',
    //   'plugin:react/recommended',
    //   'plugin:@typescript-eslint/recommended',
    //   'prettier/@typescript-eslint',
    //   'plugin:prettier/recommended'
    // ],
    // settings: {
    //   react: {
    //     version: 'detect'
    //   }
    // },
    // env: {
    //   browser: true,
    //   node: true,
    //   es6: true
    // },
    // parserOptions: {
    //   ecmaFeatures: {
    //     jsx: true
    //   },
    //   ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    //   sourceType: 'module' // Allows for the use of imports
    // },
    // rules: {
    //   'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    //   '@typescript-eslint/explicit-function-return-type': 'off'
    // },
    // overrides: [
    //   // Override some TypeScript rules just for .js files
    //   {
    //     files: ['*.js'],
    //     rules: {
    //       '@typescript-eslint/no-var-requires': 'off' //
    //     }
    //   }
    // ],
    // END OF TYPESCRIPT PART
}