/* eslint-disable import/no-extraneous-dependencies */
// const fs = require( "fs" );
const path = require( "path" );
// const { exec } = require( "child_process" );
const glob = require( "glob" );
// const mkdirp = require( "mkdirp" );
const rimraf = require( "rimraf" );
const webp = require( "webp-converter" );

const rasterizedDirectory = path.resolve( __dirname, "static/images/rasterized" );
const imagesSearch = `${rasterizedDirectory}/**/*.png`;

rimraf.sync( `${rasterizedDirectory}/**/*.webp` );

glob( imagesSearch, ( error, files ) => {
  if ( error ) {
    console.error( "Could not list the directory.", error );
    process.exit( 1 );
  }

  files.forEach( ( file ) => {
    const subpath = path.dirname( file ).replace( new RegExp( `^${rasterizedDirectory.replace( "/", "\\/" )}` ), "" );
    const outputDirectory = `${rasterizedDirectory}/${subpath}`;
    const outfile = `${outputDirectory}/${path.basename( file ).replace( ".png", ".webp" )}`; // .replace('/', path.sep);

    // https://developers.google.com/speed/webp/docs/cwebp
    webp.cwebp( file, outfile, "-q 100 -lossless", ( webpStatus, webpError ) => {
      if ( webpStatus === "100" ) {
        console.log( `Converted: ${outfile}` );
      } else if ( webpStatus === "101" ) {
        console.error( `Could not convert ${file}: ${webpError}` );
      }
    } );
  } );
} );
