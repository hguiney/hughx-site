import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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
  justify-content: space-evenly;
  justify-content: space-between;

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
    filter: grayscale(100%) contrast(0%) brightness(75%);
    transition: filter .25s ease;

    &:hover, &:focus {
      filter: none !important;
    }
  }

  &:hover > .media, &:focus > .media {
    filter: none !important;
  }
`;

const getHeading = ( mode ) => {
  if ( mode === "casual" ) {
    return <h3 style={ { "fontWeight": "normal" } }>Companies I’ve worked with:</h3>;
  }

  return <h3>Companies I’ve Worked With</h3>;
};

const getSrc = logo => (
  logo.src
    .replace( "logos/", "logos/rasterized/" )
    .replace( ".svg", ".png" )
);

const getSrcSet = ( logo ) => {
  const base = logo.width;
  const twoTimes = ( base * 2 );
  const threeTimes = ( base * 3 );

  let srcset = [];

  [base, twoTimes, threeTimes].forEach( ( width, index ) => {
    let density = "";

    if ( width > base ) {
      density = `@${index + 1}x`;
    }

    srcset.push( `${
      logo.src
        .replace( "logos/", "logos/rasterized/" )
        .replace( ".svg", `${density}.png` )
    } ${index + 1}x` );
  } );

  srcset = srcset.join( ", " );

  return srcset;
};

const Companies = props => (
  <Section>
    { getHeading( props.mode ) }
    <Logos>
      { props.logos.map( ( logo, index ) => (
        <Logo key={ logo.id } style={ {
          "gridColumnEnd": ( index === ( props.logos.length - 1 ) ? "span 3" : null ),
        } }>
          <picture className="media" style={ logo.style }>
            <source type="image/svg+xml" srcSet={ logo.src } />
            <img
              width={ logo.width }
              src={ getSrc( logo ) }
              srcSet={ getSrcSet( logo ) }
              alt={ logo.alt }
            />
          </picture>
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
