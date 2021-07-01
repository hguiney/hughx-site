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
const componentCliLogo = "/images/logos/component-cli.svg";
const standardStandardsLogo = "/images/logos/standard-standards.svg";

const SoftwareCards = styled( TwoColumns )`
  @media only screen and (min-width: 40em) {
    & {
      flex-direction: column;

      & > section,
      & > article {
        flex: unset;
        // max-width: unset;
        max-width: 98.24%;
        max-width: calc(100% - 1rem);
      }
    }
  }

  @media only screen and (min-width: 75em) {
    flex-direction: row;
    flex-wrap: wrap;

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
        tagline="Open-Source Hypervideo Player"
        description={ "Free interactive video player. Add links and forms; build <span style=\"white-space: nowrap;\">choose-your-own-story</span> films." }
        headingLevel="3"
        github={ {
          "package": "RedBlueVideo/redblue",
          "showForks": false,
        } }
        npm={ {
          "package": "redblue",
          "fromDate": "2017-10-01",
          // "downloadScale": "monthly"
        } }
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
        url="https://hypervideo.tech"
        headingLevel="3"
        github={ {
          "package": "RedBlueVideo/hvml",
          "showStars": false,
        } }
        npm={ {
          "package": "hvml",
          "fromDate": "2017-10-01",
          // "downloadScale": "monthly"
        } }
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
        url="https://github.com/HughxDev/npm-minify"
        headingLevel="3"
        github={ {
          "package": "HughxDev/npm-minify",
          "showStars": false,
        } }
        npm={ {
          "package": "npm-minify",
          "fromDate": "2019-03-29",
          // "downloadScale": "monthly"
        } }
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
        url="https://github.com/HughxDev/eslint-config-hughx"
        headingLevel="3"
        github={ {
          "package": "HughxDev/eslint-config-hughx",
          "showStars": false,
        } }
        npm={ {
          "package": "eslint-config-hughx",
          "fromDate": "2019-03-29",
          // "downloadScale": "monthly"
        } }
      />
      <SoftwareCard
        name="Component CLI"
        logo={ {
          "src": componentCliLogo,
          "width": 150,
          "height": 150,
        } }
        tagline="CLI Tool for Front-end Developers"
        description="Perform CRUD operations on components. Framework-agnostic."
        url="https://github.com/HughxDev/component-cli"
        headingLevel="3"
        github={ {
          "package": "HughxDev/component-cli",
          "showStars": false,
        } }
        npm={ {
          "package": "@hughx/component-cli",
          "fromDate": "2021-06-09",
          // "downloadScale": "monthly"
        } }
      />
      <SoftwareCard
        name="Standard Standards"
        logo={ {
          "src": standardStandardsLogo,
          "width": 150,
          "height": 150,
        } }
        tagline="Recommendations for team coding practices"
        description="Aids maintenance of large projects."
        url="https://github.com/HughxDev/standard-standards"
        headingLevel="3"
        github={ {
          "package": "HughxDev/standard-standards",
          "showStars": false,
        } }
      />
    </SoftwareCards>
    { /* <h3>Commercial</h3>
    <h4>Vlogmaster</h4>
    <p>Lorem ipsum dolor sit amet</p> */ }
  </article>
);

export default Software;
