import React from "react";
import styled from "styled-components";
import Navlinks from "./Navlinks";
import { dashBoardValues } from "../pages/DashBoard";

const BigSideBar = () => {
  const { showSideBar } = dashBoardValues();
  return (
    <Wrapper show={showSideBar}>
      <Navlinks stayOnSideBar={true} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: ${(prop) => (prop.show ? "block" : "none")};
  padding: 1em 2em;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default BigSideBar;
