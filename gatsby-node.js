/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require( "path" );
const { createRemoteFileNode } = require( "gatsby-source-filesystem" );
const moment = require( "moment" );
const { getPermalink } = require( "./src/util/permalink.node.js" );
const { hasOwnProperty } = require( "./src/util/hasOwnProperty.node.js" );

const makeRequest = ( graphql, request ) => new Promise( ( resolve, reject ) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql( request ).then( ( result ) => {
      if ( result.errors ) {
        reject( result.errors );
      }

      return result;
    } ),
  );
} );

// https://blog.strapi.io/building-a-static-website-using-gatsby-and-strapi/#articleview
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ( { actions, graphql } ) => {
  const { createPage } = actions;

  const getPosts = makeRequest( graphql, `
    {
      allStrapiPost {
        edges {
          node {
            id
            title
            publishedAt
          }
        }
      }
    }
  ` ).then( ( result ) => {
    const archives = {};

    // Create pages for each article.
    result.data.allStrapiPost.edges
      .filter( ( { node } ) => node.publishedAt <= moment().toISOString() )
      .forEach( ( { node } ) => {
        createPage( {
          "path": `/${getPermalink( {
            "timestamp": node.publishedAt,
            "title": node.title,
          } )}`,
          "component": path.resolve( "src/components/post.js" ),
          "context": {
            "id": node.id,
          },
        } );

        const datePieces = node.publishedAt.split( "T" )[0].split( "-" );
        const [year, month, day] = datePieces;
        const [, monthInt, dayInt] = datePieces.map( datePiece => parseInt( datePiece, 10 ) );

        // Year Archives:
        createPage( {
          "path": `/${year}`,
          "component": path.resolve( "src/pages/archive.js" ),
          "context": {
            "gte": `${year}-01-01`,
            "lt": `${year}-12-31`,
            "title": `${year} Archives`,
          },
        } );

        if ( !hasOwnProperty( archives, year ) ) {
          archives[year] = {
            "posts": [],
          };
        }

        archives[year].posts.push( node );

        // Month Archives:
        createPage( {
          "path": `/${year}/${month}`,
          "component": path.resolve( "src/pages/archive.js" ),
          "context": {
            "gte": `${year}-${month}-01`,
            "lt": `${year}-${monthInt + 1}-01`,
            "title": `${moment( `${year}-${month}` ).format( "MMMM YYYY" )} Archives`,
          },
        } );

        if ( !hasOwnProperty( archives[year], month ) ) {
          archives[year][month] = {
            "posts": [],
          };
        }

        archives[year][month].posts.push( node );

        // Day Archives:
        let nextDay = dayInt + 1;

        if ( nextDay < 10 ) {
          nextDay = `0${nextDay}`;
        }

        createPage( {
          "path": `/${year}/${month}/${day}`,
          "component": path.resolve( "src/pages/archive.js" ),
          "context": {
            "gte": `${year}-${month}-${day}`,
            "lt": `${year}-${month}-${nextDay}`,
            "title": `${moment( `${year}-${month}-${day}` ).format( "MMMM Do, YYYY" )} Archives`,
          },
        } );

        if ( !hasOwnProperty( archives[year][month], day ) ) {
          archives[year][month][day] = {
            "posts": [],
          };
        }

        archives[year][month][day].posts.push( node );
      } );

    // deletePage( {
    //   "path": "/blog/",
    //   "component": path.resolve( "src/pages/blog.js" ),
    // } );
    createPage( {
      "path": "/blog/",
      "component": path.resolve( "src/pages/_blog.js" ),
      "context": {
        archives,
        "now": moment().toISOString(),
      },
    } );
  } );

  const getAuthors = makeRequest( graphql, `
    {
      allStrapiUser {
        edges {
          node {
            id
            username
          }
        }
      }
    }
    ` ).then( ( result ) => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach( ( { node } ) => {
      createPage( {
        "path": `/authors/${node.username}`,
        "component": path.resolve( "src/components/author.js" ),
        "context": {
          "id": node.id,
        },
      } );
    } );
  } );

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all( [
    getPosts,
    getAuthors,
  ] );
};

// https://github.com/strapi/gatsby-source-strapi/issues/8#issuecomment-434269925

exports.onCreateNode = async ( {
  node, actions, store, cache,
} ) => {
  const { createNode/* , createNodeField */ } = actions;

  if ( node.internal.type !== null ) {
    if ( node.internal.type === "StrapiPost" ) {
      for ( const image of node.coverArt ) {
        const fileNode = await createRemoteFileNode( { // eslint-disable-line
          "url": `http://localhost:1337${image.url}`,
          store,
          cache,
          createNode,
          "createNodeId": id => image.id, // eslint-disable-line no-unused-vars
        } );

        if ( fileNode ) {
          image.localFile___NODE = fileNode.id;
        }
      }
    } else if ( node.internal.type === "StrapiUser" ) {
      for ( const image of node.profilePhoto ) {
        const fileNode = await createRemoteFileNode( { // eslint-disable-line
          "url": `http://localhost:1337${image.url}`,
          store,
          cache,
          createNode,
          "createNodeId": id => image.id, // eslint-disable-line no-unused-vars
        } );

        if ( fileNode ) {
          image.localFile___NODE = fileNode.id;
        }
      }
    }
  }
};

exports.onCreatePage = ( { page, actions } ) => {
  if (
    ( page.internalComponentName === "ComponentIndex" )
    || ( page.path === "/" )
  ) {
    const { createPage, deletePage } = actions;

    deletePage( page );
    createPage( {
      ...page,
      "context": {
        ...page.context,
        "now": moment().toISOString(),
      },
    } );
  }
};
