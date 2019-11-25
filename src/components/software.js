import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

import TwoColumns from "./two-columns";
import SoftwareCard from "./software-card";
// const githubLogo = ""
import githubLogo from "../images/octicons/mark-github.svg";
import layout from "../util/layout";

const redblueLogo = "/images/logos/redblue.svg";
const hvmlLogo = "/images/logos/hvml.png";
const npmMinifyLogo = "/images/logos/npm-minify.svg";
const npmMinifyLogoAlt = "/images/logos/alt/npm-minify.jpg";

const npmLogo = "/images/logos/npm.svg";
const eslintConfigHughxLogo = "/images/logos/eslint-config-hughx.svg";

const SoftwareCards = styled( TwoColumns )`
  @media only screen and (min-width: 40em) {
    & {
      flex-direction: column;

      & > section,
      & > article {
        flex: unset;
        max-width: unset;
      }
    }
  }

  @media only screen and (min-width: 75em) {
    flex-direction: row;

    @supports (display: grid) {
      display: grid;
      margin-left: auto;
      margin-right: auto;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: 1fr;
      grid-gap: 1rem;
      margin: 0;
    }

    & > section,
    & > article {
      flex: .5;
      max-width: 47.8%;
      max-width: calc(50% - 1rem);
      
      @supports (display: grid) {
        margin: 0;
        max-width: 100%;
      }
    }
  }
`;

const Software = () => (
  <article id="software">
    <h2>Software</h2>
    <p>I currently maintain the following software products:</p>
    { /* <h3>Open Source</h3> */ }
    <SoftwareCards>
      <SoftwareCard
        name="RedBlue"
        logo={ {
          "src": redblueLogo,
          "width": 150,
          "height": 150,
          "style": {
            // "padding": "1rem",
            "padding": "1.25rem",
            "backgroundColor": "#fff",
          },
        } }
        url="https://redblue.video"
        description={ "Free interactive video player. Add links and forms; build <span style=\"white-space: nowrap;\">choose-your-own-story</span> films." }
        headingLevel="3"
        github={ { "package": "RedBlueVideo/redblue", "showForks": false } }
        npm={ { "package": "redblue" } }
        // iconSize="25"
      />
      <SoftwareCard
        name="HVML"
        logo={ {
          "src": hvmlLogo,
          "width": 150,
          "height": 150,
        } }
        tagline="Hypervideo Markup Language • Format &amp; Parser"
        description="Stores various details about videos, including interactive UI instructions."
        url="https://hvml.redblue.video"
        headingLevel="3"
        github={ { "package": "RedBlueVideo/hvml", "showStars": false } }
        npm={ { "package": "hvml" } }
      />
      <SoftwareCard
        name="npm-minify"
        logo={ {
          "src": npmMinifyLogo,
          "width": 150,
          "height": 150,
          "style": {
            "padding": "1rem",
            "backgroundColor": "#fff",
          },
        } }
        tagline="CLI Tool for Library Authors"
        description="Minifies NPM packages to reduce dependency bloat."
        url="https://github.com/hguiney/npm-minify"
        headingLevel="3"
        github={ { "package": "hguiney/npm-minify", "showStars": false } }
        npm={ { "package": "npm-minify" } }
      />
      <SoftwareCard
        name="eslint-config-hughx"
        logo={ {
          "src": eslintConfigHughxLogo,
          "width": 150,
          "height": 150,
        } }
        tagline="Hughx ESLint Configuration"
        description="Sensible defaults for JavaScript coding style."
        url="https://github.com/hguiney/eslint-config-hughx"
        headingLevel="3"
        github={ { "package": "hguiney/eslint-config-hughx", "showStars": false } }
        npm={ { "package": "eslint-config-hughx" } }
      />
    </SoftwareCards>
    { /* <h3>Commercial</h3>
    <h4>Vlogmaster</h4>
    <p>Lorem ipsum dolor sit amet</p> */ }
  </article>
);

export default Software;
