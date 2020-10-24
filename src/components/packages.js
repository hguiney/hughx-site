// import { Elements, StripeProvider } from "react-stripe-elements";
import React, { useState } from "react";

import {
  Modal, InputGroup, FormControl, Button,
} from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactGA from "react-ga";
import CheckoutForm from "./checkout-form";
import FinePrint from "./fine-print";
import OrderFormModal from "./order-form-modal";
import Price from "./price";
import ProductPrice from "./product-price";
import TwoColumns from "./two-columns";
import getPrice from "../util/getPrice";
import ProgressiveImage from "./progressive-image";
import EmailAddress, { CopiedToClipboardToast } from "./email-address";
import { isInternalTraffic } from "../util/analytics";

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

// const CopyToClipboard = () => <button>📋</button>;

const ClipboardButton = styled( Button )`
  line-height: 1 !important;
`;

const CopyToClipboardButton = () => (
  <ClipboardButton
    aria-label="Copy to clipboard"
    title="Copy to clipboard"
  >
    <ProgressiveImage
      img={ {
        "src": clipboardIcon,
        "width": 17,
        "alt": "icon: clipboard with arrow pointing inward",
        // "style": {},
        "loading": "lazy",
      } }
    />
  </ClipboardButton>
);

// const Section = styled.section``;

const videoAddOnPrice = getPrice( "hourly" ).value;

class Packages extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      "contactModalIsVisible": false,
      "copiedToClipboardToastIsVisible": false,
    };

    this.showContactModal = this.showContactModal.bind( this );
    this.hideContactModal = this.hideContactModal.bind( this );
    this.showCopiedToClipboardToast = this.showCopiedToClipboardToast.bind( this );
    this.hideCopiedToClipboardToast = this.hideCopiedToClipboardToast.bind( this );
  }

  showContactModal() {
    this.setState( {
      ...this.state,
      "contactModalIsVisible": true,
    } );
  }

  hideContactModal() {
    this.setState( {
      ...this.state,
      "contactModalIsVisible": false,
    } );
  }

  showCopiedToClipboardToast() {
    this.setState( {
      ...this.state,
      "copiedToClipboardToastIsVisible": true,
    } );

    if ( !isInternalTraffic() ) {
      ReactGA.event( {
        "category": "Link",
        "action": "Click",
        "label": "E-mail (Packages CTA)",
      } );
    }
  }

  hideCopiedToClipboardToast() {
    this.setState( {
      ...this.state,
      "copiedToClipboardToastIsVisible": false,
    } );
  }

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
              <p>You’ll get a list of actionable feedback from me on ways to improve your app or site. For an additional fee of ${ videoAddOnPrice }, I’ll send you a screencast of me using your product with real-time commentary. (Fee waived if you give me permission to use the video for marketing purposes.)</p>
            </ProductDescription>
            <ProductPricing>
              <dl>
                <dt hidden>Price</dt>
                <ProductPrice
                  product={ getPrice( "weekendly" ) }
                  renderText={ ( price ) => <dd className="price">{ price }</dd> }
                />
              </dl>
              { /* <ProductCTA>
                <OrderFormModal></OrderFormModal>
              </ProductCTA> */ }
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
              { /* <ProductCTA>
                <button>Get in touch</button>
              </ProductCTA> */ }
            </ProductPricing>
          </Product>
        </TwoColumns>
        <FinePrint style={ { "position": "relative", "marginTop": ".25rem" } }>
          { /* <a href="#" onClick={ ( event ) => { this.showContactModal(); event.preventDefault(); } }>contact me</a> */ }
          { /* <Modal show={ this.state.contactModalIsVisible }>
            <Modal.Header>Contact</Modal.Header>
            <Modal.Body>
              <a href="mailto:hugh@hughguiney.com">hugh@hughguiney.com</a>
            </Modal.Body>
            <Modal.Footer>
              <a href="#" onClick={ ( event ) => { this.hideContactModal(); event.preventDefault(); } }>Close</a>
              <CopyToClipboard text="hugh@hughguiney.com" onCopy={ this.hideContactModal }>
                <Button>Copy to clipboard</Button>
              </CopyToClipboard>
            </Modal.Footer>
          </Modal> */ }
          { /* <InputGroup
            as="span"
            size="sm"
            style={ {
              "width": "10em",
              "margin": "0 .3333em",
              "display": "inline-flex",
            } }
          >
            <FormControl type="text" value="hugh@hughguiney.com" readOnly onFocus={ ( event ) => event.target.select() } />
            <InputGroup.Append as="span">
              <CopyToClipboard text="hugh@hughguiney.com" onCopy={  }>
                <ClipboardButton
                  aria-label="Copy to clipboard"
                  title="Copy to clipboard"
                >
                  <ProgressiveImage
                    img={ {
                      "src": clipboardIcon,
                      "width": 17,
                      "alt": "icon: clipboard with arrow pointing inward",
                      // "style": {},
                      "loading": "lazy",
                    } }
                  />
                </ClipboardButton>
              </CopyToClipboard>
            </InputGroup.Append>
          </InputGroup> */ }
          <p>To order either package, e-mail me at <EmailAddress onCopy={ this.showCopiedToClipboardToast } /> with a link to your site or app and a description of what you need help with. If your project is a fit for my skill set and availability we’ll get started as soon as possible.</p>
          <CopiedToClipboardToast
            show={ this.state.copiedToClipboardToastIsVisible }
            onClose={ this.hideCopiedToClipboardToast }
            autohide
          />
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
