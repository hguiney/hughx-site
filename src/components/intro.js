import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Img from "gatsby-image";
import { StaticQuery, graphql } from "gatsby";
import Companies from "./companies";

import layout from "../util/layout";

const Article = styled.article`
  margin-left: auto;
  margin-right: auto;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: calc(100vh - 89px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  margin-bottom: 1.45rem;
  // font-family: sans-serif;
  line-height: 1.5;
  font-size: 1.25rem;
  // margin-top: -1.5rem;
  max-width: 100%;
  // background-image: url(https://images.unsplash.com/photo-1519332978332-21b7d621d05e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2468&amp;q=80);
  // background-image: url(${iPhone});
  // background-size: contain;
  // background-position: bottom left;
  // margin-top: -5rem;
  // padding-top: 5rem;
  // background-color: #aaa;

  & > p {
    margin-bottom: 0;
  }
`;

const Devices = styled.div`
  // max-width: 80vw;
  // height: 50vh;
  // height: 100%;
  // text-align: center;
  max-width: 43rem;
  /* border: 1px solid black; */
  margin-left: auto;
  margin-right: auto;

  img,
  .gatsby-image-wrapper {
    display: inline-block;
    // max-height: 75%;
    position: relative;
    vertical-align: bottom;
    max-width: 100%;
  }

  .iphone,
  .iphone.gatsby-image-wrapper {
    z-index: 1;
    // max-height: 44.4444vh;
  }

  .imac,
  .imac.gatsby-image-wrapper {
    top: 0.25rem;
    // max-height: 66.6667vh;
    // max-height: calc(66.6667vh - 1.5rem);
    display: none;
  }

  ${layout.large} {
    .iphone,
    .iphone.gatsby-image-wrapper {
      left: 1.5rem;
      width: 22% !important;
    }

    .imac,
    .imac.gatsby-image-wrapper {
      right: 1.5rem;
      display: inline-block;
      width: 78% !important;
    }
  }
`;

const Hero = styled.div`
  // height: 66.6666vh;
  // height: calc(66.6666vh - 6rem);
  // margin-top: -8rem;
  text-align: center;
  // border: 1px solid black;
  width: 100%;
  // padding-top: 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem 0;

  h2 {
    font-size: 2.5rem;
    // font-size: 2.18rem;
    max-width: 40rem;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Intro = ( props ) => (
  <Article>
    <Hero>
      <h2 className="h1">{ props.heading }</h2>
      <Devices>
        <StaticQuery
          query={ graphql`
            query {
              imac: file(relativePath: { eq: "imac.png" }) {
                childImageSharp {
                  fixed(width: 604, webpQuality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              },
              iphone: file(relativePath: { eq: "iphone-xs.png" }) {
                childImageSharp {
                  fixed(width: 171, webpQuality: 100) {
                    ...GatsbyImageSharpFixed_withWebp
                  }
                }
              }
            }
          ` }
          render={ ( data ) => (
            <>
              <Img
                className="iphone"
                fixed={ data.iphone.childImageSharp.fixed }
                alt="iPhone XS displaying a dark blue grinning emoji against a white background with gray dots"
              />
              <Img
                className="imac"
                style={ {
                  "display": null,
                } }
                fixed={ data.imac.childImageSharp.fixed }
                alt="iMac Pro displaying “hughx” in dark blue (with the “u” and “x” in light blue) against a white background with gray dots"
              />
            </>
          ) }
        />
      </Devices>
    </Hero>
    <p>Hi, my name’s Hugh Guiney (<abbr style={ { "borderBottom": 0 } } title="pronounced">🗣 </abbr>GUY-knee). I’m a UX Developer, which means I design and code thoughtful digital products. I’ve worked with organizations of all sizes, from startups to <abbr>SMBs</abbr> to household names. In my spare time I build open-source software, make movies, and study Japanese.</p>
    <Companies mode="casual" />
  </Article>
);

Intro.propTypes = {
  "heading": PropTypes.string,
};

export default Intro;
