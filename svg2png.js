/* eslint-disable import/no-extraneous-dependencies */
const fs = require( "fs" );
const path = require( "path" );
const { exec } = require( "child_process" );
const glob = require( "glob" );
const mkdirp = require( "mkdirp" );
const rimraf = require( "rimraf" );

const imagesDirectory = path.resolve( __dirname, "static/images" );
const imagesSearch = `${imagesDirectory}/**/*.svg`;
const rasterizedDirectory = `${imagesDirectory}/rasterized`;

rimraf.sync( `${rasterizedDirectory}/**/*` );

glob( imagesSearch, ( error, files ) => {
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

      const subpath = path.dirname( file ).replace( new RegExp( `^${imagesDirectory.replace( "/", "\\/" )}` ), "" );
      const outputDirectory = `${rasterizedDirectory}/${subpath}`;
      const outfile = `${outputDirectory}/${path.basename( file ).replace( ".svg", `${density}.png` )}`; // .replace('/', path.sep);
      const params = [
        "-z", "-e", `'${outfile}'`,
        "-w", width.toString(),
        `'${file}'`,
      ];

      mkdirp.sync( outputDirectory );

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
