import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = ( { data } ) => (
  <Layout>
    <SEO title="Hugh Guiney – UX Designer, Web Developer" />
    <article>
      <h2>Recent Blog Posts</h2>
      { data.allStrapiPost.edges.map( post => (
        <article key={post.node.id}>
          <h2>
            <Link to={`/${post.node.id}`}>{post.node.title}</Link>
          </h2>
          <Img fluid={post.node.coverArt[0].localFile.childImageSharp.fluid}/>
          <p>{ post.node.body.split( "\n\n" )[0] }</p>
        </article>
      ) ) }
    </article>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
query IndexQuery {
  allStrapiPost(
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
        body
      }
    }
  }
}
`;
