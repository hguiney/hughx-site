module.exports = {
  "hasOwnProperty": function hasOwnProperty( object, property ) {
    return Object.prototype.hasOwnProperty.call( object, property );
  },
};
