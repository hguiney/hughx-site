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
  margin: 1rem auto 1rem 0;
  text-align: left;
`;

const TwoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 100%;

  & > section {
    display: inline-block;
    background-color: #eee;
    padding: 1rem;
    flex: .5;
    text-align: left;
  }

  & > section + section {
    margin-top: 1rem;
  }

  @media only screen and (min-width: 40em) {
    & {
      flex-direction: row;
      // max-width: 75%;
    }

    & > section + section {
      margin-top: 0;
      margin-left: 1rem;
    }
  }
`;

const OrderForm = styled.div`
  [role="presentation"] {
    margin-bottom: .75rem;
  }
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
                <h4>Development</h4>
                <ul>
                  <li>HTML5</li>
                  <li>CSS3 — <Incl /> SASS &amp; Less</li>
                  <li>JavaScript — <Incl /> ES6+, Node.js, &amp; React</li>
                  <li>PHP — <Incl /> WordPress themes &amp; plugins</li>
                  <li>SEO<sup>1</sup> &amp; Performance</li>
                </ul>
              </section>
              <section>
                <h4>Design</h4>
                <ul>
                  <li><abbr title="User Interface">UI</abbr>/<abbr title="User Experience">UX</abbr> (Look &amp; Feel)</li>
                  <li>Information Architecture</li>
                  <li>Usability/Accessibility<sup>2</sup></li>
                  <li>Copywriting</li>
                  <li>Branding</li>
                </ul>
              </section>
            </TwoColumns>
            <footer style={ { "marginTop": ".75rem" } }>
              <small>
                <p><sup>1</sup> Best practices only. I do not guarantee search engine ranking.</p>
                <p><sup>2</sup> Best practices only. I do not guarantee compliance with government regulations.</p>
              </small>
            </footer>
          </article>
          <article>
            <h2>Packages</h2>
            <Product>
              <h3>Audit</h3>
              <p>I test-drive your existing app or site. You will get a list of actionable feedback from me on ways to improve the product.</p>
              <p>For an additional fee, I’ll send you a screencast of me using your product with real-time first impressions. If you allow me to post the video publicly to promote my services however, you get it for free.</p>
              <OrderForm>
                <form onSubmit={ this.onSubmit }>
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
                        { " " }
                        Add screencast: {
                          (
                            this.state.products.auditVideo.inCart
                            && this.state.products.auditVideo.waiveFee
                          )
                            ? <><del><ProductPrice product="auditVideo" /></del> $0</>
                            : <ProductPrice product="auditVideo" />
                        }
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
                        { " " }
                        Waive fee — I agree to let my video be made public.
                    </label>
                    </dd>
                    <dt><label>Total:</label></dt>
                    <dd><output>{
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
                  <p><button type="submit">Order Now</button> — 4 spots left in { moment().format( "MMMM" ) }</p>
                </form>
              </OrderForm>
            </Product>
            <Product>
              <h3>Iterate</h3>
              <p>We join forces to launch the next phase of your app or site. Go from idea to prototype, MVP to v1, or buggy to stable.</p>
              <p>Weekly rate: <ProductPrice product="iterate" /> (one-week minimum)</p>
            </Product>
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
