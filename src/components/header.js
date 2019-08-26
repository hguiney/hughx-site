import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import layout from "../util/layout";

const Header = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
  padding: 1.125rem ${layout.pageGutter};
  text-align: center;
  color: white;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${layout.large} {
    flex-direction: row;
  }
`;

const Heading = styled.h1`
  margin-bottom: 1rem;

  ${layout.large} {
    margin-bottom: 0;
  }
`;

const Nav = styled.nav`
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
  text-decoration: none;
  background-color: rgba(255,255,255,0.3333);
  padding: .5rem 1rem;
  margin: .125rem;
  flex-grow: 1;
  flex-basis: 0;
  border-radius: 3rem;
`;

const SiteHeader = ( { siteTitle } ) => (
  <Header>
    <hgroup style={ { "marginBottom": 0 } }>
      <Heading>
        <Link
          to="/"
          style={ {
            "color": "white",
            "textDecoration": "none",
          } }
        >
          { siteTitle }
        </Link>
      </Heading>
      { /* <h2 style={ {
        "textAlign": "center",
        "margin": "1rem auto 1rem",
        "fontSize": "1.5rem",
        "fontWeight": "normal",
      } }>{ `${author}, ${jobTitle}` }</h2> */ }
    </hgroup>
    <Nav>
      <h2 hidden>Main Navigation</h2>
      { /* <a href="#portfolio">Portfolio</a>&nbsp; */ }
      { /* <NavLink href="#about">About</NavLink>&nbsp; */ }
      { /* <NavLink href="#services">Services</NavLink>&nbsp; */ }
      <NavLink href="#packages">Packages</NavLink>&nbsp;
      { /* <a href="#manifesto">Manifesto</a>&nbsp; */ }
      <NavLink href="#software">Software</NavLink>&nbsp;
      <NavLink href="/resume/">Résumé</NavLink>&nbsp;
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
