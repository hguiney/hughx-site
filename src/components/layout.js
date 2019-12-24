/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
// import { useStaticQuery, graphql } from "gatsby";
import Footer from "./footer";

import SEO from "./seo";
import Header from "./header";

import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap-overrides.css";
import "./layout.scss";

const Layout = ( { children, siteMetadata } ) => {
  const site = siteMetadata;
  // const description = `${site.author}, ${site.description}`;

  return (
    <>
      <SEO title={ site.description } />
      <Header
        siteTitle={ site.title }
        siteDescription={ site.description }
        author={ site.author }
        jobTitle={ site.jobTitle }
      />
      { children }
      <Footer />
    </>
  );
};

Layout.propTypes = {
  "children": PropTypes.node.isRequired,
  "siteMetadata": PropTypes.shape( {
    "title": PropTypes.string,
    "description": PropTypes.string,
    "author": PropTypes.string,
    "jobTitle": PropTypes.string,
  } ).isRequired,
};

export default Layout;
