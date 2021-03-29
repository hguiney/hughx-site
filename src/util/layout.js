const mq = ( breakpoint ) => `@media only screen and (min-width: ${breakpoint})`;

const hiDpi = ( content, multiplier = 2 ) => {
  const minResolutionDpi = 96;

  return (
    `@media only screen and (-webkit-min-device-pixel-ratio: ${multiplier}),
    only screen and (min--moz-device-pixel-ratio: ${multiplier}),
    only screen and (-o-min-device-pixel-ratio: ${multiplier}/1),
    only screen and (min-device-pixel-ratio: ${multiplier}),
    only screen and (min-resolution: ${minResolutionDpi * multiplier}dpi),
    only screen and (min-resolution: ${multiplier}dppx) {
      ${content}
    }`
  );
};

const layout = {
  "pageGutter": "1rem",
  mq,
  hiDpi,
  "small": mq( "20em" ),
  "medium": mq( "32em" ),
  "large": mq( "60em" ),
  "xlarge": mq( "70em" ),
};

export default layout;
