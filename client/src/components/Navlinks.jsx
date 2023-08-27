import React from "react";
import { Links } from "../utils/links";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { dashBoardValues } from "../pages/DashBoard";

const Navlinks = ({ stayOnSideBar }) => {
  const {
    toggleSideBar,
    user: { role },
  } = dashBoardValues();
  const toggle = () => {
    if (!stayOnSideBar) {
      toggleSideBar();
    }
    return;
  };
  return (
    <Wrapper>
      {Links.map((link) => {
        if (link.path === "./admin" && role !== "admin") {
          return;
        }
        return (
          <NavLink
            className="link"
            to={link.path}
            key={link.id}
            onClick={toggle}
            end
          >
            {link.title}
          </NavLink>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: start;
    .link {
      text-decoration: none;
      display: inline-block;
      width: 10rem;
      font-size: 1.5rem;
      margin: 0.3em 0;
    }
  }
  @media (max-width: 768px) {
    .link {
      text-align: center;
      text-decoration: none;
      display: inline-block;
      width: 100%;
      padding: 0.2em;
      border: var(--input-border);
      color: var(--main-color);
    }
  }
`;

export default Navlinks;
