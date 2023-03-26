/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useImages } from './contexts/images-provider';

function SEO({ description, lang, meta, title }:SEO) {

  const images = useImages();

  const { site, strapiSeoMeta } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            og_locale
            og_type
            og_title
            og_description
            og_image
            og_url
            og_site_name
            twitter_card
            twitter_description
            twitter_title
            twitter_site
            twitter_image
            twitter_creator
            msapplication_TileImage
          }
        }
        strapiSeoMeta {
          PageTitle
          Description
          OG_Title
          OG_Description
          Twitter_Title
          Twitter_Description
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={`${title ? title + ' | ' : ''}${strapiSeoMeta.PageTitle}`}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          // content: site.siteMetadata.description,
          content: strapiSeoMeta.Description,
        },
        {
          property: `og:locale`,
          content: site.siteMetadata.og_locale,
        },
        {
          property: `og:type`,
          content: site.siteMetadata.og_type,
        },
        {
          property: `og:title`,
          // content: site.siteMetadata.og_title,
          content: strapiSeoMeta.OG_Title,
        },
        {
          property: `og:description`,
          // content: site.siteMetadata.og_description,
          content: strapiSeoMeta.OG_Description,
        },
        {
          property: `og:url`,
          content: site.siteMetadata.og_url,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.og_site_name,
        },
        {
          name: `twitter:card`,
          content: site.siteMetadata.twitter_card,
        },
        {
          name: `twitter:title`,
          // content: site.siteMetadata.twitter_title,
          content: strapiSeoMeta.Twitter_Title,
        },
        {
          name: `twitter:description`,
          // content: site.siteMetadata.twitter_description,
          content: strapiSeoMeta.Twitter_Description,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.twitter_site,
        },
        {
          name: `twitter:image`,
          // content: images.resolve_img('seoLogo'),
          content: images.resolve_img('seoLogo2'),
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.twitter_creator,
        },
        {
          name: `msapplication-TileImage`,
          // content: images.resolve_img('seoLogo'),
          content: images.resolve_img('seoLogo2'),
        },
      ].concat(meta || [])}
    />
  )
};

interface SEO {
    description?: string;
    lang?: string;
    meta?: Array<Object>;
    title: string;
};

export default SEO
