import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageContainer = ({ numOfPages, page }) => {
  const pagesArray = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handelPageChange = (page) => {
    let searchParams = new URLSearchParams(search);
    searchParams.set("page", page);
    console.log(searchParams);
    navigate(`${pathname}?${searchParams}`);
  };

  const advancePagination = () => {
    if (numOfPages < 5) {
      return pagesArray.map((page) => {
        return (
          <button key={page} onClick={() => handelPageChange(page)}>
            {page}
          </button>
        );
      });
    }
    if (page === 1 || page === numOfPages) {
      return (
        <>
          <button onClick={() => handelPageChange(1)}>{1}</button>
          <button onClick={() => handelPageChange(2)}>{2}</button>
          <button>...</button>
          <button onClick={() => handelPageChange(numOfPages)}>
            {numOfPages}
          </button>
        </>
      );
    }
    if (page === 2) {
      return (
        <>
          <button onClick={() => handelPageChange(1)}>{1}</button>
          <button onClick={() => handelPageChange(2)}>{2}</button>
          <button onClick={() => handelPageChange(3)}>{3}</button>
          <button>...</button>
          <button onClick={() => handelPageChange(numOfPages)}>
            {numOfPages}
          </button>
        </>
      );
    }
    if (page === numOfPages - 1) {
      return (
        <>
          <button onClick={() => handelPageChange(1)}>{1}</button>
          <button>...</button>
          <button onClick={() => handelPageChange(numOfPages - 2)}>
            {numOfPages - 2}
          </button>
          <button onClick={() => handelPageChange(numOfPages - 1)}>
            {numOfPages - 1}
          </button>

          <button onClick={() => handelPageChange(numOfPages)}>
            {numOfPages}
          </button>
        </>
      );
    }

    return (
      <>
        <button onClick={() => handelPageChange(1)}>{1}</button>
        <button>...</button>
        <button onClick={() => handelPageChange(page - 1)}>{page - 1}</button>
        <button onClick={() => handelPageChange(page)}>{page}</button>
        <button onClick={() => handelPageChange(page + 1)}>{page + 1}</button>
        <button>...</button>
        <button onClick={() => handelPageChange(numOfPages)}>
          {numOfPages}
        </button>
      </>
    );
  };

  return (
    <Wrapper>
      <button
        onClick={() => {
          if (page === 1) {
            handelPageChange(numOfPages);
            return;
          }
          handelPageChange(page - 1);
        }}
      >
        Prev
      </button>
      {advancePagination()}
      <button
        onClick={() => {
          if (page === numOfPages) {
            handelPageChange(1);
            return;
          }
          handelPageChange(page + 1);
        }}
      >
        Next
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-left: auto;
  button {
    cursor: pointer;
    color: var(--main-color);
    background: var(--btn-color);
    border: transparent;
    /* border-radius: var(--border-radius); */
    /* letter-spacing: var(--letter-spacing); */
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    text-decoration: none;
    margin: 0.5em 0.2em;
  }
  button:hover {
    background: var(--big-color);
    box-shadow: var(--shadow-3);
  }
`;

export default PageContainer;
