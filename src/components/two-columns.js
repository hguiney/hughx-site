import styled from "styled-components";

const TwoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  // max-width: 100%;
  margin-left: -.5rem;
  margin-right: -.5rem;

  & > section,
  & > article {
    display: inline-block;
    background-color: #eee;
    padding: 1.5rem 1rem;
    flex: .5;
    text-align: left;
    margin: .5rem;
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
