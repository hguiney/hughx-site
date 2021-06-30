import React from "react";
import PropTypes from "prop-types";
// import Img from "gatsby-image";
import styled from "styled-components";
import fetchPonyfill from "fetch-ponyfill";
import NumberFormat from "react-number-format";
import moment from "moment";

import ProgressiveImage from "./progressive-image";

import isNumeric from "../util/isNumeric";
import layout from "../util/layout";

import starIcon from "../images/octicons/star.svg";
import forkIcon from "../images/octicons/repo-forked.svg";
import downloadIcon from "../images/npm/download.svg";
// import globeIcon from "../images/globe.svg";
// import websiteIcon from "../images/website.svg";
// import githubLogo from "../images/octicons/mark-github.svg";

import blockPattern from "../images/use_your_illusion.png";
import blockPattern2x from "../images/use_your_illusion@2x.png";

const { fetch } = fetchPonyfill();

const Article = styled.article`
  background-color: #eee;
  // background-image: url(${blockPattern});
  // color: white;
  padding: 1rem !important;
  display: flex !important;
  flex: auto !important;
  // width: 100%;
  // max-width: 100% !important;

  flex-direction: column;

  // ${layout.hiDpi( `background-image: url(${blockPattern2x});`, 2 )}

  @media only screen and (min-width: 40em) {
    flex-direction: row;
  }

  // max-width: 39rem !important;

  .hughx-progressive-image {
    // border: 1px solid black;
    // float: left;
    // background-color: #fff;
    display: inline-block;
    text-align: center;
    margin-bottom: 1rem;
    max-height: 150px;
    margin-bottom: 0;
    max-height: 100%;

    @media only screen and (min-width: 40em) {
      margin-right: 1rem;
    }
  }

  @media only screen and (min-width: 40em) {
    .hughx-progressive-image > img {
      margin: 0 auto;
    }
  }

  .software-card__heading {
    margin-top: .75rem;
    font-weight: normal;
    margin-bottom: .5rem;

    @media only screen and (min-width: 40em) {
      margin-top: 0;
    }
  }

  .software-card__subheading {
    margin-bottom: 0;
    font-weight: normal;
  }
`;

const Column = styled.div`
  // 
`;

const SoftwareCardHeader = styled.hgroup`
  margin-top: -.25rem;
  margin-bottom: .5rem;
  // text-align: center;

  @media only screen and (min-width: 40em) {
    // text-align: left;
  }
`;

const Stats = styled.dl`
  // margin-left: -0.125rem;
  margin-bottom: .5rem;
  // text-align: center;

  @media only screen and (min-width: 40em) {
    // text-align: left;
  }
`;

const Description = styled.div`
  // margin: 0 auto;
  width: 100%;
  // text-align: center;
  max-width: 29rem;

  // @media only screen and (min-width: 30em) {
  //   width: 80%;
  // }

  @media only screen and (min-width: 40em) {
    width: 100%;
    // text-align: left;
    margin: 0;
  }
`;

const AccessibleIcon = ( props ) => {
  const imgProps = {
    "src": props.src,
    "width": props.width,
    "height": props.height,
    "alt": props.alt,
  };

  const abbrProps = {
    "title": props.title,
    "className": props.className,
  };

  return (
    <abbr
      { ...abbrProps }
      aria-label={ abbrProps.title }
      style={ {
        // "width": `${props.containerWidth}px`,
        // "height": `${props.containerHeight}px`,
        "width": "100%",
        "height": "100%",
        "lineHeight": 0,
      } }
    >
      <img { ...imgProps } style={ { "height": "100%" } } />
    </abbr>
  );
};

AccessibleIcon.propTypes = {
  "title": PropTypes.string,
  "width": isNumeric,
  "height": isNumeric,
  "className": PropTypes.string,
  "src": PropTypes.string.isRequired,
  "alt": PropTypes.string.isRequired,
};

const Icon = styled( AccessibleIcon )`
  display: inline-block;
  line-height: 1;
  text-align: center;

  &[title] {
    border-bottom: 0;
  }

  img {}
`;

const Stat = ( props ) => {
  // return Icon
  const iconProps = { ...props };
  delete iconProps.value;
  delete iconProps.style;

  const sharedStyles = `
    height: ${props.height}px;
    min-width: ${props.containerWidth};
    // border: 1px solid black;
    margin-bottom: 0;
    text-align: center;
    line-height: 1;
    // font-family: "Courier Prime Sans", "Courier New", Courier, monospace;
  `;

  const DT = styled.dt`
    ${sharedStyles}
  `;

  const DD = styled.dd`
    ${sharedStyles}
    text-align: left;
    // font-family: sans-serif;
    font-size: 1rem;
  `;

  const A = styled.a`
    ${sharedStyles}
    cursor: pointer;

    abbr[title] {
      cursor: inherit;
    }
  `;

  const isLink = /^(https?|s?ftp|gopher|tel|skype):\/\//.test( props.value );

  if ( isLink ) {
    return (
      <DT className={ props.className } style={ { "marginLeft": "1rem" } }>
        <A href={ props.value }>
          <Icon { ...iconProps } />
        </A>
      </DT>
    );
  }

  return (
    <>
      <DT className={ props.className } style={ props.style }><Icon { ...iconProps } /></DT>
      <DD className={ props.valueClassName }>{
        ( isNumeric( props.value ) )
          ? <NumberFormat
            value={ props.value }
            displayType={ "text" }
            thousandSeparator={ true }
            decimalScale={ 0 }
            renderText={ ( value ) => <div>{ value }</div> }
          />
          : props.value
      }</DD>
    </>
  );
};

Stat.propTypes = {
  ...AccessibleIcon.propTypes,
  "value": PropTypes.oneOfType( [PropTypes.string, PropTypes.number] ),
  "containerWidth": isNumeric,
  "containerHeight": isNumeric,
};

class SoftwareCard extends React.PureComponent {
  constructor( props ) {
    super();

    this.state = {
      "github": {
        "showStars": false,
        "showForks": false,
        ...props.github,
        "stars": 0,
        "forks": 0,
        "watchers": 0,
      },
      "npm": {
        ...props.npm,
        "downloads": 0,
      },
      ...props,
    };

    if ( typeof props.github === "undefined" ) {
      this.state.github = {
        "package": "",
        "showStars": false,
        "showForks": false,
        "stars": 0,
        "forks": 0,
        "watchers": 0,
      };
    }

    const hasGithub = ( typeof props.github !== "undefined" );
    const hasNpm = ( typeof props.npm !== "undefined" );

    this.state.github.showStars = (
      (
        hasGithub
        && ( typeof props.github.showStars !== "undefined" )
      )
        ? props.github.showStars
        : true
    );

    this.state.github.showForks = (
      (
        hasGithub
        && ( typeof props.github.showForks !== "undefined" )
      )
        ? props.github.showForks
        : false
    );

    this.state.github.showWatchers = (
      (
        hasGithub
        && ( typeof props.github.showWatchers !== "undefined" )
      )
        ? props.github.showWatchers
        : false
    );

    if ( hasNpm && ( typeof props.npm.package !== "undefined" ) ) {
      if ( typeof props.npm.showDownloads !== "undefined" ) {
        this.state.npm.showDownloads = props.npm.showDownloads;
      } else {
        this.state.npm.showDownloads = true;
      }
    } else {
      this.state.npm.showDownloads = false;
    }

    this.state.npm.downloadScale = (
      (
        hasNpm
        && ( typeof props.npm.downloadScale !== "undefined" )
      )
        ? props.npm.downloadScale
        : "total"
    );

    this.state.iconSize = (
      ( typeof props.iconSize !== "undefined" )
        ? props.iconSize
        : 30
    );
  }

  populateGithubDetails() {
    const packageName = this.state.github.package;

    if ( packageName === "" ) {
      return;
    }

    // if ( typeof window !== "undefined" ) {
    const endpoint = `https://api.github.com/repos/${packageName}`;

    fetch( endpoint, {
      // "headers": {
      //   "Content-Type": "application/json",
      //   "If-Modified-Since": localStorage.getItem( "lastFetchedFromGithub" ),
      // },
      "cache": "force-cache",
    } )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
        // localStorage.setItem( "lastFetchedFromGithub", ( new Date() ).toUTCString() );

        this.setState( {
          ...this.state,
          "github": {
            ...this.state.github,
            "description": response.description,
            "stars": response.stargazers_count,
            "watchers": response.watchers_count,
            "forks": response.forks_count,
          },
        } );
      } )
      .catch( ( error ) => console.error( error ) );
    // }
  }

  async populateNpmDetails() {
    const packageName = this.state.npm.package;

    if ( packageName === "" ) {
      return;
    }

    const dataFormat = "point"; // "range"
    const fromDate = ( this.state.npm.fromDate || "1000-01-01" );
    const $fromDate = moment( fromDate );
    const { toDate } = this.state.npm;
    const $toDate = ( toDate ? moment( toDate ) : moment() );
    const dateRange = {
      "days": $toDate.diff( $fromDate, "days" ),
      "weeks": $toDate.diff( $fromDate, "weeks" ),
      "months": $toDate.diff( $fromDate, "months" ),
      "years": $toDate.diff( $fromDate, "years" ),
    };
    let totalDownloads = 0;
    const downloadTotals = [];
    // /api/npm proxies to https://api.npmjs.org via netlify.toml
    const addToDownloadTotal = ( _$fromDate, _$toDate ) => {
      const batchedEndpoint = `/api/npm/downloads/${dataFormat}`
        + `/${_$fromDate.format( "YYYY-MM-DD" )}`
        + `:${_$toDate.format( "YYYY-MM-DD" )}`
        + `/${packageName}`;

      return (
        fetch( batchedEndpoint, {
          // "headers": {
          //   "Content-Type": "application/json",
          //   "If-Modified-Since": localStorage.getItem( "lastFetchedFromNpm" ),
          // },
          "cache": "force-cache",
        } )
          .then( ( response ) => response.json() )
          .then( ( response ) => {
            // localStorage.setItem( "lastFetchedFromNpm", ( new Date() ).toUTCString() );

            totalDownloads += response.downloads;
          } )
          .catch( ( error ) => console.error( error ) )
      );
    };
    const updateDownloadTotal = ( downloadRate ) => {
      this.setState( {
        ...this.state,
        "npm": {
          ...this.state.npm,
          "downloads": ( downloadRate || totalDownloads ),
        },
      } );
    };

    // NPM API only allows querying in 18-month intervals.
    // If toDate is more than 18 months after the fromDate,
    // batch several API queries to get the overall total.
    if ( dateRange.months > 18 ) {
      let $batchedFromDate = $fromDate;
      let $batchedToDate = $fromDate.clone().add( 18, "months" );

      while ( $batchedToDate.isBefore( $toDate ) ) {
        downloadTotals.push( addToDownloadTotal( $batchedFromDate, $batchedToDate ) );
        $batchedFromDate = $batchedToDate.clone().add( 1, "day" );
        $batchedToDate = $batchedFromDate.clone().add( 18, "months" );
      } // while

      downloadTotals.push( addToDownloadTotal( $batchedFromDate, $toDate ) );

      await Promise.all( downloadTotals );
    } else {
      await addToDownloadTotal( $fromDate, $toDate );
    }

    if ( this.state.npm.downloadScale === "total" ) {
      updateDownloadTotal();
    } else {
      let downloadRate;

      switch ( this.state.npm.downloadScale ) {
        case "daily":
          downloadRate = ( totalDownloads / dateRange.days );
          break;

        case "weekly":
          downloadRate = ( totalDownloads / dateRange.weeks );
          break;

        case "monthly":
        default:
          downloadRate = ( totalDownloads / dateRange.months );
          break;
      }

      if ( ( downloadRate > 0 ) && ( downloadRate < 1 ) ) {
        downloadRate = Math.ceil( downloadRate );
      } else {
        downloadRate = Math.round( downloadRate );
      }

      updateDownloadTotal( downloadRate );
    } // if not total
  }

  getScaleNounFromAdverb( scale ) {
    if ( scale === "daily" ) {
      return "day";
    }

    return scale.replace( "ly", "" );
  }

  componentDidMount() {
    if ( this.props.github ) {
      const githubProps = Object.keys( this.props.github );

      if ( githubProps.length ) {
        const hasPackage = !!this.props.github.package;
        const hasShowForks = ( "showForks" in this.props.github );
        const hasShowStars = ( "showStars" in this.props.github );
        const hasShowWatchers = ( "showWatchers" in this.props.github );

        if ( hasPackage ) {
          if ( hasShowForks || hasShowStars || hasShowWatchers ) {
            this.populateGithubDetails();
          }
        } else {
          throw new Error( "props.github has no package set" );
        }
      } else {
        throw new Error( "props.github has no options set" );
      }
    }

    if ( this.props.npm ) {
      const npmProps = Object.keys( this.props.npm );

      if ( npmProps.length ) {
        const hasPackage = !!this.props.npm.package;
        const hasShowDownloads = ( "showDownloads" in this.props.npm );

        if ( hasPackage ) {
          if ( hasShowDownloads ) {
            this.populateNpmDetails();
          }
        } else {
          throw new Error( "props.npm has no package set" );
        }
      } else {
        throw new Error( "props.npm has no options set" );
      }
    }
  }

  render() {
    const {
      _id,
      name,
      tagline,
      description,
      headingLevel,
      github,
      npm,
      iconSize,
      url,
      logo,
    } = this.state;
    const Heading = `h${headingLevel || 2}`;
    const Subheading = `h${( parseInt( headingLevel, 10 ) + 1 ) || 3}`;

    const title = ( href ) => {
      let Anchor;

      if ( !href ) {
        Anchor = <>{ name }</>;
      } else {
        Anchor = React.createElement( "a", { href }, name );
      }

      return (
        <Heading className="software-card__heading hx hx--modest">
          { Anchor }
        </Heading>
      );
    };

    return (
      <Article id={ _id }>
        {
          logo
          && <ProgressiveImage
              style={ {
                "minWidth": "150px",
                "minHeight": "150px",
                // "alignItems": "center",
                // "backgroundColor": "rgb(40,40,40)",
                // "padding": "1rem",
                "textAlign": "left",
              } }
              img={ {
                "src": logo.src || logo,
                "width": logo.width || 100,
                "height": logo.height || 100,
                "alt": "",
                "style": logo.style,
                "loading": "lazy",
              } }
            />
        }
        <Column>
          <SoftwareCardHeader>
            { url ? title( url ) : title() }
            { ( tagline !== "" ) && <Subheading className="software-card__subheading hx hx--modest">{ tagline || github.description }</Subheading> }
          </SoftwareCardHeader>
          <Stats className="inline">
            {
              github
              && <>
                { /* <dt
                  // className="pill-cap-left"
                  style={ { "margin": "0 .5rem 0 0" } }
                >
                  <Icon width={ iconSize } height={ iconSize } src={ githubLogo } />
                </dt> */ }
                {
                  github.showStars
                  && <Stat
                      title="GitHub Stars"
                      src={ starIcon }
                      containerWidth="1em"
                      height={ iconSize }
                      value={ github.stars }
                      alt="★"
                      // className="pill-middle"
                      // valueClassName="pill-middle pill-middle--value"
                    />
                }
                {
                  github.showForks
                  && <Stat
                      title="GitHub Forks"
                      src={ forkIcon }
                      containerWidth="1em"
                      height={ iconSize }
                      value={ github.forks }
                      alt=" "
                      // className="pill-middle"
                      // valueClassName="pill-cap-right"
                    />
                }
              </>
            }
            {
              npm
              && npm.downloads
              && npm.showDownloads
              && <Stat
                  title="NPM Downloads"
                  src={ downloadIcon }
                  containerWidth="1em"
                  height={ Math.round( iconSize * 0.95 ) }
                  value={ ( npm.downloadScale === "total" ) ? npm.downloads : `${npm.downloads}/${this.getScaleNounFromAdverb( npm.downloadScale )}` }
                  alt="⭳" // \u2B73
                  style={ {
                    // "marginLeft": "-0.2rem",
                    "position": "relative",
                    "top": "0.125rem",
                  } }
                />
            }
            { /*
              url
              && <Stat
                   title="Website"
                   src={ websiteIcon }
                   containerWidth="1em"
                   width={ iconSize }
                   height={ iconSize }
                   value={ url }
                   alt=" "
                 />
            */ }
          </Stats>
          { description && <Description dangerouslySetInnerHTML={ { "__html": description } } /> }
        </Column>
      </Article>
    );
  } // render
}

SoftwareCard.propTypes = {
  "_id": PropTypes.string,
  "description": PropTypes.string,
  "github": PropTypes.shape( {
    "showForks": PropTypes.bool,
    "showStars": PropTypes.bool,
    "showWatchers": PropTypes.bool,
    "package": PropTypes.string,
  } ),
  "headingLevel": PropTypes.oneOf( ["1", "2", "3", "4", "5", "6"] ),
  "name": PropTypes.string.isRequired,
  "npm": PropTypes.shape( {
    "downloadScale": PropTypes.oneOf( ["daily", "weekly", "monthly", "total"] ),
    "showDownloads": PropTypes.bool,
    "package": PropTypes.string,
    "fromDate": PropTypes.string,
  } ),
  "url": PropTypes.string,
  "iconSize": isNumeric,
};

export default SoftwareCard;
