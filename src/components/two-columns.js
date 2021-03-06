import styled from "styled-components";

const TwoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  // flex-wrap: wrap; // Safari fix
  // max-width: 100%;
  margin-left: -.5rem;
  margin-right: -.5rem;

  & > section,
  & > article {
    display: inline-block;
    background-color: #eee;
    // background-color: lightgrey;
    padding: 1.5rem 1rem;
    flex: .5;
    text-align: left;
    margin: .5rem;

    // border-radius: 15% 37% 5% 5%;
    // padding: 3rem 2rem;
  }

  @media only screen and (min-width: 60em) {
    & {
      flex-direction: row;
    }

    & > section,
    & > article {
      max-width: 50%;
      max-width: calc(50% - 1rem);
    }
  }
`;

export default TwoColumns;
