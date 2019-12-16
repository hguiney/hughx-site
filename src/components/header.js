import { Link } from "gatsby";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";

import layout from "../util/layout";
import ProgressiveImage from "./progressive-image";
import EmailAddress, { CopiedToClipboardToast } from "./email-address";

const emailIcon = "/images/social/black/email.svg";
const twitterIcon = "/images/social/color/twitter.svg";
const linkedinIcon = "/images/social/color/linkedin.svg";
const stackoverflowIcon = "/images/social/color/stackoverflow.svg";
const youtubeIcon = "/images/social/color/youtube.svg";
const githubIcon = "/images/social/color/github.svg";
const facebookIcon = "/images/social/color/facebook.svg";

const Header = styled.header`
  // background: rebeccapurple;
  // margin-bottom: 1.45rem;
  padding: 1.125rem ${layout.pageGutter};
  text-align: center;
  // color: white;
  // font-family: sans-serif;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // height: 5rem;

  ${layout.medium} {
    flex-direction: row;
  }
`;

const Heading = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
  // font-size: 2em;
  // font-weight: normal;

  &, &.hx.hx--modest {
    margin-bottom: 0;
  }

  .author {
    font-weight: 600;
  }

  .comma, .job-title {
    font-weight: normal;
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

  & > a:hover,
  & > a:focus,
  & > a:active {
    text-decoration: none;
    border-bottom: 0;
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
  &:focus,
  &:active {
    background-color: #ddd; //rgba(128,128,128,0.3333);
  }
`;

const SiteHeader = ( { siteTitle, author, jobTitle } ) => {
  const [contactModalIsVisible, setContactModalIsVisible] = useState( false );
  const [copied, setCopied] = useState( false );

  const showContactModal = () => setContactModalIsVisible( true );
  const hideContactModal = () => setContactModalIsVisible( false );

  const showCopiedToast = () => setCopied( true );
  const hideCopiedToast = () => setCopied( false );

  const contactMethods = {
    "email": {
      "src": emailIcon,
      // "alt": "icon: envelope",
      "alt": " ",
      "url": "mailto:$username",
      "name": "E-mail",
      "username": "hugh@hughx.dev",
    },
    "github": {
      "src": githubIcon,
      // "alt": "icon: GitHub logo",
      "alt": " ",
      "url": "https://github.com/$username",
      "name": "GitHub",
      "username": "hguiney",
    },
    "stackoverflow": {
      "src": stackoverflowIcon,
      // "alt": "icon: Stack Overflow logo",
      "alt": " ",
      "url": "https://stackoverflow.com/users/$username",
      "name": "Stack Overflow",
      "username": "214325/hugh-guiney",
    },
    "linkedin": {
      "src": linkedinIcon,
      // "alt": "icon: LinkedIn logo",
      "alt": " ",
      "url": "https://www.linkedin.com/in/$username",
      "name": "LinkedIn",
      "username": "hughguiney",
    },
    "twitter": {
      "src": twitterIcon,
      // "alt": "icon: Twitter logo",
      "alt": " ",
      "url": "https://twitter.com/$username",
      "name": "Twitter",
      "username": "TurboHax",
    },
  };
  // const ContactDt = styled.dt`
  //   .dl-inline > & {
  //     display: inline-block;
  //     // vertical-align: middle;
  //     vertical-align: sub;
  //     margin-right: .5rem;
  //     margin-bottom: 1rem;
  //     line-height: 1;

  //     // &:after {
  //     //   content: '/';
  //     // }
  //   }
  // `;
  const contactMethodListItemStyles = {
    "marginBottom": "1rem",
  };
  const contactMethodLinkStyles = {
    "paddingBottom": ".1875rem",
  };

  return (
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
      <Heading className="h2 hx hx--modest">
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
        { /* <NavLink href="/blog/">Blog</NavLink>&nbsp; */ }
        <NavLink href="#contact" onClick={ ( event ) => { showContactModal(); event.preventDefault(); } }>Contact</NavLink>
      </Nav>
      <Modal id="contact" show={ contactModalIsVisible } onHide={ hideContactModal }>
        <Modal.Header closeButton>
          <Modal.Title>Contact / Follow</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ {
          "position": "relative",
        } }>
          <CopiedToClipboardToast
            className="--contact-modal"
            keyName="contactModalEmailCopiedToClipboard"
            show={ copied }
            onClose={ hideCopiedToast }
            autohide
          />
          <ul style={ {
            "listStyle": "none",
            "margin": "0",
          } }>
            { Object.keys( contactMethods ).map( ( key ) => {
              const contactMethod = contactMethods[key];
              const contactMethodIdentifier = <>
                <ProgressiveImage
                  img={ {
                    "src": contactMethod.src,
                    "alt": contactMethod.alt,
                    "width": 25,
                  } }
                  style={ {
                    "verticalAlign": "text-bottom",
                    "marginRight": ".3333rem",
                  } }
                />
                <span>{ contactMethod.name }</span>
              </>;

              if ( key === "email" ) {
                return (
                  <li key={ key } style={ contactMethodListItemStyles }>
                    <EmailAddress
                      onCopy={ showCopiedToast }
                      style={ contactMethodLinkStyles }
                    >
                      { contactMethodIdentifier }
                    </EmailAddress>
                  </li>
                );
              }

              return (
                <li key={ key } style={ contactMethodListItemStyles }>
                  <a
                    href={ contactMethod.url.replace( "$username", contactMethod.username ) }
                    style={ contactMethodLinkStyles }
                    // onClick={ ( event ) => { event.preventDefault(); } }
                  >
                    { contactMethodIdentifier }
                  </a>
                </li>
              );
            } ) }
          </ul>
        </Modal.Body>
      </Modal>
    </Header>
  );
};

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
