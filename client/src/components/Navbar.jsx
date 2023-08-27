import React, { useState } from "react";
import styled from "styled-components";
import { FaAlignLeft, FaUserAlt, FaAngleDown } from "react-icons/fa";
import { dashBoardValues } from "../pages/DashBoard";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { toggleSideBar, user, logout } = dashBoardValues();
  return (
    <Wrapper>
      <button onClick={toggleSideBar} className="btn">
        <FaAlignLeft />
      </button>
      <h3>Jobify</h3>
      <div className="btn-container">
        <button onClick={() => setShow(!show)} className="btn">
          {user.avatar ? (
            <img src={user.avatar} alt="user" className="user" />
          ) : (
            <FaUserAlt />
          )}
          {user?.name}
          <FaAngleDown />
        </button>
        <button
          style={{
            display: show ? "inline-block" : "none",
            marginTop: "0.5em",
          }}
          className="btn"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: clamp(5rem, 5vh, 7rem);
  justify-content: space-between;
  align-items: center;
  padding: 1em 0.5em;
  h3 {
    font-size: var(--big-font);
    color: var(--big-color);
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .user {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export default Navbar;
