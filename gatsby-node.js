/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// https://blog.strapi.io/building-a-static-website-using-gatsby-and-strapi/#articleview
const path = require( "path" );
const { getPermalink } = require( "./src/util/permalink.node.js" );

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
            createdAt
          }
        }
      }
    }
    ` ).then( ( result ) => {
    // Create pages for each article.
    result.data.allStrapiPost.edges.forEach( ( { node } ) => {
      createPage( {
        "path": `/${getPermalink( {
          "timestamp": node.createdAt,
          "title": node.title,
        } )}`,
        "component": path.resolve( "src/components/post.js" ),
        "context": {
          "id": node.id,
        },
      } );
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
const { createRemoteFileNode } = require( "gatsby-source-filesystem" );

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
          "createNodeId": id => image.id,
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
          "createNodeId": id => image.id,
        } );

        if ( fileNode ) {
          image.localFile___NODE = fileNode.id;
        }
      }
    }
  }
};
