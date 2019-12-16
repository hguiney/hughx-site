import React from "react";
import PropTypes from "prop-types";
// import Img from "gatsby-image";
import styled from "styled-components";
import "whatwg-fetch";
import NumberFormat from "react-number-format";

import ProgressiveImage from "./progressive-image";

import isNumeric from "../util/isNumeric";
import layout from "../util/layout";

import starIcon from "../images/octicons/star.svg";
import forkIcon from "../images/octicons/repo-forked.svg";
import downloadIcon from "../images/npm/download.svg";
// import globeIcon from "../images/globe.svg";
import websiteIcon from "../images/website.svg";
import githubLogo from "../images/octicons/mark-github.svg";

const Article = styled.article`
  background-color: #eee;
  padding: 1rem !important;
  display: flex !important;
  flex: auto !important;
  // width: 100%;
  // max-width: 100% !important;

  flex-direction: column;

  @media only screen and (min-width: 40em) {
    flex-direction: row;
  }

  // max-width: 39rem !important;

  picture {
    // border: 1px solid black;
    // float: left;
    // background-color: #fff;
    display: inline-block;
    text-align: center;
    margin-bottom: 1rem;
    max-height: 150px;
    margin-right: 1rem;
    margin-bottom: 0;
    max-height: 100%;
    justify-content: f
  }

  @media only screen and (min-width: 40em) {
    picture > img {
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
    min-width: ${props.containerWidth}px;
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
        : "monthly"
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

    const endpoint = `https://api.github.com/repos/${packageName}`;

    fetch( endpoint, { "cache": "force-cache" } )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
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
      } );
  }

  populateNpmDetails() {
    const packageName = this.state.npm.package;

    if ( packageName === "" ) {
      return;
    }

    const endpoint = `https://api.npmjs.org/downloads/range/1000-01-01:3000-01-01/${packageName}`;

    fetch( endpoint, { "cache": "force-cache" } )
      .then( ( response ) => response.json() )
      .then( ( response ) => {
        const months = ( ( this.state.npm.downloadScale === "monthly" ) ? new Set() : null );
        const years = ( ( this.state.npm.downloadScale === "weekly" ) ? new Set() : null );
        let downloads;

        const totalDownloads = response.downloads.reduce( ( total, currentStat ) => {
          switch ( this.state.npm.downloadScale ) {
            case "daily":
              break;

            case "weekly":
              years.add( currentStat.day.slice( 0, -6 ) );
              break;

            case "monthly":
            default:
              months.add( currentStat.day.slice( 0, -3 ) );
          }

          total += currentStat.downloads;

          return total;
        }, 0 );

        switch ( this.state.npm.downloadScale ) {
          case "daily":
            downloads = ( totalDownloads / response.downloads.length );
            break;

          case "weekly":
            downloads = ( totalDownloads / ( years.size * ( 365 / 7 ) ) );
            break;

          case "monthly":
          default:
            downloads = ( totalDownloads / months.size );
            break;
        }

        if ( ( downloads > 0 ) && ( downloads < 1 ) ) {
          downloads = Math.ceil( downloads );
        } else {
          downloads = Math.round( downloads );
        }

        this.setState( {
          ...this.state,
          "npm": {
            ...this.state.npm,
            downloads,
          },
        } );
      } );
  }

  getScaleNounFromAdverb( scale ) {
    if ( scale === "daily" ) {
      return "day";
    }

    return scale.replace( "ly", "" );
  }

  componentDidMount() {
    this.populateGithubDetails();
    this.populateNpmDetails();
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
        <Heading className="software-card__heading">
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
              } }
              img={ {
                "src": logo.src || logo,
                "width": logo.width || 100,
                "height": logo.height || 100,
                "alt": "Logo",
                "style": logo.style,
              } }
            />
        }
        <Column>
          <hgroup style={ { "marginTop": "-.25rem", "marginBottom": ".5rem" } }>
            { url ? title( url ) : title() }
            { ( tagline !== "" ) && <Subheading className="software-card__subheading">{ tagline || github.description }</Subheading> }
          </hgroup>
          <dl className="inline" style={ { "marginLeft": "-0.125rem", "marginBottom": ".5rem" } }>
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
                      containerWidth={ iconSize }
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
                      containerWidth={ iconSize }
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
                  containerWidth={ iconSize }
                  height={ iconSize * 0.95 }
                  value={ `${npm.downloads}/${this.getScaleNounFromAdverb( npm.downloadScale )}` }
                  alt="⭳" // \u2B73
                  style={ {
                    "marginLeft": "-0.2rem",
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
                   containerWidth={ iconSize }
                   width={ iconSize }
                   height={ iconSize }
                   value={ url }
                   alt=" "
                 />
            */ }
          </dl>
          { description && <div style={ { "marginBottom": 0, "maxWidth": "29rem" } } dangerouslySetInnerHTML={ { "__html": description } } /> }
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
    "downloadScale": PropTypes.oneOf( ["daily", "weekly", "monthly"] ),
    "showDownloads": PropTypes.bool,
    "package": PropTypes.string,
  } ),
  "url": PropTypes.string,
  "iconSize": isNumeric,
};

export default SoftwareCard;
