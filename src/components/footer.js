import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import ProgressiveImage from "./progressive-image";

import layout from "../util/layout";
import theme from "../util/theme";
import blocksBackground from "../images/use_your_illusion.png";
import blocksBackground2x from "../images/use_your_illusion@2x.png";

const footerReactLogo = "/images/logos/react.svg";

// Icons
const octicons = [
  {
    "src": "/images/octicons/star.svg",
    "alt": "five-point star",
    "style": {
      "maxHeight": "33px",
    },
  },
  {
    "src": "/images/octicons/copy-to-clipboard.svg",
    "alt": "clipboard with arrow pointing inward",
    "style": {
      "maxHeight": "33px",
    },
  },
];
const downloadIcon = {
  "src": "/images/npm/download.svg",
  "alt": "downward arrow to horizontal bar",
  "style": {
    "maxWidth": "33px",
  },
};
const performanceIcon = {
  "src": "/images/logos/seo-performance--monochrome.svg",
  "alt": "stopwatch in front of desktop application window",
};
const mobileInterfaceIcon = {
  "src": "/images/logos/ui-ux.svg",
  "alt": "left hand holding large mobile device",
};
const foldersNetworkStructureIcon = {
  "src": "/images/logos/ia.svg",
  "alt": "large folder with one-to-many line pointing to three smaller folders",
};
const legoPieceIcon = {
  "src": "/images/logos/component.svg",
  "alt": "four-peg square toy brick",
};
const accessibilityIcon = {
  "src": "/images/logos/u7y-a11y.svg",
  "alt": "rounded human figure with limbs spread out enclosed in solid circle",
};
const correctIcon = {
  "src": "/images/logos/copyediting.svg",
  "alt": "pencil marking lines 1–3 with an “x” and line 4 with a checkmark",
};
const corporateIdentityIcon = {
  "src": "/images/logos/logos-brand-identity.svg",
  "alt": "building with speech bubble containing front-facing human figure",
};
const responsiveDesignIcon = {
  "src": "/images/logos/responsive-design.svg",
  "alt": "computer monitor with rounded up-and-to-the-right arrow pointing to mobile device",
};
const piggyBankIcon = {
  "src": "/images/piggy-bank.svg",
  "alt": "piggy bank with two coins entering",
};
const empathyIcon = {
  "src": "/images/empathy.svg",
  "alt": "human head in profile view with brain-shaped hole containing rounded human figure",
};
const blueprintsIcon = {
  "src": "/images/blueprints.svg",
  "alt": "blueprint with left page curl depicting boxes and measuring lines",
};

// Logos
const htmlLogo = {
  "src": "/images/logos/html-icon--monochrome.svg",
  "alt": "badge with shield",
};
const reactLogo = {
  "src": "/images/logos/react--monochrome.svg",
  "alt": "atom",
};
const nodeJsLogo = {
  "src": "/images/logos/nodejs-icon--monochrome.svg",
  "alt": "shaded hexagon",
};
// const phpLogo = {
//   "src": "/images/logos/php-alt--monochrome.svg",
//   "alt": "“php”",
//   "style": {
//     "maxWidth": "75px",
//   },
// };
const gatsbyLogo = {
  "src": "/images/logos/gatsby--monochrome.svg",
  "alt": "stylized “G” enclosed in circle",
};
const wordpressLogo = {
  "src": "/images/logos/wordpress--monochrome.svg",
  "alt": "“W” enclosed in circle",
};
const shopifyLogo = {
  "src": "/images/logos/shopify--monochrome.svg",
  "alt": "shopping bag with “S” on it",
};
const runkeeperLogo = {
  "src": "/images/logos/runkeeper-asics.svg",
  "alt": "Runkeeper",
  "style": {
    "maxWidth": "150px",
  },
};
const oxfamLogo = {
  "src": "/images/logos/oxfam-horizontal.svg",
  "alt": "Oxfam",
  "style": {
    "maxWidth": "150px",
  },
};
const sapientLogo = {
  "src": "/images/logos/publicis-sapient.svg",
  "alt": "Publicis Sapient",
  "style": {
    "maxWidth": "150px",
  },
};
const citizensBankLogo = {
  "src": "/images/logos/citizens-bank.svg",
  "alt": "Citizens Bank",
  "style": {
    "maxWidth": "150px",
  },
};
const wbGamesLogo = {
  "src": "/images/logos/wb-games-color.svg",
  "alt": "WB Games",
};
const reebokLogo = {
  "src": "/images/logos/reebok.svg",
  "alt": "Reebok",
  "style": {
    "maxWidth": "150px",
  },
};
const bostonGlobeLogo = {
  "src": "/images/logos/the-boston-globe.svg",
  "alt": "The Boston Globe",
  "style": {
    "maxWidth": "150px",
  },
};

const Footer = styled.footer`
  background-image: url(${blocksBackground});
  ${layout.hiDpi( `
    background-image: url(${blocksBackground2x});
    background-size: 54px 58px;
  ` )}

  text-align: center;
  margin-top: 3rem;
  padding: 1.5rem ${layout.pageGutter};
  background-color: ${theme.black};
  color: white;
  // position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10em;
  display: flex;
  align-items: center;
  line-height: 2;
`;

const FooterContent = styled.div`
  max-width: 39rem;
  margin-left: auto;
  margin-right: auto;
`;

const CreditsHeading = ( { children } ) => (
  <h3 className="h5" style={ { "marginBottom": "1rem" } }>{ children }</h3>
);
CreditsHeading.propTypes = {
  "children": PropTypes.node,
};

const CreditsDl = styled.dl`
  & > dd + dt {
    margin-top: 1.5rem;
  }
`;

const renderIcon = ( icon, index, icons ) => {
  const image = (
    <ProgressiveImage
      img={ {
        "src": icon.src,
        "height": 50,
        "alt": icon.alt,
        "style": {
          // "maxWidth": "50px",
          ...icon.style,
        },
      } }
      style={ {
        "maxWidth": "50px",
      } }
    />
  );

  if ( icons && icons.length ) {
    return <dt key={ Math.random() }>{ image }</dt>;
  }

  return <React.Fragment key={ Math.random() }>{ image }</React.Fragment>;
};

const ccBy3US = <>Licensed under <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode">Creative Commons Attribution 3.0 United States</a>.</>;

const SiteFooter = ( {} ) => {
  const [creditsModalIsVisible, setCreditsModalIsVisible] = useState( false );
  const showCreditsModal = () => setCreditsModalIsVisible( true );
  const hideCreditsModal = () => setCreditsModalIsVisible( false );

  return (
    <>
      <Footer>
        <FooterContent>
          <p>Designed in the browser. Developed in <ProgressiveImage img={ {
            "src": footerReactLogo, "width": 33, "alt": "React logo", "loading": "lazy",
          } } style={ { "verticalAlign": "middle" } } /> React.</p>
          <p>© { ( new Date() ).getFullYear() } Hugh Guiney unless <a href="#credits" onClick={ ( event ) => { showCreditsModal(); event.preventDefault(); } }>otherwise specified.</a></p>
          <p><a href="https://github.com/HughxDev/hughx-site">View source</a></p>
          { /* <p><a href="https://www.youtube.com/channel/UCOldDDJyK_oyDkVJLCuaorw">YouTube</a></p> */ }
        </FooterContent>
      </Footer>
      <Modal id="credits" show={ creditsModalIsVisible } onHide={ hideCreditsModal } style={ { "fontSize": ".8rem" } }>
        <Modal.Header closeButton>
          <Modal.Title as="h2" className="h4">Credits &amp; Copyrights</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreditsHeading>Icons</CreditsHeading>
          <CreditsDl>
            { octicons.map( renderIcon ) }
            <dd>Octicons © GitHub, Inc.</dd>
            <dd>Licensed under <a href="https://github.com/primer/octicons/blob/master/LICENSE">MIT License</a>.</dd>
            <dt>{ renderIcon( downloadIcon ) }</dt>
            <dd>Download icon by npm, Inc.</dd>
            <dt>{ renderIcon( performanceIcon ) }</dt>
            <dd><cite>performance</cite> by <a href="https://thenounproject.com/basinskimaxim/">Maxim Basinski</a> from the Noun Project.</dd>
            <dd>{ ccBy3US }</dd>
            <dt>{ renderIcon( mobileInterfaceIcon ) }</dt>
            <dd><cite>mobile interface</cite> by <a href="https://thenounproject.com/prosymbols">ProSymbols</a> from the Noun Project.</dd>
            <dd>{ ccBy3US }</dd>
            <dt>{ renderIcon( foldersNetworkStructureIcon ) }</dt>
            <dd><cite>Folders Network Structure</cite> by <a href="https://thenounproject.com/vectorsmarket">Vectors Market</a> from the Noun Project.</dd>
            <dd>{ ccBy3US }</dd>
            <dt>{ renderIcon( legoPieceIcon ) }</dt>
            <dd><cite>Lego piece</cite> by <a href="https://thenounproject.com/davosime">Davo Sime</a> from the Noun Project.</dd>
            <dd>Licensed commercially.</dd>
            <dt>{ renderIcon( accessibilityIcon ) }</dt>
            <dd><cite>Accessibility</cite> by <a href="https://thenounproject.com/melolonta">Alfonso Melolonta Urbán</a> from the Noun Project.</dd>
            <dd>Used by way of the <a href="https://creativecommons.org/publicdomain/zero/1.0/">public domain</a>.</dd>
            <dt>{ renderIcon( correctIcon ) }</dt>
            <dd><cite>correct</cite> by <a href="https://thenounproject.com/grega.cresnar">Gregor Cresnar</a> from the Noun Project.</dd>
            <dd>{ ccBy3US }</dd>
            <dt>{ renderIcon( corporateIdentityIcon ) }</dt>
            <dd><cite>corporate identity</cite> by <a href="https://thenounproject.com/grega.cresnar">Gregor Cresnar</a> from the Noun Project.</dd>
            <dd>{ ccBy3US }</dd>
            <dt>{ renderIcon( responsiveDesignIcon ) }</dt>
            <dd><cite>Responsive Design</cite> by <a href="https://thenounproject.com/prosymbols">ProSymbols</a> from the Noun Project.</dd>
            <dd>{ ccBy3US }</dd>
            <dt>{ renderIcon( piggyBankIcon ) }</dt>
            <dd><cite>piggybank</cite> by <a href="https://thenounproject.com/alisonbrroberta">Alison Roberta</a> from the Noun Project.</dd>
            <dd>Licensed commercially.</dd>
            <dt>{ renderIcon( empathyIcon ) }</dt>
            <dd><cite>empathy</cite> by <a href="https://thenounproject.com/goza">Gonzalo Zaragoza</a> from the Noun Project.</dd>
            <dd>Licensed commercially.</dd>
            <dt>{ renderIcon( blueprintsIcon ) }</dt>
            <dd><cite>Blueprint</cite> by <a href="https://thenounproject.com/smashicons">Ben Davis</a> from the Noun Project.</dd>
            <dd>Licensed commercially.</dd>
          </CreditsDl>
          <CreditsHeading>Logos</CreditsHeading>
          <CreditsDl>
            <dt>{ renderIcon( runkeeperLogo ) }</dt>
            <dd>Runkeeper™ Logo © ASICS.</dd>
            <dt>{ renderIcon( oxfamLogo ) }</dt>
            <dd>Oxfam Logo © Oxfam International.</dd>
            <dt>{ renderIcon( sapientLogo ) }</dt>
            <dd>Publicis.Sapient Logo © Publicis Groupe.</dd>
            <dt>{ renderIcon( citizensBankLogo ) }</dt>
            <dd>Citizens Bank® Logo © Citizens Financial Group, Inc.</dd>
            <dt>{ renderIcon( wbGamesLogo ) }</dt>
            <dd>WB Games Logo © Warner Bros. Entertainment Inc.</dd>
            <dt>{ renderIcon( reebokLogo ) }</dt>
            <dd>Reebok® Logo © Reebok International Limited.</dd>
            <dt>{ renderIcon( bostonGlobeLogo ) }</dt>
            <dd>The Boston Globe Logo © Boston Globe Media Partners, LLC.</dd>
            { /* --- */ }
            <dt>{ renderIcon( htmlLogo ) }</dt>
            <dd><span>HTML5 Logo by <a href="https://www.w3.org/"><abbr title="World Wide Web Consortium">W3C</abbr></a></span>.</dd>
            <dd>Licensed under <a href="http://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 Unported</a>.</dd>
            <dt>{ renderIcon( reactLogo ) }</dt>
            <dd>React Logo © Facebook Inc.</dd>
            <dd>Licensed under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International</a>.</dd>
            <dt>{ renderIcon( nodeJsLogo ) }</dt>
            <dd>Node.js® Logo © Joyent, Inc.</dd>
            { /* <dt>{ renderIcon( phpLogo ) }</dt>
            <dd>Alternative PHP Logo by Levi Morrison.</dd> */ }
            <dt>{ renderIcon( gatsbyLogo ) }</dt>
            <dd>Gatsby Logo by Sacha Greif. © Gatsby, Inc.</dd>
            <dt>{ renderIcon( wordpressLogo ) }</dt>
            <dd>WordPress Logo © the WordPress Foundation.</dd>
            <dt>{ renderIcon( shopifyLogo ) }</dt>
            <dd>Shopify Logo © Shopify Inc.</dd>
          </CreditsDl>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SiteFooter;
