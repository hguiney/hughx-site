import { Elements, StripeProvider } from "react-stripe-elements";
import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import CheckoutForm from "./checkout-form";
import FinePrint from "./fine-print";
import OrderFormModal from "./order-form-modal";
import Price from "./price";
import ProductPrice from "./product-price";
import TwoColumns from "./two-columns";
import getPrice from "../util/getPrice";

const Product = styled.article`
  // margin: 1rem auto 1rem 0;
  text-align: left;
  display: inline-block;
  display: grid !important;
  grid-template-areas:
    "heading"
    "description"
    "pricing"
    // "cta"
  ;
  grid-template-rows: min-content 1fr min-content;

  & > :last-child {
    margin-bottom: 0;
    align-self: end;
  }
`;

const ProductName = styled.h3`
  grid-area: heading;
  align-self: start;
`;

const ProductPricing = styled.div`
  grid-area: pricing;
  align-self: start;
  // border-top: 1px solid rgba(0,0,0,0.25);
  // padding-top: 1rem;

  & > :last-child {
    margin-bottom: 0;
  }
`;

const ProductDescription = styled.div`
  grid-area: description;
  align-self: start;
`;

const ProductCTA = styled.div`
  grid-area: pricing;
  align-self: end;
  margin-top: 1rem;
`;

// const OrderForm = styled.form`
//   margin-bottom: 0;

//   & > dl {
//     margin-bottom: 0;
//   }

//   [role="presentation"] {
//     margin-bottom: .75rem;
//   }
// `;

const formControlStyles = `
  width: 100%;
  padding: .25rem .5rem;
  fontFamily: monospace;
  border: 1px solid #aaa;
`;

const TextArea = styled.textarea`
  ${formControlStyles}
`;

const Input = styled.input`
  ${formControlStyles}
`;

// const Section = styled.section``;

class Packages extends React.PureComponent {
  // componentDidMount() {
  //   if ( window.Stripe ) {
  //     this.setState( { "stripe": window.Stripe( "pk_test_12345" ) } );
  //   } else {
  //     document.querySelector( "#stripe-js" ).addEventListener( "load", () => {
  //       // Create Stripe instance once Stripe.js loads
  //       this.setState( { "stripe": window.Stripe( "pk_test_12345" ) } );
  //     } );
  //   }
  // }
  render() {
    return (
      <article id="packages">
        <h2>Packages</h2>
        <TwoColumns>
          <Product>
            <ProductName>Audit</ProductName>
            <ProductDescription>
              <p>You’ll get a list of actionable feedback from me on ways to improve your app or site. For an additional fee, I’ll send you a screencast of me using your product with real-time commentary. (Fee waived if you give me permission to share it publicly.)</p>
            </ProductDescription>
            <ProductPricing>
              <dl>
                <dt hidden>Price</dt>
                <ProductPrice
                  product={ getPrice( "weekendly" ) }
                  renderText={ ( price ) => <dd className="price">{ price }</dd> }
                />
              </dl>
              <ProductCTA>
                <OrderFormModal></OrderFormModal>
              </ProductCTA>
              { /* <OrderForm id="audit-order-form" onSubmit={ this.onSubmit }></OrderForm> */ }
            </ProductPricing>
          </Product>
          <Product>
            <ProductName>Iterate</ProductName>
            <ProductDescription>
              <p>I’ll work hands-on with your team to improve your app or site, one week at a time. Add a new feature, fix bugs, give your <abbr>UI</abbr> a facelift, improve your process… If it can be done in a week, we’ll make it happen.</p>
            </ProductDescription>
            <ProductPricing>
              <dl>
                <dt hidden>Price</dt>
                <ProductPrice
                  product={ getPrice( "weekly" ) }
                  renderText={ ( price ) => <dd className="price">{ price }/week</dd> }
                />
              </dl>
              { /* <Modal>
              <dl>
                <dt style={ { "fontWeight": "normal" } }>
                  <label htmlFor="email">E-mail</label>
                </dt>
                <dd>
                  <Input id="email" type="email" name="email" />
                </dd>
                <dt style={ { "fontWeight": "normal" } }>
                  <label htmlFor="project-description">What do you need help with?</label>
                </dt>
                <dd>
                  <TextArea id="project-description" rows="5"></TextArea>
                </dd></dl>
              </Modal> */ }
              <ProductCTA>
                { /* <button>Get in touch</button> */ }
                <p>To order, e-mail <a href="mailto:hugh@hughx.dev">hugh@hughx.dev</a> <button>📋</button> with a description of your project.</p>
              </ProductCTA>
            </ProductPricing>
          </Product>
        </TwoColumns>
        <FinePrint>
          <p>For general inquiries, </p>
          { /* <small>
            <p><sup>†</sup> I offer weekly pricing instead of hourly as it aligns incentives: I don’t make less by working quickly, and you don’t pay more for unexpected obstacles. You also become my top priority for the week instead of being one of many hourly clients.</p>
            <p>One week is good for </p>
          </small> */ }
        </FinePrint>
      </article>
    );
  }
}

export default Packages;
