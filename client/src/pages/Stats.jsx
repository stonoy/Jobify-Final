import React, { useState } from "react";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import StatsHelper from "../utils/StatsHelper";
import { AreaChartContainer, BarChartContainer, StatItem } from "../components";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const statQuery = {
  queryKey: ["stat"],
  queryFn: async () => {
    const { data } = await customFetch.get("/jobs/stats");
    // console.log("1", data);
    return data;
  },
};

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statQuery);
  // console.log("2", data);
  return null;
};

const Stats = () => {
  // const { totalJobsByStatus, monthlyApplications } = useLoaderData();
  const [showAreaChart, setShowAreaChart] = useState();

  const {
    data: { totalJobsByStatus, monthlyApplications },
  } = useQuery(statQuery);

  // console.log("3", data);

  // return <h2>Stat</h2>;

  return (
    <Wrapper className="page">
      <div>{StatsHelper(totalJobsByStatus, StatItem)}</div>
      <section>
        <button
          onClick={() => setShowAreaChart(!showAreaChart)}
          className="btn"
        >
          Area Chart
        </button>
        {showAreaChart ? (
          <AreaChartContainer data={monthlyApplications} />
        ) : (
          <BarChartContainer data={monthlyApplications} />
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 0.25em;
  }
  section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  button {
    margin: 2em 0;
  }
`;

export default Stats;
