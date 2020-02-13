/* Copy-pasted from gatsby-browser.js */

export function deuglifyAnalyticsURL() {
  if ( "history" in window ) {
    window.history.replaceState( {}, document.title, window.location.href.replace( /(\?|&)utm_([^&]+)/gi, "" ).replace( "?&", "?" ).replace( /(&|\?)$/i, "" ) );
  }
}

export function isProduction() {
  return /^https?:\/\/(?:www\.)?hughx\.(?:dev|com)/i.test( window.location.origin );
}

export function isDevelopment() {
  return !isProduction();
}

export function isInternalTrafficLink() {
  return /(?:\?|&)utm_source=internal\b/.test( window.location.search );
}

export function isInternalTraffic() {
  let isInternal = false;
  let hasInternalTrafficCookie = false;

  if ( "localStorage" in window ) {
    hasInternalTrafficCookie = ( window.localStorage.getItem( "internalTraffic" ) === "true" );
  }

  isInternal = ( isDevelopment() || hasInternalTrafficCookie );

  return isInternal;
}

export function setInternalTrafficCookie() {
  window.localStorage.setItem( "internalTraffic", "true" );
}

export function handleInternalTraffic() {
  if ( ( "localStorage" in window ) && isInternalTrafficLink() ) {
    setInternalTrafficCookie();
  }
}
