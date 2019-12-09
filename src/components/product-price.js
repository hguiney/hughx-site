import PropTypes from "prop-types";
import React from "react";
import Price from "./price";

const ProductPrice = ( props ) => {
  const {
    value, discount, isDiscounted,
  } = props.product;

  return <>
    <Price value={ value } { ...props } />
    { isDiscounted && <span>{ ` (${discount * 100}% off vs. weekly)` }</span> }
  </>;
};

ProductPrice.propTypes = {
  "product": PropTypes.shape( {
    "value": PropTypes.number,
    "originalValue": PropTypes.number,
    "discount": PropTypes.number,
    "isDiscounted": PropTypes.bool,
  } ),
  // "rate": PropTypes.string,
};

export default ProductPrice;
