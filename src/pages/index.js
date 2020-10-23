import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
// import styled from "styled-components";

// Layout
import Layout from "../components/layout";
import Container from "../components/container";

// Sections
import Intro from "../components/intro";
// import Companies from "../components/companies";
import Services from "../components/services";
import Packages from "../components/packages";
import Software from "../components/software";
// import Résumé from "./resume";
// import BlogPreview from "../components/blog-preview";
import Advantages from "../components/advantages";

class IndexPage extends React.PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Layout siteMetadata={ data.site.siteMetadata }>
        <Intro heading={ data.site.siteMetadata.description } />
        <Container>
          { /* <Companies /> */ }
          <Services />
          <Advantages />
          <Packages />
          <Software />
          { /* <Résumé /> */ }
          { /* <BlogPreview posts={ data.posts } /> */ }
        </Container>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  "data": PropTypes.object,
};

export default IndexPage;

export const pageQuery = graphql`
query IndexQuery { # IndexQuery($now: Date!) {
  site {
    siteMetadata {
      title
      author
      jobTitle
      description
    }
  }
  # posts: allStrapiPost(
  #   sort: {
  #     fields: [publishedAt],
  #     order: DESC
  #   },
  #   filter: {
  #     publishedAt: {
  #       lte: $now
  #     }
  #   },
  #   limit: 4
  # ) {
  #   edges {
  #     node {
  #       id
  #       title
  #       publishedAt
  #       updatedAt
  #       coverArt {
  #         mime
  #         localFile {
  #           childImageSharp {
  #             fluid(maxWidth: 1200, maxHeight: 630) {
  #               ...GatsbyImageSharpFluid_withWebp
  #             }
  #           }
  #         }
  #       }
  #       coverArtAltText
  #       body
  #     }
  #   }
  # }
}`;
