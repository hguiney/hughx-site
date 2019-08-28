import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";

import layout from "../util/layout";
import isNumeric from "../util/isNumeric";

import citizensLogo from "../images/logos/citizens-financial-group.svg";
import oxfamLogo from "../images/logos/oxfam-horizontal.svg";
import sapientLogo from "../images/logos/publicis-sapient.svg";
import runkeeperLogo from "../images/logos/runkeeper-asics.svg";
import reebokLogo from "../images/logos/reebok.svg";
import bostonGlobeLogo from "../images/logos/the-boston-globe.svg";
import wbGamesLogo from "../images/logos/wb-games-color.svg";

const logoSpacingX = "1rem";
const logoSpacingY = ".5rem";

const Section = styled.section`
  text-align: left;
  width: 39rem;
  max-width: 100%;
  margin-top: 1.5rem;
`;

const Logos = styled.div`
  margin-left: -${logoSpacingY};
  margin-right: -${logoSpacingY};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  justify-content: space-between;

  ${layout.medium} {
    display: grid;
    // grid-gap: ${logoSpacingY};
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    // margin: 0;
  }
`;

const Logo = styled.span`
  display: inline-block;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  // padding: ${logoSpacingY} ${logoSpacingX};
  // margin: ${logoSpacingY} ${logoSpacingX};
  // margin: .5rem;
  padding: .5rem;
  // background-color: #eee;
  // border: 1px solid black;
  transition: background-color .25s linear;
  // height: 150px;

  // ${layout.large} {
  //   margin: 0;
  // }

  &:hover, &:focus {
    background-color: white;
  }

  img {
    display: inline-block;
    margin: 0 auto;
    // max-width: 80%;
    // max-height: 80%;
    filter: grayscale(100%) contrast(0%) brightness(75%);
    transition: filter .25s ease;

    &:hover, &:focus {
      filter: none !important;
    }
  }

  &:hover > img, &:focus > img {
    filter: none !important;
  }
`;

const getHeading = ( mode ) => {
  if ( mode === "casual" ) {
    return <h3 style={ { "fontWeight": "normal" } }>Companies I’ve worked with:</h3>;
  }

  return <h3>Companies I’ve Worked With</h3>;
};


const Companies = ( props ) => {
  const data = useStaticQuery( graphql`
    query {
      allFile(filter: { relativePath: { in: "logos" } }) {
        edges {
          node {
            extension
            dir
            modifiedTime
          }
        }
      }
    }
  ` );

  console.log( data );

  return (
    <Section>
      { getHeading( props.mode ) }
      <Logos>
        { props.logos.map( ( logo, index ) => (
          <Logo key={ logo.id } style={ {
            "gridColumnEnd": ( index === ( props.logos.length - 1 ) ? "span 3" : "auto" ),
          } }>
            <img { ...logo } />
          </Logo>
        ) ) }
      </Logos>
    </Section>
  );
};

Companies.propTypes = {
  "mode": PropTypes.oneOf( ["casual", "formal"] ),
  "logos": PropTypes.arrayOf( PropTypes.shape( {
    "id": PropTypes.string,
    "width": isNumeric,
    "src": PropTypes.string,
    "alt": PropTypes.string.isRequired,
    "style": PropTypes.object,
  } ) ),
};

Companies.defaultProps = {
  "mode": "formal",
  "logos": [
    {
      "id": "runkeeper",
      "width": "250",
      "src": runkeeperLogo,
      "alt": "Runkeeper",
    },
    {
      "id": "oxfam",
      "width": "150",
      "src": oxfamLogo,
      "alt": "Oxfam",
    },
    {
      "id": "sapient",
      "width": "110",
      "src": sapientLogo,
      "alt": "Publicis Sapient",
    },
    {
      "id": "citizens",
      "width": "180",
      "src": citizensLogo,
      "alt": "Citizens Financial Group, Inc.",
    },
    {
      "id": "wb-games",
      "width": "75",
      "src": wbGamesLogo,
      "alt": "WB Games",
      "style": {
        "filter": "grayscale(100%) contrast(100%) brightness(100%)",
      },
    },
    {
      "id": "reebok",
      "width": "150",
      "src": reebokLogo,
      "alt": "Reebok",
    },
    {
      "id": "the-boston-globe",
      "width": "250",
      "src": bostonGlobeLogo,
      "alt": "The Boston Globe",
    },

  ],
};

export default Companies;
