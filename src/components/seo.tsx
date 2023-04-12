/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { Script } from "gatsby"
import { useImages } from './contexts/images-provider';

function SEO({ description, lang, meta, title }) {

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

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  const head_tag = function(w:any, d:any, s:any, l:any, i:any) {
        if(w == undefined) {return;}
        if(d == undefined) {return;}
        w[l] = w[l] || [];
        w[l].push({
            'gtm.start': new Date().getTime(),
            event:'gtm.js'
        });
        var f = d.getElementsByTagName(s)[0];
        var j = d.createElement(s);
        var dl = l! = 'dataLayer'?'&l=' + l : '';
        j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j,f);
    }

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
      ].concat(meta)}
    >
        {/* <!-- Google Tag Manager --> */}
        <Script>
            {head_tag(typeof window != "undefined" ? window : undefined, typeof document != "undefined" ? document : undefined, 'script', 'dataLayer', 'GTM-WVWLZ2L')}
        </Script>
        {/* <!-- End Google Tag Manager --> */}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default SEO
