import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import introImage from "../images/helloquence-5fNmWej4tAA-unsplash.jpg";
import techBackground from "../images/use_your_illusion_@2X.png";
import deskImage from "../images/apple-desk-desktop-38568.jpg";

const Article = styled.article`
  // max-width: 39rem;
  margin-left: auto;
  margin-right: auto;
  // background-image: linear-gradient(rgba(0,0,0,0.6666), rgba(0,0,0,0.6666)), url(${introImage});
  // background-image: url(${techBackground});
  // background-image: linear-gradient(rgba(0,0,0,0.6666), rgba(0,0,0,0.6666)), url(${deskImage});
  background-size: cover;
  background-repeat: no-repeat;
  min-height: calc(100vh - 89px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // color: white;
  // text-shadow: 2px 2px 1px rgba(0,0,0,.5);
  padding: 3rem 1.5rem;
  margin-bottom: 1.45rem;
  font-family: sans-serif;
  line-height: 1.5;
  font-size: 1.25rem;
  margin-top: -1.5rem;

  // img {
  //   // max-height: 75vh;
  //   display: block;
  //   margin-left: auto;
  //   margin-right: auto;
  // }

  & > p {
    margin-bottom: 0;
  }
`;

const Companies = styled.section`
  text-align: left;
  width: 39rem;
  margin-top: 1.5rem;
`;

const Intro = props => (
  <Article>
    { /* <img src={ deskImage } /> */ }
    <h2>{ props.heading }</h2>
    <p>Hi, my name’s Hugh Guiney (<abbr style={ { "borderBottom": 0 } } title="pronounced">🗣 </abbr>GUY-knee). I’m a UX Developer, which means I design and develop delightful user interfaces. I’ve worked with organizations of all shapes and sizes, from startups to <abbr>SMBs</abbr> to household names. In my spare time I hack on open-source software and study Japanese. </p>
    <Companies>
      <h3>Companies I’ve Worked With</h3>

    </Companies>
  </Article>
);

Intro.propTypes = {
  "heading": PropTypes.string,
};

export default Intro;
