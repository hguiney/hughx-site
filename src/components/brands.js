import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProgressiveImage from "./progressive-image";

import layout from "../util/layout";
import isNumeric from "../util/isNumeric";

const citizensBankLogo = "/images/logos/citizens-bank.svg";
const oxfamLogo = "/images/logos/oxfam-horizontal.svg";
const sapientLogo = "/images/logos/publicis-sapient.svg";
const runkeeperLogo = "/images/logos/runkeeper-asics.svg";
const reebokLogo = "/images/logos/reebok.svg";
const bostonGlobeLogo = "/images/logos/the-boston-globe.svg";
const wbGamesLogo = "/images/logos/wb-games-color.svg";
const cityOfBostonLogo = "/images/logos/city-of-boston.svg";

const logoSpacing = ".5rem";
const numberOfColumns = 3;

const Section = styled.section`
  text-align: left;
  width: 39rem;
  max-width: 100%;
  margin-top: 1.5rem;
`;

const Logos = styled.div`
  margin-left: -${logoSpacing};
  margin-right: -${logoSpacing};
  display: flex;
  flex-wrap: wrap;
`;

const Logo = styled.span`
  display: inline-block;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  padding: .5rem;
  transition: background-color .25s linear;

  &:hover, &:focus {
    background-color: white;
  }

  .media {
    display: inline-block;
    margin: 0 auto;

    img {
      // filter: grayscale(100%) contrast(0%) brightness(75%);
      transition: filter .25s ease;

      &:hover, &:focus {
        filter: none !important;
      }
    }
  }

  &:hover .media img, &:focus .media img {
    filter: none !important;
  }

  ${layout.medium} {
    height: 5.707222222222222rem;
    flex-basis: ${100 / numberOfColumns}%;

    &.span-3 {
      flex-basis: 100%;
    }

    &.span-1_5 {
      flex-basis: 50%;
    }

    &#citizens img {
      width: 250px;
    }
  }
`;

const getHeading = ( mode ) => {
  if ( mode === "casual" ) {
    return <h3 className="p">Brands I’ve worked with:</h3>;
  }

  return <h3>Brands I’ve Worked With</h3>;
};

const Brands = ( props ) => {
  const remainder = props.logos.length % numberOfColumns;
  const classNameStart = ( props.logos.length - 1 ) - remainder;
  let logoClassName;

  switch ( remainder ) { // eslint-disable-line default-case
    case 1:
      logoClassName = "span-3";
      break;

    case 2:
      logoClassName = "span-1_5";
      break;
  }

  return (
    <Section>
      { getHeading( props.mode ) }
      <Logos>
        { props.logos.map( ( logo, index ) => (
          <Logo id={ logo.id } key={ logo.id } className={ index > classNameStart && logoClassName }>
            <ProgressiveImage className="media" img={ logo } />
          </Logo>
        ) ) }
      </Logos>
    </Section>
  );
};

Brands.propTypes = {
  "mode": PropTypes.oneOf( ["casual", "formal"] ),
  "logos": PropTypes.arrayOf( PropTypes.shape( {
    "id": PropTypes.string,
    "width": isNumeric,
    "src": PropTypes.string,
    "alt": PropTypes.string.isRequired,
    "style": PropTypes.object,
    "loading": PropTypes.string,
  } ) ),
};

Brands.defaultProps = {
  "mode": "formal",
  "logos": [
    {
      "id": "runkeeper",
      "width": "250",
      "src": runkeeperLogo,
      "alt": "Runkeeper",
      "loading": "lazy",
    },
    {
      "id": "oxfam",
      "width": "150",
      "src": oxfamLogo,
      "alt": "Oxfam",
      "loading": "lazy",
    },
    {
      "id": "sapient",
      "width": "110",
      "src": sapientLogo,
      "alt": "Publicis Sapient",
      "loading": "lazy",
    },
    {
      "id": "citizens",
      "width": "180",
      "src": citizensBankLogo,
      "alt": "Citizens Bank",
      "loading": "lazy",
    },
    {
      "id": "wb-games",
      "width": "75",
      "src": wbGamesLogo,
      "alt": "WB Games",
      "style": {
        // "filter": "grayscale(100%) contrast(100%) brightness(100%)",
      },
      "loading": "lazy",
    },
    {
      "id": "reebok",
      "width": "150",
      "src": reebokLogo,
      "alt": "Reebok",
      "loading": "lazy",
    },
    {
      "id": "the-boston-globe",
      "width": "250",
      "src": bostonGlobeLogo,
      "alt": "The Boston Globe",
      "loading": "lazy",
    },
    {
      "id": "city-of-boston",
      "width": "250",
      "src": cityOfBostonLogo,
      "alt": "City of Boston",
      "style": {
        "position": "relative",
        "top": ".5rem",
        "marginBottom": ".5rem",
      },
      "loading": "lazy",
    },
  ],
};

export default Brands;
