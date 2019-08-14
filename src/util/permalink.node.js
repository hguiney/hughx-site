function getSlugFromTitle( title ) {
  return encodeURIComponent(
    title
      .toLowerCase()
      .replace( /\s/g, "-" )
      .replace( /[.,;:?!]/g, "" ),
  );
}

function getDateDirectoryFromTimestamp( timestamp ) {
  return timestamp
    .split( "T" )[0]
    .replace( /-/g, "/" );
}

function getPermalink( { timestamp, title } ) {
  return `${getDateDirectoryFromTimestamp( timestamp )}/${getSlugFromTitle( title )}`;
}

module.exports = {
  getSlugFromTitle,
  getDateDirectoryFromTimestamp,
  getPermalink,
};
