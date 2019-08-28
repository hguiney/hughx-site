import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import moment from "moment";

import TwoColumns from "./two-columns";
import FinePrint from "./fine-print";

const Product = styled.article`
  // margin: 1rem auto 1rem 0;
  text-align: left;
  display: inline-block;
  display: grid !important;
  grid-template-areas:
    "heading"
    "description"
    "pricing"
    "cta"
  ;
  grid-template-rows: min-content auto auto min-content;

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
`;

const ProductDescription = styled.div`
  grid-area: description;
  align-self: start;
`;

const ProductCTA = styled.p`
  grid-area: cta;
  align-self: end;
  margin-top: 1rem;
`;

const OrderForm = styled.form`
  margin-bottom: 0;

  & > dl {
    margin-bottom: 0;
  }

  [role="presentation"] {
    margin-bottom: .75rem;
  }
`;

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

class Packages extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      "products": {
        "audit": {
          "inCart": false,
          "value": Packages.getPrice( "weekendly" ),
        },
        "auditVideo": {
          "inCart": false,
          "value": Packages.getPrice( "hourly" ),
          "waiveFee": false,
        },
        "iterate": {
          "inCart": false,
          "value": Packages.getPrice( "weekly" ),
        },
      },
    };

    this.handleChange = this.handleChange.bind( this );
    this.onSubmit = this.handleSubmit.bind( this );
  }

  static getPrice( rate ) {
    const hourlyRate = 125;
    let multiplier;
    let giveDiscount = false;
    let psychologicalPricingSubtrahend = 50;
    // psychologicalPricingSubtrahend = 0;
    const discount = ( 1 / 10 );

    switch ( rate ) {
      case "hourly":
        multiplier = 1;
        psychologicalPricingSubtrahend = 0;
        break;

      case "daily":
        multiplier = 8;
        break;

      case "weekendly":
        multiplier = 16;
        // psychologicalPricingSubtrahend = 12.5;
        break;

      case "weekly":
        multiplier = 40;
        // psychologicalPricingSubtrahend = 25;
        break;

      case "semimonthly":
        multiplier = 80;
        break;

      case "monthly":
        multiplier = 160;
        // psychologicalPricingSubtrahend = 50;
        giveDiscount = true;
        break;

      default:
    }

    const baseRate = hourlyRate * multiplier;
    const discountedPrice = baseRate - ( giveDiscount ? ( baseRate * discount ) : 0 ) - psychologicalPricingSubtrahend;

    return {
      "price": discountedPrice,
      discount,
      "isDiscounted": giveDiscount,
      "originalPrice": baseRate,
    };
  } // getPrice

  handleChange( event ) {
    const { target } = event;
    const value = ( target.type === "checkbox" ? target.checked : target.value );
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
    const ProductPrice = ( props ) => {
      const { value, discount, isDiscounted } = this.state.products[props.product];
      return <>
        <Price value={ value.price } { ...props } />
        { isDiscounted && <span>{ ` (${discount * 100}% off vs. weekly)` }</span> }
      </>;
    };

    ProductPrice.propTypes = {
      "product": PropTypes.string,
      // "rate": PropTypes.string,
    };

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
              <OrderForm id="audit-order-form" onSubmit={ this.onSubmit }>
                <dl>
                  <ProductPrice product="audit" renderText={ price => <dt>{ price }</dt> } />
                  <dd>
                    <label>
                      <input
                        type="checkbox"
                        name="auditVideo.inCart"
                        checked={ this.state.products.auditVideo.inCart }
                        onChange={ this.handleChange }
                      />
                      <span>
                        { " " }
                        Add screencast: {
                          (
                            this.state.products.auditVideo.inCart
                            && this.state.products.auditVideo.waiveFee
                          )
                            ? <><del><ProductPrice product="auditVideo" /></del> $0</>
                            : <ProductPrice product="auditVideo" />
                        }
                      </span>
                    </label>
                  </dd>
                  <dd>
                    <label className={ this.state.products.auditVideo.inCart ? "" : "disabled" }>
                      <input
                        type="checkbox"
                        name="auditVideo.waiveFee"
                        checked={
                          this.state.products.auditVideo.inCart
                          && this.state.products.auditVideo.waiveFee
                        }
                        onChange={ this.handleChange }
                        disabled={ !this.state.products.auditVideo.inCart }
                      />
                      <span>
                        { " " }
                        Waive fee — I agree to let my video be made public.
                      </span>
                    </label>
                  </dd>
                  <dt className="inline"><label>Total:</label></dt>
                  <dd className="inline"><output>{
                    <Price value={
                      (
                        this.state.products.auditVideo.inCart
                        && !this.state.products.auditVideo.waiveFee
                      )
                        ? ( this.state.products.audit.value.price + this.state.products.auditVideo.value.price )
                        : this.state.products.audit.value.price
                    } />
                  }</output></dd>
                </dl>
              </OrderForm>
            </ProductPricing>
            <ProductCTA>
              <button type="submit" form="audit-order-form">Order</button> — 4 spots left in { moment().format( "MMMM" ) }
            </ProductCTA>
          </Product>
          <Product>
            <ProductName>Iterate</ProductName>
            <ProductDescription>
              <p>I’ll work hands-on with your team to improve your app or site, one week at a time. Add a new feature, fix bugs, give your <abbr>UI</abbr> a facelift, improve your process… If it can be done in a week, we’ll make it happen.</p>
            </ProductDescription>
            <ProductPricing>
              <dl>
                <dt><ProductPrice product="iterate" />/week</dt>
                <dd>10% bulk discount available for every four weeks purchased upfront.</dd>
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
            </ProductPricing>
            <ProductCTA>
              <button>Get in touch</button>
            </ProductCTA>
          </Product>
        </TwoColumns>
        <FinePrint>
          <small>
            { /* <p><sup>†</sup> I offer weekly pricing instead of hourly as it aligns incentives: I don’t make less by working quickly, and you don’t pay more for unexpected obstacles. You also become my top priority for the week instead of being one of many hourly clients.</p>
            <p>One week is good for </p> */ }
          </small>
        </FinePrint>
      </article>
    );
  }
}

export default Packages;
