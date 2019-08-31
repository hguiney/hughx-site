import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

import TwoColumns from "./two-columns";
import SoftwareCard from "./software-card";
// const githubLogo = ""
import githubLogo from "../images/octicons/mark-github.svg";

const redblueLogo = "/images/logos/redblue.svg";
const hvmlLogo = "/images/logos/hvml.png";

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

  @media only screen and (min-width: 65em) {
    & {
      flex-direction: row;
    }

    & > section,
    & > article {
      flex: .5;
      max-width: 47.8%;
      max-width: calc( 50% - 1rem );
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
            "padding": "1rem",
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
        name="hvml"
        logo={ {
          "src": hvmlLogo,
          "width": 150,
          "height": 150,
        } }
        // url="https://hvml.redblue.video"
        headingLevel="3"
        github={ { "package": "RedBlueVideo/hvml", "showStars": false } }
        npm={ { "package": "hvml" } }
        // iconSize="25"
      />
      <SoftwareCard
        name="hvml"
        logo={ {
          "src": hvmlLogo,
          "width": 150,
          "height": 150,
        } }
        // url="https://hvml.redblue.video"
        headingLevel="3"
        github={ { "package": "RedBlueVideo/hvml", "showStars": false } }
        npm={ { "package": "hvml" } }
        // iconSize="25"
      />
      { /* <SoftwareCard
        name="Hypervideo Markup Language"
        logo={ githubLogo }
        description="Video metadata syntax"
        // url="https://hvml.redblue.video"
        headingLevel="3"
        github={ {} }
        npm={ {} }
        // iconSize="25"
      /> */ }
    </SoftwareCards>

    { /* <h3>Commercial</h3>
    <h4>Vlogmaster</h4>
    <p>Lorem ipsum dolor sit amet</p> */ }
  </article>
);

export default Software;
