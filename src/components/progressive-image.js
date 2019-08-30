import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";

import isNumeric from "../util/isNumeric";

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

const ProgressiveImage = ( { className, img } ) => (
  <picture className={ className } style={ { ...img.style, "lineHeight": 0, "display": "inline-flex" } }>
    <source type="image/svg+xml" srcSet={ img.src } />
    <img
      width={ img.width }
      src={ getSrc( img ) }
      srcSet={ getSrcSet( img ) }
      alt={ img.alt }
    />
  </picture>
);

ProgressiveImage.propTypes = {
  "className": PropTypes.oneOfType( [PropTypes.string, PropTypes.object] ),
  "img": PropTypes.shape( {
    "id": PropTypes.string,
    "width": isNumeric,
    "src": PropTypes.string,
    "alt": PropTypes.string.isRequired,
    "style": PropTypes.object,
  } ),
};

export default ProgressiveImage;
