const mq = breakpoint => `@media only screen and (min-width: ${breakpoint})`;

const layout = {
  "pageGutter": "1rem",
  mq,
  "medium": mq( "32em" ),
  "large": mq( "60em" ),
};

export default layout;
