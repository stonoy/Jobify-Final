import React from "react";
import { Form, Link, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormSelect from "./FormSelect";
import { JOB_STATUS, JOB_TYPE } from "../../../utils/Job_Infos";
import { SORT_OPTIONS } from "../utils/job_info";
import styled from "styled-components";

const SearchContainer = ({
  params: { search, jobLocation, status, jobType, sort },
}) => {
  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1500);
    };
  };
  return (
    <Form
      onChange={debounce((form) => {
        submit(form);
      })}
      className="Form-main"
    >
      <FormRow
        type="search"
        name="search"
        labelText="Search"
        required={false}
        defaultValue={search}
      />
      <FormRow
        type="search"
        name="jobLocation"
        labelText="Job Location"
        required={false}
        defaultValue={jobLocation}
      />
      <FormSelect
        name="status"
        labelText="Status"
        defaultValue={status}
        list={["all", ...Object.values(JOB_STATUS)]}
      />
      <FormSelect
        name="jobType"
        labelText="Job Type"
        defaultValue={jobType}
        list={["all", ...Object.values(JOB_TYPE)]}
      />
      <FormSelect
        name="sort"
        labelText="Sort"
        defaultValue={sort}
        list={["all", ...Object.values(SORT_OPTIONS)]}
      />
      <Link to="/dashboard" className="btn-main">
        Reset
      </Link>
    </Form>
  );
};

// const Wrapper = styled.section`
//   width: 90vw;
//   margin: 0 auto;
//   height: fit-content;
//   padding: 1em 0;
//   /* border: 2px solid #415a77; */
//   /* box-shadow: var(--shadow-2); */
// `;

export default SearchContainer;
