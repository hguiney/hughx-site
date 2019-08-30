import React from "react";
// import PropTypes from "prop-types";

import TwoColumns from "./two-columns";
import SoftwareCard from "./software-card";

const redblueLogo = "/images/logos/redblue.svg";

const Software = () => (
  <article id="software">
    <h2>Software</h2>
    <p>I’ve built and maintained a number of different software products.</p>
    { /* <h3>Open Source</h3> */ }
    <TwoColumns>
      <SoftwareCard
        name="RedBlue"
        logo={ redblueLogo }
        description="Free interactive video player. Add links and forms; build choose-your-own-story films."
        headingLevel="3"
        github={ { "package": "RedBlueVideo/redblue" } }
        npm={ { "package": "redblue" } }
        iconSize="25"
      />
    </TwoColumns>

    { /* <h3>Commercial</h3>
    <h4>Vlogmaster</h4>
    <p>Lorem ipsum dolor sit amet</p> */ }
  </article>
);

export default Software;
