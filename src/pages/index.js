import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostPreview from "../components/post-preview";

const IndexPage = ( { data } ) => (
  <Layout>
    <SEO title="Hugh Guiney – UX Designer, Web Developer" />
    <h2>From the <Link to="/blog/">Blog</Link>:</h2>
    { data.posts.edges.map( edge => <PostPreview key={ edge.node.id } post={ edge.node } /> ) }
  </Layout>
);

IndexPage.propTypes = {
  "data": PropTypes.object,
};

export default IndexPage;

export const pageQuery = graphql`
query IndexQuery(
  $now: Date!
) {
  posts: allStrapiPost(
    sort: {
      fields: [publishedAt],
      order: DESC
    },
    filter: {
      publishedAt: {
        lte: $now
      }
    },
    limit: 4
  ) {
    edges {
      node {
        id
        title
        publishedAt
        updatedAt
        coverArt {
          mime
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200, maxHeight: 630) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        coverArtAltText
        body
      }
    }
  }
}
`;
