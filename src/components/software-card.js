import React from "react";
import PropTypes from "prop-types";
// import Img from "gatsby-image";
import styled from "styled-components";
import "whatwg-fetch";

import NumberFormat from "react-number-format";

import isNumeric from "../util/isNumeric";

import starIcon from "../images/octicons/star.svg";
import forkIcon from "../images/octicons/repo-forked.svg";

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
    width: ${props.containerWidth}px;
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
    font-size: 1.125rem
  `;

  return (
    <>
      <DT><Icon { ...iconProps } /></DT>
      <DD>
        <NumberFormat
          value={ props.value }
          displayType={ "text" }
          thousandSeparator={ true }
          decimalScale={ 0 }
          renderText={ value => <div>{ value }</div> }
        />
      </DD>
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
      ...props,
    };

    this.state.github.showStars = ( ( typeof props.github.showStars !== "undefined" ) ? props.github.showStars : true );
    this.state.github.showForks = ( ( typeof props.github.showForks !== "undefined" ) ? props.github.showForks : false );
    this.state.github.showWatchers = ( ( typeof props.github.showWatchers !== "undefined" ) ? props.github.showWatchers : false );
  }

  populateGithubDetails() {
    const packageName = this.state.github.package;

    if ( packageName === "" ) {
      return;
    }

    const endpoint = `https://api.github.com/repos/${packageName}`;

    fetch( endpoint )
      .then( response => response.json() )
      .then( ( response ) => {
        console.log( response );

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

  populateNpmDetails() {}

  componentDidMount() {
    this.populateGithubDetails();
  }

  render() {
    const {
      _id, name, description, headingLevel, github, npm,
    } = this.state;
    const Heading = `h${headingLevel || 2}`;

    return (
      <article id={ _id }>
        <Heading>{ name }</Heading>
        <p>{ description || github.description }</p>
        <dl className="inline">
          {
            github
            && <>
              {
                github.showStars
                && <Stat
                     title="GitHub Stars"
                     src={ starIcon }
                     containerWidth="30"
                     height="30"
                     value={ github.stars }
                     alt="★"
                   />
              }
              {
                github.showForks
                && <>
                  <dt>
                    <Icon
                      title="GitHub Forks"
                      src={ forkIcon }
                      containerWidth="30"
                      height="30"
                      alt=" "
                    />
                  </dt>
                  <dd>{ github.forks }</dd>
                </>
              }
            </>
          }
          {
            npm
            && npm.showDownloads
            && <>
              <dt>NPM Downloads</dt>
              <dd>10/month</dd>
            </>
          }
        </dl>
      </article>
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
};

export default SoftwareCard;
