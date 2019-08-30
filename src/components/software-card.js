import React from "react";
import PropTypes from "prop-types";
// import Img from "gatsby-image";
import styled from "styled-components";
import "whatwg-fetch";
import NumberFormat from "react-number-format";

import ProgressiveImage from "./progressive-image";

import isNumeric from "../util/isNumeric";

import starIcon from "../images/octicons/star.svg";
import forkIcon from "../images/octicons/repo-forked.svg";
import downloadIcon from "../images/npm/download.svg";

const Article = styled.article`
  background-color: #eee;
  padding: 1rem;
  display: flex !important;
  max-width: 39rem !important;
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

  const sharedStyles = `
    height: ${props.height}px;
    min-width: ${props.containerWidth}px;
    // border: 1px solid black;
    margin-bottom: 0;
    text-align: center;
    line-height: 1;
  `;

  const DT = styled.dt`
    ${sharedStyles}
  `;

  const DD = styled.dd`
    ${sharedStyles}
    text-align: left;
    font-family: sans-serif;
    font-size: 1rem
  `;

  return (
    <>
      <DT><Icon { ...iconProps } /></DT>
      <DD>{
        ( isNumeric( props.value ) )
          ? <NumberFormat
            value={ props.value }
            displayType={ "text" }
            thousandSeparator={ true }
            decimalScale={ 0 }
            renderText={ value => <div>{ value }</div> }
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

    this.state.github.showStars = ( ( typeof props.github.showStars !== "undefined" ) ? props.github.showStars : true );
    this.state.github.showForks = ( ( typeof props.github.showForks !== "undefined" ) ? props.github.showForks : false );
    this.state.github.showWatchers = ( ( typeof props.github.showWatchers !== "undefined" ) ? props.github.showWatchers : false );

    if ( typeof props.npm.package !== "undefined" ) {
      if ( typeof props.npm.showDownloads !== "undefined" ) {
        this.state.npm.showDownloads = props.npm.showDownloads;
      } else {
        this.state.npm.showDownloads = true;
      }
    } else {
      this.state.npm.showDownloads = false;
    }

    if ( typeof props.npm.downloadScale !== "undefined" ) {
      this.state.npm.downloadScale = props.npm.downloadScale;
    } else {
      this.state.npm.downloadScale = "monthly";
    }

    if ( typeof props.iconSize !== "undefined" ) {
      this.state.iconSize = props.iconSize;
    } else {
      this.state.iconSize = 30;
    }
  }

  populateGithubDetails() {
    const packageName = this.state.github.package;

    if ( packageName === "" ) {
      return;
    }

    const endpoint = `https://api.github.com/repos/${packageName}`;

    fetch( endpoint, { "cache": "force-cache" } )
      .then( response => response.json() )
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
      .then( response => response.json() )
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
      _id, name, tagline, description, headingLevel, github, npm, iconSize,
    } = this.state;
    const Heading = `h${headingLevel || 2}`;
    const Subheading = `h${( parseInt( headingLevel, 10 ) + 1 ) || 3}`;

    return (
      <Article id={ _id }>
        {
          this.state.logo
          && <ProgressiveImage
              img={ {
                "src": this.state.logo,
                "width": "150",
                "alt": "Logo",
                "style": {
                  //  "border": "1px solid black",
                  // "float": "left",
                  "marginRight": "1rem",
                  "background-color": "#fff",
                  "display": "inline-block",
                },
              } }
            />
        }
        <Column>
          <hgroup style={ { "marginBottom": ".5rem" } }>
            <Heading style={ { "marginBottom": ".5rem" } }>{ name }</Heading>
            <Subheading style={ { "marginBottom": 0, "fontWeight": "normal" } }>{ tagline || github.description }</Subheading>
          </hgroup>
          <dl className="inline" style={ { "marginBottom": ".5rem" } }>
            {
              github
              && <>
                {
                  github.showStars
                  && <Stat
                      title="GitHub Stars"
                      src={ starIcon }
                      containerWidth={ iconSize }
                      height={ iconSize }
                      value={ github.stars }
                      alt="★"
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
                    />
                }
              </>
            }
            {
              npm
              && npm.showDownloads
              && <Stat
                  title="NPM Downloads"
                  src={ downloadIcon }
                  containerWidth={ iconSize }
                  height={ iconSize * 0.833333333333333 }
                  value={ `${npm.downloads}/${this.getScaleNounFromAdverb( npm.downloadScale )}` }
                  alt="⭳" // \u2B73
                />
            }
          </dl>
          { description && <div style={ { "marginBottom": 0 } } dangerouslySetInnerHTML={ { "__html": description } } /> }
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
