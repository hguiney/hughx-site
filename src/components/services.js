import React from "react";
import styled from "styled-components";

import TwoColumns from "./two-columns";
import FinePrint from "./fine-print";

const Incl = () => <abbr title="including" style={ { "borderBottom": 0 } }>incl.</abbr>;

const Services = () => (
  <article id="services">
    <h2>Services</h2>
    <p>I offer experise in the following areas:</p>
    <TwoColumns>
      <section>
        <h3>Development</h3>
        <ul>
          <li>HTML5</li>
          <li>CSS3 — <Incl /> SASS, Less, styled-components</li>
          <li>JavaScript — <Incl /> ES6+, Node.js, React</li>
          <li>PHP — <Incl /> WordPress themes &amp; plugins</li>
          { /* <li>SEO<sup>1</sup></li>
          <li>Performance</li> */ }
          <li>SEO<sup>1</sup> &amp; Performance</li>
        </ul>
      </section>
      <section>
        <h3>Design</h3>
        <ul>
          <li><abbr title="User Interface">UI</abbr>/<abbr title="User Experience">UX</abbr> (Look &amp; Feel)</li>
          <li>Information Architecture</li>
          <li>Usability/Accessibility</li>
          <li>Copyediting</li>
          { /* <li>Branding</li> */ }
          <li>Responsive Design</li>
        </ul>
      </section>
    </TwoColumns>
    <FinePrint>
      <small>
        <p><sup>1</sup> Best practices only. I do not guarantee search engine ranking.</p>
      </small>
    </FinePrint>
  </article>
);

export default Services;
