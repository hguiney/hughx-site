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
import ProgressiveImage from "./progressive-image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap-overrides.css";
import "./layout.css";

import layout from "../util/layout";

const reactLogo = "/images/logos/react.svg";

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem ${layout.pageGutter};
  background-color: #222;
  color: white;
  // position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 2;
`;

const FooterContent = styled.div`
  max-width: 39rem;
  margin-left: auto;
  margin-right: auto;
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
        <FooterContent>
          <p>Designed in the browser. Developed in <ProgressiveImage img={ { "src": reactLogo, "width": 33.3333, "alt": "React logo" } } style={ { "verticalAlign": "middle" } } /> React.</p>
          <p>&copy; { ( new Date() ).getFullYear() } Hugh Guiney unless <a href="#">otherwise specified</a>.</p>
          { /* <p><a href="https://www.youtube.com/channel/UCOldDDJyK_oyDkVJLCuaorw">YouTube</a></p> */ }
        </FooterContent>
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
