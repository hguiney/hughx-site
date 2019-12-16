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

const isBase64 = ( src ) => ( /^data:image\/[^;]+;base64,/.test( src ) );

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

const ProgressiveImage = ( {
  className, img, style, inlineSvg, children,
} ) => {
  if ( !isBase64( img.src ) && isSvg( img.src ) && inlineSvg ) {
    return (
      <picture className={ className } style={ {
        "lineHeight": 0,
        "display": "inline-flex",
        "justifyContent": "flex-start",
        ...style,
      } }>
        <svg
          viewBox={ img.viewBox || ( img.width ? `0 0 ${img.width} ${img.height || img.width}` : null ) }
          width={ img.width }
          height={ img.height }
          style={ img.style }
        >
          <defs>
            { children }
          </defs>
          <desc>{ img.alt }</desc>
          <switch>
            <use xlinkHref={ `${img.src}#icon` } />
            <foreignObject>
              <img
                width={ img.width }
                height={ img.height }
                src={ getSrc( img ) }
                srcSet={ getSrcSet( img ) }
                alt={ img.alt }
                style={ img.style }
              />
            </foreignObject>
          </switch>
        </svg>
      </picture>
    );
  }

  return (
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
};

ProgressiveImage.propTypes = {
  "className": PropTypes.oneOfType( [PropTypes.string, PropTypes.object] ),
  "img": PropTypes.shape( {
    "id": PropTypes.string,
    "width": isNumeric,
    "height": isNumeric,
    "viewBox": PropTypes.string,
    "src": PropTypes.string,
    "alt": PropTypes.string.isRequired,
    "style": PropTypes.object,
  } ),
  "inlineSvg": PropTypes.bool,
};

export default ProgressiveImage;
