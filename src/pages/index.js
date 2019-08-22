import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
// import moment from "moment";
import styled from "styled-components";

import NumberFormat from "react-number-format";
import moment from "moment";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PostPreview from "../components/post-preview";
// import PricingTable from "../components/pricing-table";

import layout from "../util/layout";

const Container = styled.div`
  padding: 0 ${layout.pageGutter} ${layout.pageGutter};
  max-width: 80vw;
  margin: 0 auto;
`;

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

const TwoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 100%;

  & > section,
  & > article {
    display: inline-block;
    background-color: #eee;
    padding: 1.5rem 1rem;
    flex: .5;
    text-align: left;
  }

  & > section + section,
  & > article + article,
  & > section + article,
  & > article + section {
    margin-top: 1rem;
  }

  @media only screen and (min-width: 40em) {
    & {
      flex-direction: row;
      // max-width: 75%;
    }

    & > section + section,
    & > article + article,
    & > section + article,
    & > article + section {
      margin-top: 0;
      margin-left: 1rem;
    }
  }
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

const FinePrint = styled.footer`
  margin-top: .75rem;
  line-height: 1.5;
`;

const formControlStyles = `
  width: 100%;
  padding: .25rem .5rem;
  font-family: monospace;
  border: 1px solid #aaa;
`;

const TextArea = styled.textarea`
  ${formControlStyles}
`;

const Input = styled.input`
  ${formControlStyles}
`;

// const Section = styled.section``;

const Incl = () => <abbr title="including">incl.</abbr>;
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

class IndexPage extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      "products": {
        "audit": {
          "inCart": false,
          "value": IndexPage.getPrice( "weekendly" ),
        },
        "auditVideo": {
          "inCart": false,
          "value": IndexPage.getPrice( "hourly" ),
          "waiveFee": false,
        },
        "iterate": {
          "inCart": false,
          "value": IndexPage.getPrice( "weekly" ),
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
    const { data } = this.props;
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
      <Layout>
        <SEO title="Hugh Guiney – UX Designer, Web Developer" />
        <Container>
          <article>
            <h2>Services</h2>
            <p>I offer experise in the following areas:</p>
            <TwoColumns>
              <section>
                <h3>Development</h3>
                <ul>
                  <li>HTML5</li>
                  <li>CSS3 — <Incl /> SASS &amp; Less</li>
                  <li>JavaScript ≥ ES6 — <Incl /> Node.js &amp; React</li>
                  <li>PHP — <Incl /> WordPress themes &amp; plugins</li>
                  { /* <li>SEO<sup>1</sup></li>
                  <li>Performance</li> */ }
                  <li>SEO<sup>1</sup> &amp; Performance</li>
                </ul>
              </section>
              <section>
                <h3>Design</h3>
                <ul>
                  <li><abbr title="User Interface">UI</abbr>/<abbr title="User Experience">UX</abbr> (Look &amp; Feel)</li>
                  <li>Information Architecture</li>
                  <li>Usability/Accessibility<sup>2</sup></li>
                  <li>Copyediting</li>
                  { /* <li>Branding</li> */ }
                  <li>Responsive Design</li>
                </ul>
              </section>
            </TwoColumns>
            <FinePrint>
              <small>
                <p><sup>1</sup> Best practices only. I do not guarantee search engine ranking.</p>
                <p><sup>2</sup> Best practices only. I do not guarantee compliance with government regulations.</p>
              </small>
            </FinePrint>
          </article>
          <article>
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
          <article>
            <h2>From the <Link to="/blog/">Blog</Link>:</h2>
            { data.posts.edges.map( edge => <PostPreview key={ edge.node.id } post={ edge.node } /> ) }
          </article>
        </Container>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  "data": PropTypes.object,
};

export default IndexPage;

export const pageQuery = graphql`
query IndexQuery(
  $now: Date!
) {
  posts: allStrapiPost(
    sort: {
      fields: [publishedAt],
      order: DESC
    },
    filter: {
      publishedAt: {
        lte: $now
      }
    },
    limit: 4
  ) {
    edges {
      node {
        id
        title
        publishedAt
        updatedAt
        coverArt {
          mime
          localFile {
            childImageSharp {
              fluid(maxWidth: 1200, maxHeight: 630) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        coverArtAltText
        body
      }
    }
  }
}
`;
