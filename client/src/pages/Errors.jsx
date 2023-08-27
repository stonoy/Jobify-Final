import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Errors = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <section>
        <h3>Ohh! page not found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to="/dashboard">back home</Link>
      </section>
    );
  }
  return <div>Something Went Wrong!</div>;
};

export default Errors;
