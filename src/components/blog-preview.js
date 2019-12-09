import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import PostPreview from "./post-preview";

const BlogPreview = ( props ) => {
  const { posts } = props;
  const Article = styled.article`
    max-width: 43rem;
    margin-left: auto;
    margin-right: auto;
  `;

  return (
    <Article id="blog">
      <h2 style={ { "textAlign": "center" } }>From the <Link to="/blog/">Blog</Link>:</h2>
      { /* posts.edges.map( edge => <PostPreview key={ edge.node.id } post={ edge.node } /> ) */ }
    </Article>
  );
};

BlogPreview.propTypes = {
  "posts": PropTypes.shape( {
    "edges": PropTypes.arrayOf( PropTypes.shape( {
      "node": PropTypes.object,
    } ) ),
  } ),
};

export default BlogPreview;
