import React from "react";

import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = ( { data } ) => (
  <Layout siteMetadata={ data.site.siteMetadata }>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
);

export default NotFoundPage;

export const pageQuery = graphql`
  query NotFoundQuery {
    site {
      siteMetadata {
        title
        author
        jobTitle
        description
      }
    }
  }
`;
