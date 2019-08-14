import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import Layout from "./layout";

const PostTemplate = ( { data } ) => (
  <Layout>
    <h1>{ data.post.title }</h1>
    <p>by <Link to={ `/authors/User_${data.post.authors[0].id}` }>{ data.post.authors[0].username }</Link></p>
    { /* <Img fixed={ data.post.coverArt.childImageSharp.fixed }/> */ }
    <p>{ data.post.content }</p>
  </Layout>
);

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
        profilePhoto {
          url
        }
        username
        name
      }
      coverArt {
        url
      }
      body
    }
  }
`;
