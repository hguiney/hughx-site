import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Layout from "./layout";

const PostTemplate = ( { data } ) => {
  const { post } = data;

  return <Layout>
    <header>
      <h1>{ post.title }</h1>
      <p>by <Link to={ `/authors/${post.authors[0].username}` }>{ post.authors[0].name }</Link></p>
      <Img
        fluid={ post.coverArt[0].localFile.childImageSharp.fluid }
        alt={ post.coverArtAltText }
      />
    </header>
    <ReactMarkdown source={ post.body } />
  </Layout>;
};

PostTemplate.propTypes = {
  "data": PropTypes.object,
};

export default PostTemplate;

export const query = graphql`
  query PostTemplate($id: String!) {
    post: strapiPost(id: {eq: $id}) {
      title
      authors {
        id
        username
        name
      }
      coverArt {
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
`;
