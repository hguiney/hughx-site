const mq = breakpoint => `@media only screen and (min-width: ${breakpoint})`;

const layout = {
  "pageGutter": "1rem",
  mq,
  "small": mq( "20em" ),
  "medium": mq( "32em" ),
  "large": mq( "60em" ),
  "xlarge": mq( "70em" ),
};

export default layout;
