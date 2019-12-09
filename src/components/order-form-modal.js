import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Modal, Form, Col, Row,
} from "react-bootstrap";
import moment from "moment";
import styled from "styled-components";
import Price from "./price";
import ProductPrice from "./product-price";
import getPrice from "../util/getPrice";
import OrderForm from "./order-form";

const ModalFooterActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
`;

class OrderFormModal extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      // "stripe": null,
      "auditOrderFormIsVisible": false,
      "auditGiveSpecificFeedback": false,
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
    this.handleShow = this.handleShow.bind( this );
    this.handleClose = this.handleClose.bind( this );
  }

  handleShow() {
    this.setState( {
      ...this.state,
      "auditOrderFormIsVisible": true,
    } );
  }

  handleClose() {
    this.setState( {
      ...this.state,
      "auditOrderFormIsVisible": false,
    } );
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
    return (
      <>
        <Modal show={ this.state.auditOrderFormIsVisible } onHide={ this.handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Audit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" required />
              </Form.Group>
              { /* <Form.Group controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control />
              </Form.Group> */ }
              <Form.Group controlId="email">
                <Form.Label>E-mail Address</Form.Label>
                <Form.Control name="emailAddress" type="email" />
              </Form.Group>
              <Form.Group controlId="web-address">
                <Form.Label>Web Address</Form.Label>
                <Form.Control name="webAddress" type="url" />
              </Form.Group>
              <fieldset style={ { "border": "none" } }>
                <Form.Label as="legend">What type of feedback do you want?</Form.Label>
                <Form.Group onChange={ ( event ) => {
                  let auditGiveSpecificFeedback = null;

                  switch ( event.target.value ) {
                    case "specific":
                      auditGiveSpecificFeedback = true;
                      break;

                    case "general":
                    default:
                      auditGiveSpecificFeedback = false;
                      break;
                  }

                  this.setState( { ...this.state, auditGiveSpecificFeedback } );
                } }>
                  <Form.Check
                    id="general-feedback"
                    type="radio"
                    name="feedbackType"
                    value="general"
                    label="General first impressions"
                    defaultChecked
                  />
                  <Form.Check
                    id="specific-feedback"
                    type="radio"
                    name="feedbackType"
                    value="specific"
                    label="Focus on these areas:"
                  />
                  <Form.Control as="textarea" name="description" rows="5" hidden={ this.state.auditGiveSpecificFeedback !== true } />
                </Form.Group>
              </fieldset>
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
            </Form>
          </Modal.Body>
          <Modal.Footer style={ { "flexDirection": "column", "alignItems": "flex-end" } }>
            <Form.Group as={ Form.Row } controlId="total">
              <Form.Label column>Total:</Form.Label>
              <Col>
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
              </Col>
            </Form.Group>
            <div>
              <a href="#" onClick={ this.handleClose }>Cancel</a>
              <button>Checkout</button>
            </div>
          </Modal.Footer>
        </Modal>
        <button className="cta" onClick={ this.handleShow }>Order</button> — 4 spots left in { moment().format( "MMMM" ) }
      </>
    );
  }
}

export default OrderFormModal;
