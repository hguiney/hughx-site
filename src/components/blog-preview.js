import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import PostPreview from "./post-preview";

const BlogPreview = ( props ) => {
  const { posts } = props;

  return (
    <article id="blog">
      <h2>From the <Link to="/blog/">Blog</Link>:</h2>
      { posts.edges.map( edge => <PostPreview key={ edge.node.id } post={ edge.node } /> ) }
    </article>
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
