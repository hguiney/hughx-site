import React from "react";
// import PropTypes from "prop-types";

import SoftwareCard from "./software-card";

const Software = () => (
  <article id="software">
    <h2>Software</h2>
    <p>I’ve built and maintained a number of different software products.</p>
    { /* <h3>Open Source</h3> */ }
    <SoftwareCard
      name="RedBlue"
      headingLevel="3"
      github={ { "package": "RedBlueVideo/redblue" } }
    />

    { /* <h3>Commercial</h3>
    <h4>Vlogmaster</h4>
    <p>Lorem ipsum dolor sit amet</p> */ }
  </article>
);

export default Software;
