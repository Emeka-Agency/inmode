const active_env = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development";

require("dotenv").config({
    path: `.env.${active_env}`,
    // path: `.env.${process.env.NODE_ENV}`,
    // path: `.env`,
});

console.log('STRAPI_URL : ' + process.env.STRAPI_URL);
console.log('STRAPI_ID : ' + process.env.STRAPI_ID);
console.log('STRAPI_PASS : ' + process.env.STRAPI_PASS);

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