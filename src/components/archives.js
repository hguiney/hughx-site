import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import moment from "moment";

import Layout from "./layout";

import layout from "../util/layout";
import { getPermalink } from "../util/permalink";

// const ArchiveList = styled.dd`
//   margin-left: 0;
//   // list-style: none;
// `;

const DisclosureButton = styled.button`
  border: 0;
  background-color: transparent;
  padding: 0;

  &::before {
    display: inline-block;
    // vertical-align: top;
    margin-right: .25rem;
  }

  &[aria-expanded="false"]::before {
    content: '▸';
  }

  &[aria-expanded="true"]::before {
    content: '▾';
  }
`;

class Archives extends React.Component {
  constructor( props ) {
    super( props );

    const archiveExpansions = {};

    Object.keys( props.archives ).forEach( ( year ) => {
      archiveExpansions[year] = {
        "expanded": false,
      };

      const months = Object.assign( {}, props.archives[year] );
      delete months.posts;

      Object.keys( months ).forEach( ( month ) => {
        archiveExpansions[year][month] = {
          "expanded": false,
        };
      } );
    } );

    this.state = {
      archiveExpansions,
    };
  }

  handleClick( event ) {
    const $clicked = event.target;
    const { archiveExpansions } = this.state;

    if ( $clicked.nodeName.toLowerCase() === "button" ) {
      const expanded = $clicked.getAttribute( "aria-expanded" );
      const controls = $clicked.getAttribute( "aria-controls" );
      const archive = $clicked.getAttribute( "data-archive" );

      if ( expanded && controls && archive ) {
        // const controlled = controls.split( " " );
        const [year, month, day] = archive.split( "-" );

        switch ( expanded ) { // eslint-disable-line default-case
          case "true":
            if ( year ) {
              if ( month ) {
                if ( day ) {
                  // year-month-day
                  archiveExpansions[year][month][day].expanded = false;
                } else {
                  // year-month
                  archiveExpansions[year][month].expanded = false;
                }
              } else {
                // year
                archiveExpansions[year].expanded = false;
              }
            }
            break;

          case "false":
            if ( year ) {
              if ( month ) {
                if ( day ) {
                  // year-month-day
                  archiveExpansions[year][month][day].expanded = true;
                } else {
                  // year-month
                  archiveExpansions[year][month].expanded = true;
                }
              } else {
                // year
                archiveExpansions[year].expanded = true;
              }
            }
            break;
        }

        this.setState( {
          ...this.state,
          archiveExpansions,
        } );
      }
    }
  }

  render() {
    // const { archives } = this.state;
    // const archives = [];

    return <div onClick={ this.handleClick.bind( this ) }>
      <h3>Archives</h3>
      { Object.keys( this.props.archives ).map( ( year ) => {
        const monthsForYear = Object.keys( this.props.archives[year] ).reverse();
        const monthIdsForYear = monthsForYear
          .filter( month => ( month !== "posts" ) )
          .map( month => (
            `${year}-${month}`
          ) );

        return <dl key={ year }>
          <dt>
            <DisclosureButton
              data-archive={ year }
              aria-expanded={ this.state.archiveExpansions[year].expanded.toString() }
              aria-controls={ monthIdsForYear.join( " " )
            }>
              { year }
            </DisclosureButton>
          </dt>
          { monthsForYear.map( ( month ) => {
            if ( ( month === "posts" ) || ( month === "expanded" ) ) {
              return;
            }

            const postsForMonth = [...this.props.archives[year][month].posts].reverse();
            const postIdsForMonth = postsForMonth.map( post => post.id );

            return (
              <dd key={ `${year}-${month}` }>
                <dl id={ `${year}-${month}` } hidden={ !this.state.archiveExpansions[year].expanded }>
                  <dt>
                    <DisclosureButton
                      data-archive={ `${year}-${month}` }
                      aria-expanded={ this.state.archiveExpansions[year][month].expanded.toString() }
                      aria-controls={ postIdsForMonth.join( " " ) }
                    >
                      { moment( `${year}-${month}` ).format( "MMMM" ) }
                    </DisclosureButton>
                  </dt>
                  { postsForMonth.map( post => (
                  <dd key={ post.id }>
                    <Link
                      id={ post.id }
                      to={ `/${getPermalink( {
                        "timestamp": post.publishedAt,
                        "title": post.title,
                      } )}` }
                      hidden={ !this.state.archiveExpansions[year][month].expanded }
                    >
                      { post.title }
                    </Link>
                  </dd>
                  ) ) }
                </dl>
              </dd>
            );
          } ) }
        </dl>;
      } ) }
    </div>;
  }
}


Archives.propTypes = {
  "archives": PropTypes.object,
};

export default Archives;
