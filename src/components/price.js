import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

const Price = props => (
  <NumberFormat
    value={ props.value }
    displayType={ "text" }
    thousandSeparator={ true }
    decimalScale={ 0 }
    prefix={ "$" }
    { ...props }
  />
);

Price.propTypes = {
  "value": PropTypes.number,
};

export default Price;
