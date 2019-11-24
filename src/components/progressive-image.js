import React from "react";
import PropTypes from "prop-types";
// import styled from "styled-components";

import isNumeric from "../util/isNumeric";

const isSvg = ( src ) => {
  const dataUriMatch = src.match( /^data:image\/([^;]+);base64,/ );
  const fileUriMatch = src.match( /\.svgz?$/ );

  return (
    ( ( dataUriMatch !== null ) && ( dataUriMatch[1] === "svg+xml" ) )
    || ( fileUriMatch !== null )
  );
};

const getSrc = ( logo ) => {
  if ( isSvg( logo.src ) ) {
    return (
      logo.src
        .replace( "images/", "images/rasterized/" )
        .replace( ".svg", ".png" )
    );
  }

  return logo.src;
};

const isBase64 = src => ( /^data:image\/[^;]+;base64,/.test( src ) );

const getSrcSet = ( logo ) => {
  if ( isBase64( logo.src ) ) {
    return null;
  }

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
        .replace( "images/", ( isSvg( logo.src ) ? "images/rasterized/" : "images/" ) )
        .replace( /\.(?:svgz?|png)/, `${density}.png` )
    } ${index + 1}x` );
  } );

  srcset = srcset.join( ", " );

  return srcset;
};

const ProgressiveImage = ( { className, img, style } ) => (
  <picture className={ className } style={ {
    "lineHeight": 0,
    "display": "inline-flex",
    "justifyContent": "flex-start",
    ...style,
  } }>
    {
      ( !isBase64( img.src ) && isSvg( img.src ) )
        ? <source type="image/svg+xml" srcSet={ img.src } />
        : null
    }
    <img
      width={ img.width }
      height={ img.height }
      src={ getSrc( img ) }
      srcSet={ getSrcSet( img ) }
      alt={ img.alt }
      style={ img.style }
    />
  </picture>
);

ProgressiveImage.propTypes = {
  "className": PropTypes.oneOfType( [PropTypes.string, PropTypes.object] ),
  "img": PropTypes.shape( {
    "id": PropTypes.string,
    "width": isNumeric,
    "height": isNumeric,
    "src": PropTypes.string,
    "alt": PropTypes.string.isRequired,
    "style": PropTypes.object,
  } ),
};

export default ProgressiveImage;
