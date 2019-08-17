import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

import renderMarkdown from "../util/renderMarkdown";
import Layout from "../components/layout";
import SEO from "../components/seo";

import getPermalink from "../util/permalink";

const Excerpt = styled.div`
  & > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ArchivePage = ( { data, pageContext } ) => (
  <Layout>
    <SEO title={ pageContext.title } />
    <h2>{ pageContext.title }</h2>
    { data.posts.edges.map( ( edge ) => {
      const post = edge.node;
      const excerpt = post.body.split( "\n\n" )[0];

      return <article key={ post.id }>
        <h2>
          <Link to={ `/${getPermalink( {
            "timestamp": post.publishedAt,
            "title": post.title,
          } )}` }>{ post.title }</Link>
        </h2>
        <Img
          fluid={ post.coverArt[0].localFile.childImageSharp.fluid }
          alt={ post.coverArtAltText }
        />
        <Excerpt className="excerpt">{ renderMarkdown( excerpt ) }</Excerpt>
      </article>;
    } ) }
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
);

ArchivePage.propTypes = {
  "data": PropTypes.object,
  "pageContext": PropTypes.shape( {
    "gte": PropTypes.string,
    "lt": PropTypes.string,
    "title": PropTypes.string,
  } ),
};

export default ArchivePage;

export const pageQuery = graphql`
query ArchiveQuery(
  $gte: Date,
  $lt: Date,
) {
  posts: allStrapiPost(
    sort: {
      fields: [publishedAt],
      order: DESC
    },
    filter: {
      publishedAt: {
        gte: $gte,
        lt: $lt,
      }
    }
  ) {
    edges {
      node {
        id
        title
        publishedAt
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
