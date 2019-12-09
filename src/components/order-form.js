import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Price from "./price";
import ProductPrice from "./product-price";
import getPrice from "../util/getPrice";
// import PropTypes from "prop-types";
// import styled from "styled-components";

class OrderForm extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      // "stripe": null,
      "products": {
        "audit": {
          "inCart": false,
          "price": getPrice( "weekendly" ),
        },
        "auditVideo": {
          "inCart": false,
          "price": getPrice( "hourly" ),
          "waiveFee": false,
        },
        "iterate": {
          "inCart": false,
          "price": getPrice( "weekly" ),
        },
      },
    };

    this.handleChange = this.handleChange.bind( this );
    this.onSubmit = this.handleSubmit.bind( this );
  }

  handleChange( event ) {
    const { target } = event;
    const value = ( target.type === "checkbox" ? target.checked : target.price );
    const path = target.name.split( "." );
    const newState = {
      // ...this.state,
      "products": {
        ...this.state.products,
        [path[0]]: {
          ...this.state.products[path[0]],
          [path[1]]: value,
        },
      },
    };

    if (
      ( path[0] === "auditVideo" )
      && ( path[1] === "inCart" )
      && ( value === false )
    ) {
      newState.products.auditVideo.waiveFee = false;
    }

    this.setState( newState );
  } // handleChange

  handleSubmit( event ) {
    event.preventDefault();
  }

  render() {
    return <></>;
  }
}

export default OrderForm;
