/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
// import { useStaticQuery, graphql } from "gatsby";
import SEO from "./seo";

import Header from "./header";
import "./layout.css";

import layout from "../util/layout";

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
      <footer style={ {
        "textAlign": "center",
        // "marginTop": "3rem",
        "padding": `1.5rem ${layout.pageGutter}`,
        "backgroundColor": "#aaa",
      } }>
        © { new Date().getFullYear() }, Built with
        { " " }
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  );
};

Layout.propTypes = {
  "children": PropTypes.node.isRequired,
  "siteMetadata": PropTypes.object,
};

export default Layout;
