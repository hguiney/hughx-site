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
    return <>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control />
      </Form.Group>
      { /* <Form.Group controlId="company">
        <Form.Label>Company</Form.Label>
        <Form.Control />
      </Form.Group> */ }
      <Form.Group controlId="email">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" />
      </Form.Group>
      <Form.Group controlId="website">
        <Form.Label>Website</Form.Label>
        <Form.Control type="url" />
      </Form.Group>
      <Form.Group controlId="goals">
        <Form.Label>What do you need help with?</Form.Label>
        <Form.Control as="textarea" rows="5" />
      </Form.Group>
      <dl>
        <dt>Options</dt>
        <dd>
          <Form.Group controlId="add-screencast" style={ { "marginBottom": 0 } }>
            <Form.Check>
              <Form.Check.Input
                checked={ this.state.products.auditVideo.inCart }
                onChange={ this.handleChange }
                name="auditVideo.inCart"
              />
              <Form.Check.Label>
                <span>
                  { " " }
                  Add screencast: {
                    (
                      this.state.products.auditVideo.inCart
                      && this.state.products.auditVideo.waiveFee
                    )
                      ? <><del><ProductPrice product={ this.state.products.auditVideo.price } /></del> $0</>
                      : <ProductPrice product={ this.state.products.auditVideo.price } />
                  }
                </span>
              </Form.Check.Label>
            </Form.Check>
          </Form.Group>
        </dd>
        <dd>
          <Form.Group controlId="waive-fee">
            <Form.Check>
              <Form.Check.Input
                name="auditVideo.waiveFee"
                checked={
                  this.state.products.auditVideo.inCart
                  && this.state.products.auditVideo.waiveFee
                }
                onChange={ this.handleChange }
                disabled={ !this.state.products.auditVideo.inCart }
              />
              <Form.Check.Label className={ this.state.products.auditVideo.inCart ? "" : "disabled" }>
                <span>
                  { " " }
                  Waive fee — I agree to let my video be made public.
                </span>
              </Form.Check.Label>
            </Form.Check>
          </Form.Group>
        </dd>
      </dl>
      <Form.Group controlId="total">
        <Form.Label>Total:</Form.Label>
        <Form.Control plaintext as="output">
          <Price value={
            (
              this.state.products.auditVideo.inCart
              && !this.state.products.auditVideo.waiveFee
            )
              ? ( this.state.products.audit.price.value + this.state.products.auditVideo.price.value )
              : this.state.products.audit.price.value
          } />
        </Form.Control>
      </Form.Group>
    </>;
  }
}

export default OrderForm;
