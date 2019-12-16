import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProgressiveImage from "./progressive-image";

import layout from "../util/layout";
import isNumeric from "../util/isNumeric";

const citizensLogo = "/images/logos/citizens-financial-group.svg";
const oxfamLogo = "/images/logos/oxfam-horizontal.svg";
const sapientLogo = "/images/logos/publicis-sapient.svg";
const runkeeperLogo = "/images/logos/runkeeper-asics.svg";
const reebokLogo = "/images/logos/reebok.svg";
const bostonGlobeLogo = "/images/logos/the-boston-globe.svg";
const wbGamesLogo = "/images/logos/wb-games-color.svg";

const logoSpacing = ".5rem";

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

  ${layout.medium} {
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
  }
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
    flex-basis: 33.3333%;

    &:last-child {
      flex-basis: 100%;
      grid-column-end: span 3;
    }

    &#citizens img {
      width: 250px;
    }
  }
`;

const getHeading = ( mode ) => {
  if ( mode === "casual" ) {
    return <h3 className="p">Companies I’ve worked with:</h3>;
  }

  return <h3>Companies I’ve Worked With</h3>;
};

const Companies = ( props ) => (
  <Section>
    { getHeading( props.mode ) }
    <Logos>
      { props.logos.map( ( logo, index ) => (
        <Logo id={ logo.id } key={ logo.id }>
          <ProgressiveImage className="media" img={ logo } />
        </Logo>
      ) ) }
    </Logos>
  </Section>
);

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
        // "filter": "grayscale(100%) contrast(100%) brightness(100%)",
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
