import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/landingSVG.svg";

const Landing = () => {
  return (
    <Wrapper>
      <img src={main} alt="job search" />
      <div>
        <h1>Landing</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nemo
          alias laudantium itaque voluptas eaque obcaecati ducimus maiores, est
          sequi laborum quaerat quisquam voluptatibus pariatur?
        </p>
        <Link to="/login" className="btn">
          Register/Login
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  width: 90%;
  margin: auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  img {
    display: none;
  }
  h1 {
    font-size: var(--big-font);
    color: var(--big-color);
    margin-bottom: 0.2em;
  }
  p {
    font-size: var(--small-font);
    color: var(--main-color);
    margin-bottom: 1em;
    line-height: 1.5;
  }
  .btn {
    cursor: pointer;
    color: var(--main-color);
    background: var(--btn-color);
    border: transparent;
    border-radius: var(--border-radius);
    letter-spacing: var(--letter-spacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    text-decoration: none;
  }
  .btn:hover {
    background: var(--big-color);
    box-shadow: var(--shadow-3);
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 400px 1fr;
    column-gap: 3rem;
    img {
      display: block;
      width: 100%;
    }
  }
`;

export default Landing;
