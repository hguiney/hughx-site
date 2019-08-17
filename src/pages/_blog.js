import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import moment from "moment";

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostPreview from "../components/post-preview";

import layout from "../util/layout";
import { getPermalink } from "../util/permalink";

const Heading = styled.h2`
  padding: 0 ${layout.pageGutter};
  text-align: center;
`;

const TwoColumns = styled.div`
  display: flex;
  flex-direction: row;
`;

const Articles = styled.article`
  flex: 1;
  width: 75%;
  max-width: 100%;
  padding-left: ${layout.pageGutter};
`;

const Archives = styled.aside`
  padding: 1rem;
  margin-left: 1rem;
  width: 25%;
  max-width: 100%;
  background-color: #eee;
`;

const ArchiveList = styled.ol`
  margin-left: 0;
  list-style: none;
`;

const BlogPage = ( { data, pageContext } ) => (
  <Layout>
    <SEO title="Blog" />
    <Heading>Blog</Heading>
    <TwoColumns>
      <Articles>
        <h3>Latest</h3>
        { data.posts.edges.map(
          edge => <PostPreview
            key={ edge.node.id }
            headingLevel={ 4 }
            post={ edge.node }
          />,
        ) }
      </Articles>
      <Archives>
        <h3>Archives</h3>
        { Object.keys( pageContext.archives ).map( year => (
            <>
              <h4>{ year }</h4>
              { Object.keys( pageContext.archives[year] ).reverse().map( ( month ) => {
                if ( month === "posts" ) {
                  return;
                }

                return (
                  <>
                    <h5>{ moment( `${year}-${month}` ).format( "MMMM" ) }</h5>
                    <ArchiveList reversed>
                    { pageContext.archives[year][month].posts.reverse().map( post => (
                      <li key={ post.id }>
                        <Link
                          to={ getPermalink( {
                            "timestamp": post.publishedAt,
                            "title": post.title,
                          } ) }>
                            { post.title }
                          </Link>
                        </li>
                    ) ) }
                    </ArchiveList>
                  </>
                );
              } ) }
            </>
        ) ) }
      </Archives>
    </TwoColumns>
  </Layout>
);

BlogPage.propTypes = {
  "data": PropTypes.object,
  "pageContext": PropTypes.object,
};

export default BlogPage;

export const pageQuery = graphql`
query BlogQuery(
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
