export function getSlugFromTitle( title ) {
  return encodeURIComponent(
    title
      .toLowerCase()
      .replace( /\s/g, "-" )
      .replace( /[.,;:?!]/g, "" ),
  );
}

export function getDateDirectoryFromTimestamp( timestamp ) {
  return timestamp
    .split( "T" )[0]
    .replace( /-/g, "/" );
}

export function getPermalink( { timestamp, title } ) {
  return `${getDateDirectoryFromTimestamp( timestamp )}/${getSlugFromTitle( title )}`;
}

export default getPermalink;
