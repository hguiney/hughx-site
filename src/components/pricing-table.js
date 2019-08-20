import React from "react";
import PropTypes from "prop-types";

const PricingTable = () => <table>
    <thead>
      <tr>
        <th>Basic</th>
        <th>Plus</th>
        <th>Pro</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$5</td>
        <td>$20</td>
        <td>$100</td>
      </tr>
    </tbody>
  </table>;

PricingTable.propTypes = {
  "data": PropTypes.object,
};

export default PricingTable;
