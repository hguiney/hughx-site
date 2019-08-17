import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import renderMarkdown from "../util/renderMarkdown";
import { getSlugFromTitle, getPermalink } from "../util/permalink";
import hasOwnProperty from "../util/hasOwnProperty";

const Excerpt = styled.div`
& > p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;

const PostPreview = ( props ) => {
  const { post, headingLevel } = props;
  const excerpt = post.body.split( "\n\n" )[0];
  const Heading = `h${headingLevel || 2}`;
  let id;

  if ( hasOwnProperty( props, "_id" ) ) {
    id = props._id;
  } else {
    id = getSlugFromTitle( post.title );
  }

  return (
    <article id={ id }>
      <Heading>
        <Link to={ `/${getPermalink( {
          "timestamp": post.publishedAt,
          "title": post.title,
        } )}` }>{ post.title }</Link>
      </Heading>
      <Img
        fluid={ post.coverArt[0].localFile.childImageSharp.fluid }
        alt={ post.coverArtAltText }
      />
      <Excerpt className="excerpt">{ renderMarkdown( excerpt ) }</Excerpt>
    </article>
  );
};

PostPreview.propTypes = {
  "_id": PropTypes.string,
  "post": PropTypes.object,
  "headingLevel": PropTypes.oneOf( [1, 2, 3, 4, 5, 6] ),
};

export default PostPreview;
