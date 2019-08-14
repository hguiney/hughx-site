import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import styled from "styled-components";

import renderMarkdown from "../util/renderMarkdown";
import Layout from "./layout";

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthorTemplate = ( { data } ) => {
  const { author } = data;

  console.log( author );

  return <Layout>
    <Container className={ "container" }>
      <header>
        <h1>{ author.name }</h1>
        <Img
          fixed={ author.profilePhoto[0].localFile.childImageSharp.fixed }
          alt=" "
        />
      </header>
      { renderMarkdown( author.bio ) }
    </Container>
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
