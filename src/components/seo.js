/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { Location } from "@reach/router";

function SEO( {
  description, lang, meta, title,
} ) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            baseUrl
            previewImage
            facebookAppId
            twitter {
              username
            }
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Location>{
      ( { location } ) => (
        <Helmet
          htmlAttributes={ {
            lang,
          } }
          title={ title }
          titleTemplate={ `%s | ${site.siteMetadata.title}` }
          meta={ [
            {
              "name": "description",
              "content": metaDescription,
            },
            {
              "property": "og:title",
              "content": title,
            },
            {
              "property": "og:url",
              "content": `${site.siteMetadata.baseUrl}${location.pathname}`,
            },
            {
              "property": "og:image",
              "content": `${site.siteMetadata.baseUrl}${site.siteMetadata.previewImage}`,
            },
            {
              "property": "og:description",
              "content": metaDescription,
            },
            {
              "property": "og:type",
              "content": "website",
            },
            {
              "property": "fb:app_id",
              "content": site.siteMetadata.facebookAppId,
            },
            {
              "name": "twitter:card",
              "content": "summary_large_image",
            },
            {
              "name": "twitter:site",
              "content": `@${site.siteMetadata.twitter.username}`,
            },
            {
              "name": "twitter:creator",
              "content": `@${site.siteMetadata.twitter.username}`,
            },
            {
              "name": "twitter:title",
              "content": title,
            },
            {
              "name": "twitter:description",
              "content": metaDescription,
            },
          ].concat( meta ) }
        />
      )
    }</Location>
  );
}

SEO.defaultProps = {
  "lang": "en",
  "meta": [],
  "description": "",
};

SEO.propTypes = {
  "description": PropTypes.string,
  "lang": PropTypes.string,
  "meta": PropTypes.arrayOf( PropTypes.object ),
  "title": PropTypes.string.isRequired,
};

export default SEO;
