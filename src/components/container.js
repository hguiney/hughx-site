import styled from "styled-components";

import layout from "../util/layout";

const Container = styled.div`
  padding: 0 ${layout.pageGutter} ${layout.pageGutter};
  margin: 0 auto;

  ${layout.large} {
    max-width: 80vw;
  }
`;

export default Container;
