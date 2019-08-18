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

const mq = breakpoint => `@media only screen and (min-width: ${breakpoint})`;
// const small = mq( "10em" );
const medium = mq( "32em" );
const large = mq( "60em" );

const Heading = styled.h2`
  padding: 0 ${layout.pageGutter};
  text-align: center;
`;

const TwoColumns = styled.div`
  display: flex;
  flex-direction: column;

  ${large} {
    flex-direction: row;
  }
`;

const Articles = styled.article`
  flex: 1;
  max-width: 100%;
  padding: 0 ${layout.pageGutter} ${layout.pageGutter};

  ${large} {
    width: 75%;
    padding: 0 0 ${layout.pageGutter} ${layout.pageGutter};
  }
`;

const Archives = styled.aside`
  padding: 1rem;
  max-width: 100%;
  background-color: #eee;

  ${large} {
    width: 25%;
    margin-left: 1rem;
  }
`;

const ArchiveList = styled.ol`
  margin-left: 0;
  list-style: none;
`;

const PaginationNav = styled.nav``;

const PaginationLinks = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${medium} {
    flex-direction: row;
  }
`;

const PaginationLink = styled( Link )`
  color: white;
  padding: 1rem;
  background-color: rebeccapurple;
  display: inline-block;
  min-width: 12.5%;
  // flex-basis: 25%;
  // flex-grow: 0;
  
  &:hover, &:focus {
    text-decoration: none; // temp
  }

  & + & {
    margin-top: 1rem;
  }

  ${medium} {
    & + & {
      margin-top: 0;
      margin-left: 1rem;
    }
  }

  &.next {
    text-align: right;
  }
`;

const BlogPage = ( { data, pageContext, path } ) => {
  const rootPath = path.match( /(^\/[^/]+)\// )[1];
  const { currentPage, numberOfPages } = pageContext;
  const previousPage = ( currentPage - 1 );
  const nextPage = ( currentPage + 1 );

  return <Layout>
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
        <PaginationNav>
          <h4>Browse More</h4>
          <PaginationLinks>
            { ( currentPage > 1 )
              && <PaginationLink
                  className="previous"
                  rel="prev"
                  to={ `${rootPath}/${previousPage <= 1 ? "" : previousPage}` }
                >Previous Page</PaginationLink>
            }
            { ( currentPage < numberOfPages )
              && <PaginationLink
                  className="next"
                  rel="next"
                  to={ `${rootPath}/${nextPage}` }
                >Next Page</PaginationLink>
            }
          </PaginationLinks>
        </PaginationNav>
      </Articles>
      <Archives>
        <h3>Archives</h3>
        { Object.keys( pageContext.archives ).map( year => (
            <React.Fragment key={ year }>
              <h4>{ year }</h4>
              { Object.keys( pageContext.archives[year] ).reverse().map( ( month ) => {
                if ( month === "posts" ) {
                  return;
                }

                return (
                  <React.Fragment key={ `${year}-${month}` }>
                    <h5>{ moment( `${year}-${month}` ).format( "MMMM" ) }</h5>
                    <ArchiveList reversed>
                    { pageContext.archives[year][month].posts.reverse().map( post => (
                      <li key={ post.id }>
                        <Link
                          to={ `/${getPermalink( {
                            "timestamp": post.publishedAt,
                            "title": post.title,
                          } )}` }>
                            { post.title }
                          </Link>
                        </li>
                    ) ) }
                    </ArchiveList>
                  </React.Fragment>
                );
              } ) }
            </React.Fragment>
        ) ) }
      </Archives>
    </TwoColumns>
  </Layout>;
};

BlogPage.propTypes = {
  "data": PropTypes.object,
  "pageContext": PropTypes.object,
  "path": PropTypes.string,
};

export default BlogPage;

export const pageQuery = graphql`
query BlogQuery(
  $gte: Date,
  $lt: Date,
  $now: Date!,
  $skip: Int!,
  $limit: Int!
) {
  posts: allStrapiPost(
    sort: {
      fields: [publishedAt],
      order: DESC
    }
    filter: {
      publishedAt: {
        gte: $gte,
        lt: $lt,
        lte: $now
      }
    }
    limit: $limit
    skip: $skip
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
