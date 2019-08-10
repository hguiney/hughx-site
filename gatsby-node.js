/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// https://github.com/strapi/gatsby-source-strapi/issues/8#issuecomment-434269925
const { createRemoteFileNode } = require( "gatsby-source-filesystem" );

exports.onCreateNode = async ( {
  node, actions, store, cache,
} ) => {
  const { createNode, createNodeField } = actions;

  if ( node.internal.type !== null && node.internal.type === "StrapiPost" ) {
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
  }
};
