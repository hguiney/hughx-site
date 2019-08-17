import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import layout from "../util/layout";

const Header = ( { siteTitle } ) => (
  <header
    style={ {
      "background": "rebeccapurple",
      "marginBottom": "1.45rem",
      "padding": `1.45rem ${layout.pageGutter}`,
      "textAlign": "center",
    } }
  >
    <h1 style={ { "margin": 0 } }>
      <Link
        to="/"
        style={ {
          "color": "white",
          "textDecoration": "none",
        } }
      >
        { siteTitle }
      </Link>
    </h1>
  </header>
);

Header.propTypes = {
  "siteTitle": PropTypes.string,
};

Header.defaultProps = {
  "siteTitle": "",
};

export default Header;
