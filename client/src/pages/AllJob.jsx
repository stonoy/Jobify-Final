import React from "react";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const jobsQuery = (params) => {
  const { search, jobLocation, status, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobLocation ?? "",
      status ?? "all",
      jobType ?? "all",
      sort ?? "latest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params,
      });
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    // console.log(params);

    const data = await queryClient.ensureQueryData(jobsQuery(params));

    return params;
  };

const AllJob = () => {
  const params = useLoaderData();

  const { data } = useQuery(jobsQuery(params));

  // console.log(data);

  return (
    <section className="page">
      <SearchContainer params={params} />
      <JobsContainer {...data} />
    </section>
  );
};

export default AllJob;
