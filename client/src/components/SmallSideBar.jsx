import React from "react";
import styled from "styled-components";
import Navlinks from "./Navlinks";
import { dashBoardValues } from "../pages/DashBoard";
import { FaTimes } from "react-icons/fa";

const SmallSideBar = () => {
  const { showSideBar, toggleSideBar } = dashBoardValues();
  return (
    <Wrapper show={showSideBar}>
      <div className="sidebar">
        <button onClick={toggleSideBar}>
          <FaTimes />
        </button>
        <Navlinks stayOnSideBar={false} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: ${(prop) => (prop.show ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;

  .sidebar {
    position: relative;
    padding: 2rem;
    background-color: whitesmoke;
    width: 80%;
    height: 80%;
    display: grid;
    place-content: center;
    font-size: 1.5rem;
  }
  button {
    position: absolute;
    top: 5%;
    right: 5%;
    padding: 0.5em;
    color: #920707;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

export default SmallSideBar;
