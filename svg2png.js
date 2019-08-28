/* eslint-disable import/no-extraneous-dependencies */
const fs = require( "fs" );
const path = require( "path" );
const { exec } = require( "child_process" );
const glob = require( "glob" );

const logosDirectory = path.resolve( __dirname, "static/images/logos" );
const logosSearch = `${logosDirectory}/*.svg`;
const outputDirectory = `${logosDirectory}/rasterized`;

const toDelete = glob.sync( `${outputDirectory}/*.png` );

toDelete.forEach( ( bitmap ) => {
  fs.unlinkSync( bitmap );
} );

glob( logosSearch, ( error, files ) => {
  if ( error ) {
    console.error( "Could not list the directory.", error );
    process.exit( 1 );
  }

  files.forEach( ( file ) => {
    [250, 500, 750].forEach( ( width, index ) => {
      let density = "";

      if ( index > 0 ) {
        density = `@${index + 1}x`;
      }

      const outfile = `${outputDirectory}/${path.basename( file ).replace( ".svg", `${density}.png` )}`;
      const params = [
        "-z", "-e", `'${outfile}'`,
        "-w", width.toString(),
        `'${file}'`,
      ];

      exec( `inkscape ${params.join( " " )}`, ( inkscapeError, stdout, stderr ) => {
        if ( inkscapeError ) {
          console.error( inkscapeError );
          console.log( stderr );
          process.exit( 1 );
        }

        console.log( stdout );
      } );

      // console.log( inkscape );
    } );
  } );
} );
