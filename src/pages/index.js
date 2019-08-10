import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = ( { data } ) => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ "maxWidth": "300px", "marginBottom": "1.45rem" }}>
      <Image />
    </div>
    <div>
      {data.allStrapiPost.edges.map( post => (
        <article key={post.node.id}>
          <h2>
            <Link to={`/${post.node.id}`}>{post.node.title}</Link>
          </h2>
          <Img fixed={post.node.coverArt[0].localFile.childImageSharp.fixed}/>
          <p>{post.node.body}</p>
        </article>
      ) )}
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
query IndexQuery {
  allStrapiPost {
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
              fixed(width: 200, height: 125) {
                ...GatsbyImageSharpFixed
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
