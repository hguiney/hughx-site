import styled from "styled-components";

const TwoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 100%;

  & > section,
  & > article {
    display: inline-block;
    background-color: #eee;
    padding: 1.5rem 1rem;
    flex: .5;
    text-align: left;
  }

  & > section + section,
  & > article + article,
  & > section + article,
  & > article + section {
    margin-top: 1rem;
  }

  @media only screen and (min-width: 40em) {
    & {
      flex-direction: row;
      // max-width: 75%;
    }

    & > section + section,
    & > article + article,
    & > section + article,
    & > article + section {
      margin-top: 0;
      margin-left: 1rem;
    }
  }
`;

export default TwoColumns;
