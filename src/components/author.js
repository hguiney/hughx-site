import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Layout from "./layout";

const AuthorTemplate = ( { data } ) => {
  const { author } = data;

  console.log( author );

  return <Layout>
    <header>
      <h1>{ author.name }</h1>
      <Img
        fixed={ author.profilePhoto[0].localFile.childImageSharp.fixed }
        alt=" "
      />
    </header>
    <ReactMarkdown source={ author.bio } />
  </Layout>;
};

AuthorTemplate.propTypes = {
  "data": PropTypes.object,
};

export default AuthorTemplate;

export const query = graphql`
  query AuthorTemplate($id: String!) {
    author: strapiUser(id: {eq: $id}) {
      id
      username
      name
      profilePhoto {
        localFile {
          childImageSharp {
            fixed(width: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      bio
    }
  }
`;
