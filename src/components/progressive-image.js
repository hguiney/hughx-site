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

const isPng = ( src ) => {
  const dataUriMatch = src.match( /^data:image\/([^;]+);base64,/ );
  const fileUriMatch = src.match( /\.png$/ );

  return (
    ( ( dataUriMatch !== null ) && ( dataUriMatch[1] === "png" ) )
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

const getSrcSet = ( logo, webp ) => {
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
        .replace( "images/", ( ( isSvg( logo.src ) || ( webp && isPng( logo.src ) ) ) ? "images/rasterized/" : "images/" ) )
        .replace( /\.(?:svgz?|png)/, `${density}.${webp ? "webp" : "png"}` )
    } ${index + 1}x` );
  } );

  srcset = srcset.join( ", " );

  return srcset;
};

const getSources = ( img ) => {
  const imgIsBase64 = isBase64( img.src );
  const imgIsSvg = isSvg( img.src );
  const imgIsPng = isPng( img.src );
  const sources = [];

  if ( !imgIsBase64 ) {
    // Additive:
    // if ( imgIsSvg ) {
    //   sources.push( <source type="image/svg+xml" srcSet={ img.src } /> );
    // }
    //
    // if ( imgIsSvg || imgIsPng ) {
    //   sources.push( <source type="image/webp" srcSet={ getSrcSet( img, true ) } /> );
    // }

    // Exclusive:
    if ( imgIsSvg ) {
      sources.push( <source key={ `${img.src}--svg` } type="image/svg+xml" srcSet={ img.src } /> );
    } else if ( imgIsPng ) {
      sources.push( <source key={ `${img.src}--webp` } type="image/webp" srcSet={ getSrcSet( img, true ) } /> );
    }
  }

  return <>{ sources }</>;
};

const ProgressiveImage = ( {
  className, img, style, inlineSvg, children,
} ) => {
  let composedClassName = "";

  if ( className ) {
    composedClassName = `${className} hughx-progressive-image`;
  } else {
    composedClassName = "hughx-progressive-image";
  }

  if ( !isBase64( img.src ) && isSvg( img.src ) && inlineSvg ) {
    return (
      <span className={ composedClassName } style={ {
        "lineHeight": 0,
        // "display": "inline-flex",
        // "justifyContent": "flex-start",
        "display": "inline-block", // Fix for Safari
        ...style,
      } }>
        <svg
          viewBox={ img.viewBox || ( img.width ? `0 0 ${img.width} ${img.height || img.width}` : null ) }
          width={ img.width }
          height={ img.height }
          style={ img.style }
          className="hughx-progressive-image__renderer hughx-progressive-image__inline-svg"
        >
          <defs>
            { children }
          </defs>
          <desc>{ img.alt }</desc>
          <switch>
            <use xlinkHref={ `${img.src}#icon` } />
            <foreignObject>
              <picture className="hughx-progressive-image__inline-svg-fallback">
                <source type="image/webp" srcSet={ getSrcSet( img, true ) } />
                <img
                  width={ img.width }
                  height={ img.height }
                  src={ getSrc( img ) }
                  srcSet={ getSrcSet( img ) }
                  alt={ img.alt }
                  style={ img.style }
                  loading={ img.loading }
                />
              </picture>
            </foreignObject>
          </switch>
        </svg>
      </span>
    );
  }

  return (
    <picture className={ composedClassName } style={ {
      "lineHeight": 0,
      // "display": "inline-flex",
      // "justifyContent": "flex-start",
      "display": "inline-block",
      ...style,
    } }>
      { getSources( img ) }
      <img
        width={ img.width }
        height={ img.height }
        src={ getSrc( img ) }
        srcSet={ getSrcSet( img ) }
        alt={ img.alt }
        style={ img.style }
        loading={ img.loading }
        className="hughx-progressive-image__renderer"
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
    "loading": PropTypes.oneOf( ["lazy", "eager", "auto"] ),
  } ),
  "inlineSvg": PropTypes.bool,
};

export default ProgressiveImage;
