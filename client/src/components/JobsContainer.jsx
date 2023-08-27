import React from "react";
import { Form, Link } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "./PageContainer";

const JobsContainer = ({ jobs, numOfJobs, numOfPages, page }) => {
  if (!jobs) {
    return <h2>Error in fetching jobs</h2>;
  }
  if (jobs.length === 0) {
    return <h2>No jobs to display</h2>;
  }
  return (
    <Wrapper>
      <h1>
        {numOfJobs} job{numOfJobs === 0 ? "" : "s"} available
      </h1>
      <div className="jobs">
        {jobs.map((job) => {
          const { company, position, jobLocation, jobType, status, _id } = job;
          return (
            <article key={_id}>
              <h2>{company}</h2>
              <h4>{position}</h4>
              <p>{jobLocation}</p>
              <p>{jobType}</p>
              <p>{status}</p>
              <div className="btn-container">
                <Link to={`./editjob/${_id}`} className="btn">
                  Edit
                </Link>
                <Form method="post" action={`./deletejob/${_id}`}>
                  <button type="submit" className="btn">
                    Delete
                  </button>
                </Form>
              </div>
            </article>
          );
        })}
      </div>
      {numOfPages > 1 && <PageContainer numOfPages={numOfPages} page={page} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;

  h1 {
    width: fit-content;
    margin: 1em auto;
  }
  h2 {
    margin: 0.2em 0;
  }
  p {
    margin: 0.2em 0;
  }
  article {
    width: 250px;
    border: 2px solid #333;
    padding: 1em;
    color: var(--main-color);
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.5em;
  }

  @media (min-width: 768px) {
    .jobs {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }
  }
`;

export default JobsContainer;
