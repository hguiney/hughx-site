import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import Layout from "./layout";

const PostTemplate = ( props ) => {
  const { post } = props.data;
  const { site } = props.data;

  return <Layout siteMetadata={ site.siteMetadata }>
    <article id={ post.id }>
      <header>
        <h1>{ post.title }</h1>
        <p>by <Link to={ `/authors/${post.authors[0].username}` }>{ post.authors[0].name }</Link></p>
        <Img
          fluid={ post.coverArt[0].localFile.childImageSharp.fluid }
          alt={ post.coverArtAltText }
        />
      </header>
      <ReactMarkdown source={ post.body } />
    </article>
  </Layout>;
};

PostTemplate.propTypes = {
  "data": PropTypes.object,
};

export default PostTemplate;

// export const query = graphql`
//   query PostTemplate($id: String!) {
//     site {
//       siteMetadata {
//         title
//         author
//         jobTitle
//         description
//       }
//     }
//     post: strapiPost(id: {eq: $id}) {
//       id
//       title
//       authors {
//         id
//         username
//         name
//       }
//       coverArt {
//         localFile {
//           childImageSharp {
//             fluid(maxWidth: 1200, maxHeight: 630) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//       coverArtAltText
//       body
//     }
//   }
// `;
