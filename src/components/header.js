import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import layout from "../util/layout";

const Header = styled.header`
  // background: rebeccapurple;
  // margin-bottom: 1.45rem;
  padding: 1.125rem ${layout.pageGutter};
  text-align: center;
  // color: white;
  font-family: sans-serif;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // height: 5rem;

  ${layout.medium} {
    flex-direction: row;
  }
`;

const Heading = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  // font-size: 2em;
  font-weight: normal;

  .author {
    font-weight: 600;
  }

  ${layout.medium} {
    margin-bottom: 0;
    text-align: left;

    span {
      display: block;
    }

    .comma {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  // display: inline-block;

  & > a,
  & > a:visited {
    color: inherit;
  }

  & > a:hover {
    text-decoration: none;
  }
`;

const NavLink = styled.a`
  height: 100%;
  display: inline-flex;
  align-items: center;
  background-color: #eee;
  text-decoration: none;
  padding: .5rem 1rem;
  margin: .125rem;
  flex-grow: 1;
  flex-basis: 0;
  border-radius: 3rem;
  transition: .25s ease background-color;

  &:hover,
  &:focus {
    background-color: #ddd; //rgba(128,128,128,0.3333);
  }
`;

const SiteHeader = ( { siteTitle, author, jobTitle } ) => (
  <Header>
    { /* <hgroup style={ { "marginBottom": 0 } }>
      <Heading>
        <Link
          to="/"
          style={ {
            "color": "inherit",
            "textDecoration": "none",
          } }
        >
          { siteTitle }
        </Link>
      </Heading>
    </hgroup> */ }
    <Heading>
      <span className="author">{ author }</span><span className="comma">, </span><span className="job-title">{ jobTitle }</span>
    </Heading>
    <Nav>
      <h2 hidden>Main Navigation</h2>
      { /* <a href="#portfolio">Portfolio</a>&nbsp; */ }
      { /* <NavLink href="/about/">About</NavLink>&nbsp; */ }
      { /* <NavLink href="#services">Services</NavLink>&nbsp; */ }
      { /* <NavLink href="#packages">Packages</NavLink>&nbsp; */ }
      { /* <a href="#manifesto">Manifesto</a>&nbsp; */ }
      { /* <NavLink href="#software">Software</NavLink>&nbsp; */ }
      { /* <NavLink href="/resume/">Résumé</NavLink>&nbsp; */ }
      <NavLink href="/blog/">Blog</NavLink>&nbsp;
      <NavLink href="#contact">Contact</NavLink>
    </Nav>
  </Header>
);

SiteHeader.propTypes = {
  "siteTitle": PropTypes.string,
  "siteDescription": PropTypes.string,
  "author": PropTypes.string,
  "jobTitle": PropTypes.string,
};

SiteHeader.defaultProps = {
  "siteTitle": "",
  "siteDescription": "",
  "author": "",
  "jobTitle": "",
};

export default SiteHeader;
