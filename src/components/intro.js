import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Companies from "./companies";

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
  padding: 3rem 1.5rem;
  margin-bottom: 1.45rem;
  font-family: sans-serif;
  line-height: 1.5;
  font-size: 1.25rem;
  // margin-top: -1.5rem;
  max-width: 100%;

  & > p {
    margin-bottom: 0;
  }
`;

const Intro = props => (
  <Article>
    { /* <img src={ deskImage } /> */ }
    <h2>{ props.heading }</h2>
    <p>Hi, my name’s Hugh Guiney (<abbr style={ { "borderBottom": 0 } } title="pronounced">🗣 </abbr>GUY-knee). I’m a UX Developer, which means I design and develop delightful user interfaces. I’ve worked with organizations of all shapes and sizes, from startups to <abbr>SMBs</abbr> to household names. In my spare time I hack on open-source software and study Japanese. </p>
    <Companies mode="casual" />
  </Article>
);

Intro.propTypes = {
  "heading": PropTypes.string,
};

export default Intro;
