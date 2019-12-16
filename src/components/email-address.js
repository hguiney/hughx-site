import { CopyToClipboard } from "react-copy-to-clipboard";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Toast } from "react-bootstrap";
import ProgressiveImage from "./progressive-image";

const clipboardIcon = "/images/octicons/copy-to-clipboard.svg";

const CopyToClipboardLink = styled.a`
  &:hover svg,
  &:focus svg,
  &:active svg {
    fill: #0056b3 !important;
  }
`;

const EmailAddress = ( {
  onCopy, style, iconStyle, children,
} ) => (
  <CopyToClipboard
    text="hugh@hughx.dev"
    onCopy={ onCopy }
  >
    <CopyToClipboardLink
      arial-label="Copy to clipboard"
      title="Copy to clipboard"
      href="mailto:hugh@hughx.dev"
      onClick={ ( event ) => event.preventDefault() }
      style={ style }
    >
      { children ? <>{ children }&nbsp;</> : <>hugh@hughx.dev&nbsp;</> }
      <ProgressiveImage
        img={ {
          "src": clipboardIcon,
          // "width": "17",
          "viewBox": "0 0 14 15",
          "alt": "icon: clipboard with arrow pointing inward",
          "style": {
            "fill": "#007bff",
            "width": ".9em",
          },
        } }
        style={ iconStyle }
        inlineSvg
      />
    </CopyToClipboardLink>
  </CopyToClipboard>
);

EmailAddress.propTypes = {
  "onCopy": PropTypes.func,
};

export default EmailAddress;

const PopUpToast = styled( Toast )`
  &, &.fade {
    top: 0%;
    position: absolute;
    transition: .5s top ease, .25s opacity linear;
    // z-index: 2;
  }

  &:not(.show) {
    pointer-events: none;
    // z-index: -1;
  }

  &.show,
  &.--is-closing {
    top: -66.6666%;
  }

  &.--contact-modal.show,
  &.--contact-modal.--is-closing {
    top: -15%;
  }
`;

const CopiedToClipboardToast = ( {
  show, className, keyName, containerStyle, toTopPosition, style, onClose, autohide,
} ) => {
  const [closing, setClosing] = useState( false );
  // const s = () => setContactModalIsVisible( true );

  return (
    <div
      className="toast-container"
      style={ {
        "display": "flex",
        "justifyContent": "center",
        "width": "45rem",
        "maxWidth": "100%",
        "top": "0",
        "height": "100%",
        "alignItems": "center",
        ...containerStyle,
      } }
    >
      <PopUpToast
        className={ `${className}${closing ? " --is-closing" : ""}` }
        show={ show }
        autohide={ autohide }
        onClose={ () => {
          setClosing( true );
          onClose();
          setTimeout( () => { setClosing( false ); }, 250 );
        } }
        style={ {
          "backgroundColor": "#222",
          "color": "white",
          "marginRight": "auto",
          "marginLeft": "auto",
          ...style,
        } }
      >
        <Toast.Body>Copied to clipboard.</Toast.Body>
      </PopUpToast>
    </div>
  );
};

CopiedToClipboardToast.propTypes = {
  "show": PropTypes.bool,
  "onClose": PropTypes.func,
};

export { CopiedToClipboardToast };
