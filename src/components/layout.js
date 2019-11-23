/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
// import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import SEO from "./seo";

import SiteHeader from "./header";
import "./layout.css";

import layout from "../util/layout";

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem ${layout.pageGutter};
  background-color: #aaa;
  // position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
`;

const Layout = ( { children, siteMetadata } ) => {
  const site = siteMetadata;
  // const description = `${site.author}, ${site.description}`;

  return (
    <>
      <SEO title={ site.description } />
      <SiteHeader
        siteTitle={ site.title }
        siteDescription={ site.description }
        author={ site.author }
        jobTitle={ site.jobTitle }
      />
      { children }
      <Footer>
        &copy; { ( new Date() ).getFullYear() } Hugh Guiney
        <a href="https://www.youtube.com/channel/UCOldDDJyK_oyDkVJLCuaorw">YouTube</a>
      </Footer>
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
