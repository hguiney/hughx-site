import React from "react";
import PropTypes from "prop-types";

const PricingTable = () => <table>
    <thead>
      <tr>
        <th hidden></th>
        <th>Design/Development Audit</th>
        <th>Plus</th>
        <th>Pro</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th hidden>What You Get</th>
        <td>
          <p>You will get a list of actionable feedback from me on ways you can improve your software product. I have over 10 years experience in the tech industry and can cover coding, information architecture, look & feel, performance, accessibility, and/or usability.</p>
          <p>Optionally, I can also send you a screen recording of me navigating your site/app with a real-time narration of first impressions.</p>
          <p>Note: For coding feedback, I can only cover HTML, CSS, SASS/Less, XML, JavaScript (Browser, Node.js, Polymer, Angular 1.x, React), and PHP.</p>
        </td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <th hidden>Price</th>
        <td>$2,500 one-off fee or $250/<abbr>mo</abbr></td>
        <td>$20</td>
        <td>$100</td>
      </tr>
      <tr>
        <td hidden></td>
        <td>
          <button>Order</button>
        </td>
        <td>
          <button>Order</button>
        </td>
        <td>
          <button>Order</button>
        </td>
      </tr>
    </tbody>
  </table>;

PricingTable.propTypes = {
  "data": PropTypes.object,
};

export default PricingTable;
