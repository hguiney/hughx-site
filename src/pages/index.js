import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ( { data } ) => (
  <Layout>
    <SEO title="Hugh Guiney – UX Designer, Web Developer" />
    <article>
      <h2>Recent Blog Posts</h2>
      { data.posts.edges.map( ( edge ) => {
        const post = edge.node;

        return <article key={ post.id }>
          <h2>
            <Link to={ `/${post.id}` }>{ post.title }</Link>
          </h2>
          <Img
            fluid={ post.coverArt[0].localFile.childImageSharp.fluid }
            alt={ post.coverArtAltText }
          />
          <p>{ post.body.split( "\n\n" )[0] }</p>
        </article>;
      } ) }
    </article>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

IndexPage.propTypes = {
  "data": PropTypes.object,
};

export default IndexPage;

export const pageQuery = graphql`
query IndexQuery {
  posts: allStrapiPost(
    sort: {
      fields: [createdAt],
      order: DESC
    },
    limit: 4
  ) {
    edges {
      node {
        id
        title
        createdAt
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
