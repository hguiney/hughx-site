import styled from "styled-components";

const TwoColumns = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 100%;
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

    // &:only-child {
    //   margin-right: 1rem;
    // }
  }

  // & > section + section,
  // & > article + article,
  // & > section + article,
  // & > article + section {
  //   margin-top: 1rem;
  // }

  @media only screen and (min-width: 60em) {
    & {
      flex-direction: row;
      // max-width: 75%;
    }

    // & > section + section,
    // & > article + article,
    // & > section + article,
    // & > article + section {
    //   margin-top: 0;
    //   margin-left: 1rem;
    // }

    & > section,
    & > article {
      max-width: 50%;
      max-width: calc(50% - 1rem);
    }
  }
`;

export default TwoColumns;
