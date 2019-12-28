/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
const ReactGA = require( "react-ga" );

function deuglifyAnalyticsURL() {
  if ( "history" in window ) {
    window.history.replaceState( {}, document.title, window.location.href.replace( /(\?|&)utm_([^&]+)/gi, "" ).replace( "?&", "?" ).replace( /(&|\?)$/i, "" ) );
  }
}

function isProduction() {
  return /^https?:\/\/(?:www\.)?hughx\.(?:dev|com)/i.test( window.location.origin );
}

function isDevelopment() {
  return !isProduction();
}

function isInternalTrafficLink() {
  return /(?:\?|&)utm_source=internal\b/.test( window.location.search );
}

function isInternalTraffic() {
  let isInternal = false;
  let hasInternalTrafficCookie = false;

  if ( "localStorage" in window ) {
    hasInternalTrafficCookie = ( window.localStorage.getItem( "internalTraffic" ) === "true" );
  }

  isInternal = ( isDevelopment() || hasInternalTrafficCookie );

  return isInternal;
}

function setInternalTrafficCookie() {
  window.localStorage.setItem( "internalTraffic", "true" );
}

function handleInternalTraffic() {
  if ( ( "localStorage" in window ) && isInternalTrafficLink() ) {
    setInternalTrafficCookie();
  }
}

exports.onClientEntry = () => {
  ReactGA.initialize( "UA-23329936-1" );
};

exports.onRouteUpdate = ( { location } ) => {
  handleInternalTraffic();

  if ( !isInternalTraffic() ) {
    ReactGA.pageview( location.pathname );
  }

  deuglifyAnalyticsURL();
};
